import type { Metadata } from 'next';
import LegalLayout, { LegalSection, Todo } from '@/components/LegalLayout';
import s from '@/components/legal.module.css';

export const metadata: Metadata = {
  title: 'Cookie Policy | asbestosadvice.uk',
  description: 'The cookies asbestosadvice.uk uses, why we use them, and how to manage your choices.',
};

const NAV = [
  { id: 'what', title: 'What cookies are' },
  { id: 'types', title: 'Types of cookie we use' },
  { id: 'list', title: 'Cookies we set' },
  { id: 'manage', title: 'Managing your choices' },
  { id: 'contact', title: 'Changes and contact' },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      intro="The cookies we use, why we use them, and how you can control them."
      updated={<Todo>[DD Month YYYY]</Todo>}
      sections={NAV}
    >
      <LegalSection n={1} id="what" title="What cookies are">
        <p className={s.text}>
          Cookies are small files that a website stores on your device. We use them to make the site work and, with
          your consent, to understand how it is used and to measure our advertising. This policy applies to
          asbestosadvice.uk and should be read with our <a href="/privacy">privacy policy</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} id="types" title="Types of cookie we use">
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr><th>Category</th><th>Purpose</th><th>Consent needed?</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Strictly necessary</td>
                <td>Keep the site secure, remember your basket and checkout, and store your cookie choices</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Analytics</td>
                <td>Count visits and show which pages are used, so we can improve the site</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Advertising and marketing</td>
                <td>Measure our Google Ads campaigns and show relevant ads</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection n={3} id="list" title="Cookies we set">
        <p className={s.callout}>
          <Todo>[Dev team: replace the rows below with the cookies the live site actually sets, checked with a
          cookie scanner before launch. Remove this note when done.]</Todo>
        </p>
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr><th>Cookie name</th><th>Provider</th><th>Category</th><th>Purpose</th><th>Duration</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><Todo>[consent cookie name]</Todo></td>
                <td>asbestosadvice.uk</td>
                <td>Strictly necessary</td>
                <td>Remembers your cookie choices</td>
                <td><Todo>[6-12 months]</Todo></td>
              </tr>
              <tr>
                <td><Todo>[session / basket cookie]</Todo></td>
                <td><Todo>[Shopify / Stripe / own site]</Todo></td>
                <td>Strictly necessary</td>
                <td>Keeps your basket and checkout working</td>
                <td><Todo>[Session]</Todo></td>
              </tr>
              <tr>
                <td>_ga, ga[ID]</td>
                <td>Google Analytics</td>
                <td>Analytics</td>
                <td>Distinguishes visitors and measures usage</td>
                <td><Todo>[Up to 2 years]</Todo></td>
              </tr>
              <tr>
                <td><Todo>[_gcl_au, others]</Todo></td>
                <td>Google Ads</td>
                <td>Advertising</td>
                <td>Measures ad conversions</td>
                <td><Todo>[90 days]</Todo></td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection n={4} id="manage" title="Managing your choices">
        <p className={s.text}>
          When you first visit, a banner lets you accept all, reject all non-essential cookies, or choose by
          category. Rejecting is as easy as accepting. You can change your choice at any time using the &quot;Cookie
          settings&quot; link in the site footer. You can also block or delete cookies in your browser settings,
          though some parts of the site may stop working.
        </p>
        <p className={s.callout}>Non-essential cookies are not set until you have given consent.</p>
      </LegalSection>

      <LegalSection n={5} id="contact" title="Changes and contact">
        <p className={s.text}>
          We may update this policy when we change the cookies we use. Questions:{' '}
          <a href="mailto:privacy@asbestosadvice.uk">privacy@asbestosadvice.uk</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}