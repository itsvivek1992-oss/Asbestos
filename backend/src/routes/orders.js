const express = require('express');
const db = require('../db');
const { buildDownloadUrl } = require('../lib/downloadLink');

const router = express.Router();

// GET /api/orders/by-session/:sessionId
// Used by the thank-you page. Deliberately narrow: returns only what the
// page needs, and nothing if the session isn't found or wasn't fulfilled yet
// (the webhook can arrive slightly after the redirect).
router.get('/orders/by-session/:sessionId', (req, res) => {
  const order = db
    .prepare('SELECT email, review_code, download_token FROM orders WHERE stripe_session_id = ?')
    .get(req.params.sessionId);

  if (!order) {
    // Can legitimately happen for a few seconds if this page loads before
    // the webhook has finished fulfilment. The frontend can retry/poll.
    return res.status(404).json({ error: 'not_found' });
  }

  res.json({
    email: order.email,
    reviewCode: order.review_code,
    downloadUrl: buildDownloadUrl(order.download_token),
  });
});

module.exports = router;
