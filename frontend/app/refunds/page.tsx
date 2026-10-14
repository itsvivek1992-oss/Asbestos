// Section 27 of the dev questionnaire gives this content directly, so it is
// filled in rather than left as a placeholder. Still worth a final legal
// check alongside the other legal pages before launch.
import type { Metadata } from 'next';
import Link from 'next/link';
import s from '@/components/legal.module.css';

export const metadata: Metadata = {
  title: 'Refund Policy | asbestosadvice.uk',
  description:
    'Our 14-day money-back guarantee for Asbestos, Answered and the Ask a Surveyor photo review. No reason needed.',
};

const SECTIONS = [
  { id: 'who', title: 'Who qualifies' },
  { id: 'how', title: 'How to request a refund' },
  { id: 'conditions', title: 'Conditions' },
  { id: 'download', title: 'Your download' },
  { id: 'review', title: 'Your Ask a Surveyor review' },
  { id: 'timing', title: 'How long it takes' },
  { id: 'rights', title: 'Your statutory rights' },
  { id: 'contact', title: 'Contact' },
];

function Section({ n, id, title, children }: { n: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <section className={s.section} id={id}>
      <span className={s.num}>{String(n).padStart(2, '0')}</span>
      <div>
        <h2 className={s.h}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function RefundsPage() {
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
          <p className="eyebrow">Legal</p>
          <h1 className={s.title}>Refund Policy</h1>
          <p className={s.intro}>
            Our 14-day money-back guarantee for Asbestos, Answered and the Ask a Surveyor photo review, bought from
            asbestosadvice.uk. If it isn&apos;t right for you, you get your money back.
          </p>
          <p className={s.meta}>
            Last updated: <span data-todo="date">[date of launch]</span>
          </p>

          <div className={s.glance}>
            <div className={s.stat}>
              <p className={s.statNum}>14 days</p>
              <p className={s.statLab}>to request a refund, counted from your purchase date.</p>
            </div>
            <div className={s.stat}>
              <p className={s.statNum}>No reason</p>
              <p className={s.statLab}>needed. Just email your order number. No forms to fill in.</p>
            </div>
            <div className={s.stat}>
              <p className={s.statNum}>5 working days</p>
              <p className={s.statLab}>to refund the card or payment method you used at checkout.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        <div className={s.layout}>
          <nav className={s.toc} aria-label="On this page">
            <p className={s.tocTitle}>On this page</p>
            {SECTIONS.map((x, i) => (
              <a key={x.id} href={`#${x.id}`}>
                {String(i + 1).padStart(2, '0')}&nbsp;&nbsp;{x.title}
              </a>
            ))}
          </nav>

          <div className={s.content}>
            <Section n={1} id="who" title="Who qualifies">
              <p className={s.text}>
                Any buyer, within 14 days of their purchase date. You don&apos;t need a reason.
              </p>
            </Section>

            <Section n={2} id="how" title="How to request a refund">
              <p className={s.text}>
                Email <a href="mailto:support@asbestosadvice.uk">support@asbestosadvice.uk</a> with your order
                number. That&apos;s all we need. No form, no explanation required.
              </p>
            </Section>

            <Section n={3} id="conditions" title="Conditions">
              <p className={s.text}>The only condition is the 14-day window. One refund per customer.</p>
            </Section>

            <Section n={4} id="download" title="What happens to your download">
              <p className={s.text}>Once a refund is given, your download link is disabled.</p>
            </Section>

            <Section n={5} id="review" title="What happens to your Ask a Surveyor review">
              <ul className={s.list}>
                <li>
                  If you haven&apos;t used your photo review yet, your review code is cancelled along with the
                  refund.
                </li>
                <li>
                  If you&apos;ve already received a review, the refund is still given in full. Receiving your review
                  does not affect your right to a refund within the 14-day window.
                </li>
              </ul>
            </Section>

            <Section n={6} id="timing" title="How long it takes">
              <p className={s.text}>
                Refunds are processed within 5 working days, to the original payment method used at checkout.
              </p>
            </Section>

            <Section n={7} id="rights" title="How this fits with your statutory cancellation rights">
              <p className={s.text}>
                For digital content like this guide, your statutory right to cancel under the Consumer Contracts
                Regulations 2013 ends once your download begins (see the <Link href="/terms">Terms &amp; Conditions</Link>).
              </p>
              <p className={s.callout}>
                This 14-day guarantee is separate from that right and is offered on top of it, not instead of it. It
                applies even after your download has started.
              </p>
            </Section>

            <Section n={8} id="contact" title="Contact">
              <div className={s.contactCard}>
                <p>
                  Core Asbestos Services Ltd
                  <br />
                  71-75 Shelton Street, London, WC2H 9JQ
                </p>
                <a className={s.mail} href="mailto:support@asbestosadvice.uk?subject=Refund%20request">
                  Email support@asbestosadvice.uk
                </a>
              </div>
            </Section>

            <div className={s.more}>
              <Link href="/terms">Terms of sale</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
