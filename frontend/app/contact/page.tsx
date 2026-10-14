import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/legal.module.css';

export const metadata: Metadata = {
  title: 'Contact | asbestosadvice.uk',
  description: 'Contact Core Asbestos Services Ltd about your order, a refund or Ask a Surveyor.',
};

export default function ContactPage() {
  return (
    <>
      <div className={s.top}>
        <div className={`wrap ${s.topInner}`}>
          <Link href="/" className={s.brand}>asbestosadvice.uk</Link>
          <Link href="/" className={s.back}>&larr; Back to the book</Link>
        </div>
      </div>

      <header className={s.hero}>
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1 className={s.title}>Get in touch</h1>
          <p className={s.intro}>
            Questions about your order, your download or Ask a Surveyor? We aim to reply within 1 working day.
          </p>
        </div>
      </header>

      <main className="wrap" style={{ padding: '48px 24px 80px', maxWidth: 720 }}>
        <div className={s.contactCard}>
          <p>
            <b>Core Asbestos Services Ltd</b>
            <br />
            Trading as Core Asbestos Scotland
            <br />
            71-75 Shelton Street, London, WC2H 9JQ
          </p>
          <p>
            Company number 11728204
            <br />
            VAT number 316 9331 04
          </p>
          <a className={s.mail} href="mailto:hello@asbestosadvice.uk">Email hello@asbestosadvice.uk</a>
        </div>

        <div className={s.tableWrap}>
          <table className={s.table}>
            <tbody>
              <tr><th scope="row">Customer enquiries</th><td><a href="mailto:hello@asbestosadvice.uk">hello@asbestosadvice.uk</a></td></tr>
              <tr><th scope="row">Privacy requests</th><td><a href="mailto:privacy@asbestosadvice.uk">privacy@asbestosadvice.uk</a></td></tr>
              <tr><th scope="row">Phone</th><td>0131 510 4765</td></tr>
              <tr><th scope="row">Business hours</th><td>Monday to Friday, 9am to 5pm</td></tr>
              <tr><th scope="row">Ask a Surveyor</th><td>Monday to Saturday. See your order confirmation for how to send your photos.</td></tr>
            </tbody>
          </table>
        </div>

        <div className={s.more}>
          <Link href="/refunds">Refunds</Link>
          <Link href="/terms">Terms and conditions</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </main>
    </>
  );
}