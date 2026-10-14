import type { Metadata } from 'next';
import LegalLayout, { LegalSection, Todo } from '@/components/LegalLayout';
import s from '@/components/legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | asbestosadvice.uk',
  description: 'How Core Asbestos Services Ltd collects and uses personal information through asbestosadvice.uk.',
};

const NAV = [
  { id: 'who', title: 'Who we are' },
  { id: 'collect', title: 'What we collect and why' },
  { id: 'share', title: 'Who we share it with' },
  { id: 'transfers', title: 'International transfers' },
  { id: 'keep', title: 'How long we keep it' },
  { id: 'rights', title: 'Your rights' },
  { id: 'security', title: 'Security and children' },
  { id: 'changes', title: 'Changes' },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="How Core Asbestos Services Ltd collects, uses and protects personal information through asbestosadvice.uk."
      updated={<Todo>[DD Month YYYY]</Todo>}
      sections={NAV}
    >
      <LegalSection n={1} id="who" title="Who we are">
        <p className={s.text}>
          This policy explains how Core Asbestos Services Ltd (company number 11728204, registered office 71-75
          Shelton Street, London, WC2H 9JQ), trading as Core Asbestos Scotland, uses personal information collected
          through asbestosadvice.uk. We are the data controller. Contact us on{' '}
          <a href="mailto:privacy@asbestosadvice.uk">privacy@asbestosadvice.uk</a> about anything in this policy.
        </p>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <tbody>
              <tr><th scope="row">Legal name</th><td>Core Asbestos Services Ltd</td></tr>
              <tr><th scope="row">Trading name</th><td>Core Asbestos Scotland</td></tr>
              <tr><th scope="row">Registered office</th><td>71-75 Shelton Street, London, WC2H 9JQ</td></tr>
              <tr><th scope="row">Company number</th><td>11728204</td></tr>
              <tr><th scope="row">VAT number</th><td>316 9331 04</td></tr>
              <tr><th scope="row">Contact email for customers</th><td><a href="mailto:hello@asbestosadvice.uk">hello@asbestosadvice.uk</a></td></tr>
              <tr><th scope="row">Contact email for privacy requests</th><td><a href="mailto:privacy@asbestosadvice.uk">privacy@asbestosadvice.uk</a></td></tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection n={2} id="collect" title="What we collect and why">
        <p className={s.callout}>
          Photos you upload may show your property or other people. Please send only what is needed to answer your
          question.
        </p>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr><th>What we collect</th><th>Why we use it</th><th>Lawful basis (UK GDPR)</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Name, email, billing details when you buy</td>
                <td>To process your order, deliver downloads and send receipts</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Payment details</td>
                <td>Handled by Stripe. We do not see or store your full card number</td>
                <td>Contract</td>
              </tr>
              <tr>
                <td>Name, email, property address, photos and the details you send to Ask a Surveyor</td>
                <td>To answer your question and give you advice</td>
                <td>Contract / legitimate interests</td>
              </tr>
              <tr>
                <td>Your messages and enquiries</td>
                <td>To respond and keep a record of the advice given</td>
                <td>Legitimate interests</td>
              </tr>
              <tr>
                <td>Marketing email address (only if you opt in)</td>
                <td>To send updates, offers and related guidance</td>
                <td>Consent</td>
              </tr>
              <tr>
                <td>Device, browser and usage data through cookies</td>
                <td>To run, secure and improve the site and measure advertising</td>
                <td>Consent for non-essential cookies; legitimate interests for essential ones</td>
              </tr>
              <tr>
                <td>Records of transactions and tax information</td>
                <td>To meet tax and accounting rules</td>
                <td>Legal obligation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection n={3} id="share" title="Who we share it with">
        <p className={s.text}>
          We do not sell your data. We share it only with providers that help us run the service, under contracts
          that require them to protect it:
        </p>
        <ul className={s.list}>
          <li>Stripe for payment processing</li>
          <li>
            Website hosting, email and file delivery providers: <Todo>[names]</Todo>, plus HighLevel and/or
            Mailchimp for email marketing and customer communications
          </li>
          <li>
            Analytics and advertising providers (for example Google Analytics and Google Ads), where you accept
            cookies: <Todo>[names]</Todo>
          </li>
          <li>Our accountants and professional advisers</li>
        </ul>
        <p className={s.text} style={{ marginTop: 14 }}>
          We may disclose information if the law requires it. If we sell or restructure the business, customer data
          may transfer to the new owner under the same protections.
        </p>
      </LegalSection>

      <LegalSection n={4} id="transfers" title="International transfers">
        <p className={s.text}>
          Some providers are based outside the UK. Where data is sent abroad, we use safeguards such as the UK
          International Data Transfer Agreement or an approved adequacy arrangement. Contact us for details.
        </p>
      </LegalSection>

      <LegalSection n={5} id="keep" title="How long we keep it">
        <ul className={s.list}>
          <li>Order and tax records: 6 years after the end of the financial year</li>
          <li>
            Ask a Surveyor messages and photos: 12 months after the enquiry closes, unless you ask us to delete them
            sooner or we need them to deal with a complaint
          </li>
          <li>Marketing emails: until you unsubscribe</li>
          <li>Cookie data: as set out in our <a href="/cookies">cookie policy</a></li>
        </ul>
      </LegalSection>

      <LegalSection n={6} id="rights" title="Your rights">
        <p className={s.text}>
          Under UK data protection law you can ask us to: access your data, correct it, delete it, restrict or object
          to how we use it, move it to another provider, and withdraw consent at any time. To use these rights, email{' '}
          <a href="mailto:privacy@asbestosadvice.uk">privacy@asbestosadvice.uk</a>. We will reply within one month.
        </p>
        <p className={s.callout}>
          If you are unhappy with our response, you can complain to the Information Commissioner&apos;s Office at{' '}
          <a href="https://ico.org.uk" target="_blank" rel="noreferrer">ico.org.uk</a> or on 0303 123 1113.
        </p>
      </LegalSection>

      <LegalSection n={7} id="security" title="Security and children">
        <p className={s.text}>
          We use reasonable technical and organisational measures to protect your data. The site is not aimed at
          children under 16 and we do not knowingly collect their data.
        </p>
      </LegalSection>

      <LegalSection n={8} id="changes" title="Changes">
        <p className={s.text}>We may update this policy. The date at the top shows when it last changed.</p>
      </LegalSection>
    </LegalLayout>
  );
}