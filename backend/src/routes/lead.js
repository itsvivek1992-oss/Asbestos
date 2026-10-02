const express = require('express');
const db = require('../db');
const { sendChecklistEmail } = require('../lib/email');

const router = express.Router();

// POST /api/lead
// Body: { email, tag: "checklist" }
// DEV: this currently stores leads locally and logs a stub email. Once Brevo
// is confirmed (section 18), replace the body of this handler with a call to
// the Brevo contacts API, adding the contact to the
// "asbestosadvice – checklist leads" list with marketing consent, which then
// triggers Brevo's own welcome + two follow-up automation.
router.post('/lead', async (req, res) => {
  const { email, tag } = req.body || {};
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  try {
    db.prepare('INSERT INTO leads (email, tag) VALUES (?, ?)').run(email, tag || 'checklist');
    await sendChecklistEmail({ to: email });
    res.json({ ok: true });
  } catch (err) {
    console.error('Lead capture failed', err);
    res.status(500).json({ error: 'lead_failed' });
  }
});

module.exports = router;
