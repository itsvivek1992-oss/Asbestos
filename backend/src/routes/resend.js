const express = require('express');
const db = require('../db');
const { generateDownloadToken, newExpiry, buildDownloadUrl, MAX_USES } = require('../lib/downloadLink');
const { sendResendDownloadLink } = require('../lib/email');

const router = express.Router();

// POST /api/resend
// Body: { email, orderNumber? }
// Section 32: always the same response, so this endpoint never reveals
// whether an email address has an order. It also always returns 200/OK
// quickly, and does the actual lookup + email send in the background-ish
// (still awaited here since we have no queue yet, but errors are swallowed
// from the caller's point of view).
router.post('/resend', async (req, res) => {
  const { email } = req.body || {};

  res.json({ ok: true }); // respond immediately with the same message either way

  if (!email) return;

  try {
    const order = db
      .prepare('SELECT * FROM orders WHERE email = ? AND refunded = 0 ORDER BY created_at DESC LIMIT 1')
      .get(email);
    if (!order) return; // silently do nothing — no such order, no email sent, no signal to the caller

    const downloadToken = generateDownloadToken();
    const downloadExpiresAt = newExpiry();

    db.prepare(
      'UPDATE orders SET download_token = ?, download_expires_at = ?, download_uses_remaining = ? WHERE id = ?'
    ).run(downloadToken, downloadExpiresAt, MAX_USES, order.id);

    await sendResendDownloadLink({ to: email, downloadUrl: buildDownloadUrl(downloadToken) });
  } catch (err) {
    console.error('Resend flow failed', err);
  }
});

module.exports = router;
