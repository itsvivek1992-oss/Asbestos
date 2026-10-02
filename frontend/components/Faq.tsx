'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What exactly do I get?',
    a: 'Two things. A 58 page PDF guide that downloads the moment you pay, and one personal photo review from a working asbestos surveyor. Your download email contains the WhatsApp number, the email address and your review code.',
  },
  {
    q: 'How does the photo review work?',
    a: 'Send up to three photos of the material you are worried about, with the rough age of the property and what you are planning to do. A surveyor replies within one working day, Monday to Saturday. One review is included with each purchase and you can use it any time in the next 12 months.',
  },
  {
    q: 'Can the surveyor tell me whether it is asbestos?',
    a: 'Not for certain, and nobody honestly can from a photo. Only a laboratory test confirms it. What you will get is an experienced opinion on what the material most likely is, how much of a risk it is as it stands, and the right next step. If a test or survey makes sense, we will point you to a trusted service that covers your area.',
  },
  {
    q: 'Is it up to date?',
    a: "Yes. It was written in September 2026 and checked against the Control of Asbestos Regulations 2012, L143, HSG264, HSG247, HSG248 and the HSE Asbestos Essentials task sheets, including HSE's 2026 announcements.",
  },
  {
    q: 'I live in England. Is it relevant to me?',
    a: 'Yes. The asbestos regulations are the same across England, Scotland and Wales, with a matching set in Northern Ireland. Where waste, housing or compensation rules differ between the four nations, the book sets out each one.',
  },
  {
    q: 'Does it replace a survey or a test?',
    a: 'No, and it says so plainly. Nobody can identify asbestos from a description. What the book does is tell you when you need a test, which survey to ask for, what a fair price looks like, and what you can safely leave alone.',
  },
  {
    q: 'What if it is not what I expected?',
    a: 'Email us within 14 days and you get a full refund. No forms and no questions.',
  },
  {
    q: 'Can I get a VAT receipt?',
    a: 'Yes. A receipt is emailed automatically with your download link.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq">
      {FAQS.map((item, i) => {
        const open = openIndex === i;
        const id = `faq${i}`;
        return (
          <div className="faq__item" key={id}>
            <h3>
              <button
                type="button"
                className="faq__q"
                aria-expanded={open}
                aria-controls={id}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                <span>{item.q}</span>
                <span className="faq__sign" aria-hidden="true" />
              </button>
            </h3>
            <div className="faq__a" id={id} hidden={!open}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
