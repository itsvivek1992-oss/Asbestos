// DEV: this is a stub. Wire up real sending once Core Asbestos confirms the
// mailbox provider (section 17) and supplies approved wording for the five
// customer emails (section 15). A safe default is nodemailer over SMTP,
// which works with Google Workspace, Microsoft 365, or Brevo's SMTP relay.
//
// Every function here logs instead of sending, so the rest of the app
// (checkout, webhook, resend) can be developed and tested end to end before
// email wording and DNS records (SPF/DKIM/DMARC, section 17) are ready.

function logEmail(kind, to, data) {
  console.log(`[email:${kind}] would send to ${to}`, JSON.stringify(data));
}

async function sendOrderConfirmation({ to, reviewCode, downloadUrl, amountPence }) {
  // TODO: real template, branded per section 15 (same colours/fonts/logo as
  // the site), plain mobile-friendly HTML, with the required footer
  // (company number, registered office, support email, legal links).
  logEmail('order_confirmation', to, { reviewCode, downloadUrl, amountPence });
}

async function sendResendDownloadLink({ to, downloadUrl }) {
  logEmail('resend_download', to, { downloadUrl });
}

async function sendChecklistEmail({ to }) {
  // TODO: in production this is better handled by Brevo's own automation
  // (section 18) rather than a transactional send from here — this stub
  // exists so /api/lead has something to call in the meantime.
  logEmail('checklist_welcome', to, {});
}

module.exports = { sendOrderConfirmation, sendResendDownloadLink, sendChecklistEmail };
