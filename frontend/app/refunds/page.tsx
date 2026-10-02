// Section 27 of the dev questionnaire gives this content directly, so it is
// filled in rather than left as a placeholder. Still worth a final legal
// check alongside the other legal pages before launch.
export default function RefundsPage() {
  return (
    <main className="sec">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <p className="eyebrow">Legal</p>
        <h1>Refund policy</h1>
        <p className="body">
          Any buyer can request a refund within 14 days of purchase. Email support@asbestosadvice.uk with your order
          number. You do not need to give a reason.
        </p>
        <p className="body">
          There are no conditions beyond the 14 day window, and one refund per customer. Once a refund is issued,
          your download link is disabled. If your Ask a Surveyor review has not been used yet, it is cancelled; if a
          review has already been given, the refund is still honoured in full.
        </p>
        <p className="body">Refunds are processed within 5 working days, back to your original payment method.</p>
      </div>
    </main>
  );
}
