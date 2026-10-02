const express = require('express');
const db = require('../db');

const router = express.Router();

// Minimal shared-password check. This is a starting point per section 14
// ("a simple password-protected admin page") — swap for real per-user auth
// before launch if more than one surveyor needs access or you want an audit
// trail of who marked what.
function requireAdmin(req, res, next) {
  const provided = req.headers['x-admin-password'];
  if (!process.env.ADMIN_PASSWORD || provided !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

// GET /api/admin/review-codes/:code
router.get('/admin/review-codes/:code', requireAdmin, (req, res) => {
  const code = req.params.code.toUpperCase();
  const order = db
    .prepare('SELECT review_code, review_status, email, created_at FROM orders WHERE review_code = ?')
    .get(code);

  if (!order) {
    return res.json({ code, status: 'invalid' });
  }

  res.json({
    code: order.review_code,
    status: order.review_status,
    orderDate: order.created_at,
    buyerEmail: order.email,
  });
});

// POST /api/admin/review-codes/:code/mark-used
router.post('/admin/review-codes/:code/mark-used', requireAdmin, (req, res) => {
  const code = req.params.code.toUpperCase();
  const order = db.prepare('SELECT id, review_status FROM orders WHERE review_code = ?').get(code);

  if (!order) return res.status(404).json({ error: 'not_found' });
  if (order.review_status !== 'unused') {
    return res.status(409).json({ error: 'not_unused', status: order.review_status });
  }

  db.prepare("UPDATE orders SET review_status = 'used' WHERE id = ?").run(order.id);
  res.json({ ok: true });
});

module.exports = router;
