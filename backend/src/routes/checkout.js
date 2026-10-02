const express = require('express');
const stripe = require('../lib/stripeClient');
const { currentPricePence, CURRENCY, isLaunchPriceLive } = require('../lib/pricing');

const router = express.Router();

// POST /api/checkout
// Body: { position: string, utm: Record<string,string> }
// The browser can influence nothing about price. We read the deadline from
// our own clock, not from anything the client sends.
router.post('/checkout', async (req, res) => {
  try {
    const { position, utm } = req.body || {};
    const amount = currentPricePence();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'], // Apple Pay / Google Pay surface automatically for card on Stripe Checkout
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            unit_amount: amount,
            product_data: {
              name: 'Asbestos, Answered — 2026 UK Edition + Ask a Surveyor photo review',
              description: 'Digital PDF guide plus one included surveyor photo review.',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/#checkout`,
      metadata: {
        position: position || 'unknown',
        launch_price_live: String(isLaunchPriceLive()),
        ...flattenUtm(utm),
      },
      // Consumer Contracts Regulations tickbox (section 26) should be
      // rendered as a custom checkbox field once wording is legally
      // confirmed. Stripe Checkout supports this via `custom_fields` /
      // `consent_collection` — left out until the wording is approved.
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Checkout session creation failed', err);
    res.status(500).json({ error: 'checkout_failed' });
  }
});

function flattenUtm(utm) {
  if (!utm || typeof utm !== 'object') return {};
  const allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  const out = {};
  allowed.forEach((key) => {
    if (utm[key]) out[key] = String(utm[key]).slice(0, 200);
  });
  return out;
}

module.exports = router;
