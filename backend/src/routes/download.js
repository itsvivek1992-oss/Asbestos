const express = require('express');
const fs = require('fs');
const db = require('../db');

const router = express.Router();

// GET /api/download/:token
// Section 11: 72 hour expiry, 5 downloads max, private storage only — never
// a public/permanent URL, and never indexed (this route is not linked from
// anywhere crawlable and returns no directory listing).
router.get('/download/:token', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE download_token = ?').get(req.params.token);

  if (!order || order.refunded) {
    return res.status(404).send('This link is no longer valid.');
  }
  if (new Date(order.download_expires_at).getTime() < Date.now()) {
    return res.status(410).send('This link has expired. Use the resend page to get a new one.');
  }
  if (order.download_uses_remaining <= 0) {
    return res.status(410).send('This link has reached its download limit. Use the resend page to get a new one.');
  }

  const filePath = process.env.PRODUCT_FILE_PATH;
  if (!filePath || !fs.existsSync(filePath)) {
    console.error('PRODUCT_FILE_PATH is not set or file is missing:', filePath);
    return res.status(500).send('The download is temporarily unavailable. Please contact support.');
  }

  db.prepare('UPDATE orders SET download_uses_remaining = download_uses_remaining - 1 WHERE id = ?').run(order.id);

  res.download(filePath, 'Asbestos-Answered_2026-UK-Edition.pdf');
});

module.exports = router;
