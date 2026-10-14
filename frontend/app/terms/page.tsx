import type { Metadata } from 'next';
import LegalLayout, { LegalSection, Todo } from '@/components/LegalLayout';
import s from '@/components/legal.module.css';

export const metadata: Metadata = {
  title: 'Terms and Conditions | asbestosadvice.uk',
  description: 'The terms that apply when you buy digital products or services from asbestosadvice.uk.',
};

const NAV = [
  { id: 'who', title: 'Who we are' },
  { id: 'what', title: 'What we sell' },
  { id: 'ordering', title: 'Ordering and delivery' },
  { id: 'payment', title: 'Payment' },
  { id: 'cancel', title: 'Your right to cancel' },
  { id: 'faulty', title: 'Faulty or misdescribed products' },
  { id: 'advice', title: 'Advice and limits' },
  { id: 'ip', title: 'Intellectual property' },
  { id: 'liability', title: 'Our liability' },
  { id: 'complaints', title: 'Complaints' },
  { id: 'law', title: 'Changes and law' },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms and Conditions"
      intro="These terms apply when you buy digital products or services from asbestosadvice.uk. By placing an order you agree to them."
      updated={<Todo>[DD Month YYYY]</Todo>}
      sections={NAV}
    >
      <LegalSection n={1} id="who" title="Who we are">
        <p className={s.text}>
          The seller is Core Asbestos Services Ltd (company number 11728204, VAT number 316 9331 04), registered
          office 71-75 Shelton Street, London, WC2H 9JQ, trading as Core Asbestos Scotland. Contact:{' '}
          <a href="mailto:hello@asbestosadvice.uk">hello@asbestosadvice.uk</a>.
        </p>
      </LegalSection>

      <LegalSection n={2} id="what" title="What we sell">
        <ul className={s.list}>
          <li>
            Digital downloads, such as the Asbestos Answered guide and compliance document packs, delivered as files
            by download link or email.
          </li>
          <li>
            Ask a Surveyor, a written answer from a qualified asbestos surveyor to a question you submit, sometimes
            based on photos you send.
          </li>
        </ul>
        <p className={s.text} style={{ marginTop: 14 }}>
          Product pages show what is included and the price. All prices include VAT at the current UK rate, and your
          receipt shows the VAT charged.
        </p>
      </LegalSection>

      <LegalSection n={3} id="ordering" title="Ordering and delivery">
        <p className={s.text}>
          An order is accepted when we send you confirmation. Digital downloads are available straight after payment.
          Ask a Surveyor answers are sent by email within 1 hour of payment for orders placed between 7am and 10pm
          (UK time). Orders placed outside those hours are answered during the next 7am to 10pm window, unless we
          tell you otherwise.
        </p>
      </LegalSection>

      <LegalSection n={4} id="payment" title="Payment">
        <p className={s.text}>
          Payment is taken in pounds sterling at checkout through Stripe. We do not store your full card details.
        </p>
      </LegalSection>

      <LegalSection n={5} id="cancel" title="Your right to cancel">
        <p className={s.text}>
          Under the Consumer Contracts Regulations 2013, you normally have 14 days from purchase to cancel.
        </p>
        <ul className={s.list}>
          <li>
            <b>Digital downloads:</b> the right to cancel ends once the download starts, because you agree at
            checkout to immediate delivery and acknowledge that you lose your right to cancel when it begins.
          </li>
          <li>
            <b>Ask a Surveyor:</b> if you ask us to start straight away, you can still cancel within 14 days but
            must pay for the work already done. If the answer has been fully provided, the right to cancel is lost.
          </li>
        </ul>
        <p className={s.text} style={{ marginTop: 14 }}>
          To cancel, email <a href="mailto:hello@asbestosadvice.uk">hello@asbestosadvice.uk</a> with your order
          details.
        </p>
      </LegalSection>

      <LegalSection n={6} id="faulty" title="Faulty or misdescribed products">
        <p className={s.text}>
          Your legal rights under the Consumer Rights Act 2015 are not affected. If a file is corrupt, will not open
          or is not as described, tell us and we will fix it, replace it or refund you.
        </p>
      </LegalSection>

      <LegalSection n={7} id="advice" title="Advice and limits">
        <p className={s.text}>
          Our products give general information and, for Ask a Surveyor, an opinion based on what you tell us and any
          photos. A photo or description cannot confirm whether a material contains asbestos. Only laboratory
          analysis of a sample, or a properly carried out survey, can do that. Do not disturb, drill, cut or remove a
          suspect material because of our answer. Our products are not legal advice and do not replace a survey, a
          risk assessment or work by competent contractors.
        </p>
      </LegalSection>

      <LegalSection n={8} id="ip" title="Intellectual property">
        <p className={s.text}>
          All content is protected by copyright and belongs to Core Asbestos Services Ltd. You get a personal,
          non-transferable licence to use the files for your own or your organisation&apos;s internal use. Compliance
          templates may be adapted for your own premises. You may not resell, share or publish them.
        </p>
      </LegalSection>

      <LegalSection n={9} id="liability" title="Our liability">
        <p className={s.text}>
          We are responsible for losses that are a foreseeable result of our breach of these terms or of our
          negligence. We do not exclude liability for death or personal injury caused by negligence, fraud, or
          anything else that cannot legally be excluded. We are not liable for losses from business interruption,
          lost profits or events outside our control. Our total liability for any order is limited to the price you
          paid for it.
        </p>
      </LegalSection>

      <LegalSection n={10} id="complaints" title="Complaints">
        <p className={s.text}>
          Email <a href="mailto:hello@asbestosadvice.uk">hello@asbestosadvice.uk</a> and we will reply within 48
          hours.
        </p>
      </LegalSection>

      <LegalSection n={11} id="law" title="Changes and law">
        <p className={s.text}>
          We may update these terms; the version in force when you ordered applies to your order. These terms are
          governed by the laws of England and Wales. If you live in Scotland or Northern Ireland you may also bring
          proceedings in the courts there.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}