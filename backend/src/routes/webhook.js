const express = require('express');
const stripe = require('../lib/stripeClient');
const db = require('../db');
const { generateReviewCode } = require('../lib/reviewCode');
const { generateDownloadToken, newExpiry, buildDownloadUrl, MAX_USES } = require('../lib/downloadLink');
const { sendOrderConfirmation } = require('../lib/email');

const router = express.Router();

// NOTE: this route must receive the RAW body, not JSON-parsed, for Stripe's
// signature check to work. It is mounted with express.raw() in src/index.js
// *before* the global express.json() middleware is applied to other routes.
router.post('/webhook', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Duplicate-event protection: Stripe can and will retry deliveries.
  const already = db.prepare('SELECT id FROM processed_webhook_events WHERE id = ?').get(event.id);
  if (already) {
    return res.json({ received: true, duplicate: true });
  }
  db.prepare('INSERT INTO processed_webhook_events (id) VALUES (?)').run(event.id);

  try {
    if (event.type === 'checkout.session.completed') {
      await fulfilOrder(event.data.object);
    } else if (event.type === 'charge.refunded') {
      await handleRefund(event.data.object);
    }
  } catch (err) {
    // Respond 200 regardless so Stripe does not endlessly retry a permanently
    // broken event, but log loudly — this is the one failure mode that must
    // never go silent, since fulfilment (section 10) is a hard requirement.
    console.error('Error handling webhook event', event.type, err);
  }

  res.json({ received: true });
});

async function fulfilOrder(session) {
  // Fulfilment must complete even if the customer closes the browser, so
  // everything here runs from the webhook, not from the success_url redirect.
  const existing = db.prepare('SELECT id FROM orders WHERE stripe_session_id = ?').get(session.id);
  if (existing) return; // already fulfilled (belt and braces alongside the event-id dedup above)

  const email = session.customer_details?.email;
  if (!email) {
    console.error('Checkout session completed with no customer email', session.id);
    return;
  }

  let reviewCode = generateReviewCode();
  // Extremely unlikely collision given the alphabet/length, but check anyway.
  while (db.prepare('SELECT id FROM orders WHERE review_code = ?').get(reviewCode)) {
    reviewCode = generateReviewCode();
  }

  const downloadToken = generateDownloadToken();
  const downloadExpiresAt = newExpiry();

  db.prepare(
    `INSERT INTO orders
      (stripe_session_id, stripe_payment_intent, email, amount_gbp_pence, currency, review_code,
       download_token, download_expires_at, download_uses_remaining, utm_json, fulfilled)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
  ).run(
    session.id,
    typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    email,
    session.amount_total,
    session.currency,
    reviewCode,
    downloadToken,
    downloadExpiresAt,
    MAX_USES,
    JSON.stringify(session.metadata || {})
  );

  const downloadUrl = buildDownloadUrl(downloadToken);
  await sendOrderConfirmation({ to: email, reviewCode, downloadUrl, amountPence: session.amount_total });

  // DEV: fire the Meta Conversions API Purchase event here (server side),
  // using session.id (or payment_intent id) as the deduplication event ID
  // shared with the client-side Pixel event fired from aa:initiate_checkout
  // handling — section 20 of the brief.
}

async function handleRefund(charge) {
  const paymentIntentId = typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id;
  if (!paymentIntentId) return;

  const order = db.prepare('SELECT * FROM orders WHERE stripe_payment_intent = ?').get(paymentIntentId);
  if (!order) return;

  db.prepare(
    `UPDATE orders SET refunded = 1, download_uses_remaining = 0,
       review_status = CASE WHEN review_status = 'unused' THEN 'refunded' ELSE review_status END
     WHERE id = ?`
  ).run(order.id);
  // Section 27: an already-used review is still honoured even after refund,
  // so review_status only flips to 'refunded' if it was still 'unused'.
}

module.exports = router;
