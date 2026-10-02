// Section 30 of the dev questionnaire. Registered office still TO CONFIRM
// (must match Companies House exactly) — see section 1.
export default function ContactPage() {
  return (
    <main className="sec">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <p className="eyebrow">Contact</p>
        <h1>Get in touch</h1>
        <p className="body">Core Asbestos Services Ltd</p>
        <p className="body" data-todo="company">[Registered office — TO CONFIRM, must match Companies House exactly]</p>
        <p className="body">Email: support@asbestosadvice.uk</p>
        <p className="body">Phone: 0131 510 4765</p>
        <p className="body">WhatsApp: for Ask a Surveyor only, see your order confirmation for the number.</p>
        <p className="fine">
          Business hours: Monday to Friday, 9am to 5pm. Ask a Surveyor runs Monday to Saturday. We aim to respond
          within 1 working day.
        </p>
      </div>
    </main>
  );
}
