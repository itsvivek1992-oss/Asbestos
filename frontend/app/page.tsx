import { Clock, DeadlineLabel, EndedOnly, LiveOnly, PriceText } from '@/components/Countdown';
import { BuyButton } from '@/components/BuyButton';
import { Faq } from '@/components/Faq';
import { LeadForm } from '@/components/LeadForm';
import { StickyBuyBar } from '@/components/StickyBuyBar';
import { TickIcon, SearchIcon } from '@/components/Icons';
import { siteConfig } from '@/lib/siteConfig';

const SEARCH_PILLS = [
  'does artex contain asbestos',
  'is my garage roof asbestos',
  'can you plaster over artex',
  'i drilled into asbestos',
  'asbestos floor tiles under carpet',
  'how much to remove asbestos',
  'can i sell a house with asbestos',
  'do i need an asbestos survey',
];

const CHAPTERS = [
  ['01', 'What it is', 'A mineral, not a chemical. Types, history and the 1999 ban.'],
  ['02', 'Is it dangerous?', 'What one exposure really means, and what to do about it.'],
  ['03', 'Is it in your home?', 'Sixteen places it hides, by age of building.'],
  ['04', 'What does it look like?', "A spotter's guide, ranked from worst to least."],
  ['05', 'Artex and ceilings', 'Does it contain asbestos? Can you plaster over it?'],
  ['06', 'Garage roofs and cement', 'Cleaning, repairing, removing. What is legal for you to do.'],
  ['07', 'Floors', 'Old tiles, black glue, and laying a new floor on top.'],
  ['08', 'Testing', 'Home kits against surveyor sampling, and what results mean.'],
  ['09', 'Surveys and the law', 'CAR 2012 in plain English. Which survey, and when.'],
  ['10', 'Removal and disposal', 'Licensed or not, the tip, skips, and all four UK nations.'],
  ['11', 'What it costs', 'Guide prices for tests, surveys and removal.'],
  ['12', 'If you have disturbed it', 'An eight step emergency page. Start here if you just drilled.'],
];

export default function HomePage() {
  return (
    <>
      {/* 1. LAUNCH BAR */}
      <LiveOnly>
        <div className="launch">
          <p>Launch price <b><PriceText /></b> until <span><DeadlineLabel /></span>. After that it is {siteConfig.fullPrice}.</p>
          <Clock />
        </div>
      </LiveOnly>
      <EndedOnly>
        <div className="launch launch--ended">
          <p>The launch price has ended. The book is now {siteConfig.fullPrice}.</p>
        </div>
      </EndedOnly>

      {/* 2. HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="hero__bar">
            <span className="wordmark">asbestosadvice.uk</span>
            <BuyButton position="header" className="hero__link">Get the book</BuyButton>
          </div>
          <div className="hero__grid">
            <div className="hero__text">
              <p className="eyebrow">The 2026 UK guide, plus your own surveyor photo review</p>
              <h1>Is it asbestos? Read the answers. Then <em>ask a surveyor.</em></h1>
              <p className="hero__sub">
                The 121 question guide to asbestos in UK homes, with a direct line to a working asbestos surveyor
                included. Send up to three photos by WhatsApp or email and get a personal reply within one working day.
              </p>
              <img
                className="hero__cover hero__cover--mobile"
                src="/assets/img/cover.jpg"
                width={760}
                height={1075}
                alt="Cover of Asbestos, Answered, the 2026 edition"
                fetchPriority="high"
              />
              <div className="hero__cta" id="hero-cta">
                <BuyButton position="hero">Get both for <PriceText /></BuyButton>
                <p className="micro">One payment. No subscription. The book downloads straight away.</p>
              </div>
              <ul className="ticks">
                <li><TickIcon /><span>Personal photo review by a working surveyor, included</span></li>
                <li><TickIcon /><span>Book checked against current HSE guidance</span></li>
                <li><TickIcon /><span>14 day money back guarantee</span></li>
              </ul>
            </div>
            <img className="hero__cover hero__cover--desktop" src="/assets/img/cover.jpg" width={760} height={1075} alt="" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main>
        {/* 3. SEARCH PILLS */}
        <section className="sec sec--bone">
          <div className="wrap">
            <h2>You have probably typed one of these.</h2>
            <ul className="pills">
              {SEARCH_PILLS.map((p) => (
                <li key={p}><SearchIcon />{p}</li>
              ))}
            </ul>
            <p className="lede">
              So did thousands of other people. We gathered almost 2,000 real searches, grouped them, and answered
              the 121 that come up again and again. No forums. No guesswork. No sales pitch in the middle of the answer.
            </p>
          </div>
        </section>

        {/* 4. ASK A SURVEYOR */}
        <section className="sec sec--black">
          <div className="wrap split">
            <div className="split__a">
              <p className="eyebrow">Included with every copy</p>
              <h2>Send three photos. A real surveyor replies.</h2>
              <ol className="steps">
                <li><span className="steps__n">1</span><div><h3>Buy the book</h3><p>It downloads straight away, along with your personal review code.</p></div></li>
                <li><span className="steps__n">2</span><div><h3>Send up to three photos</h3><p>By WhatsApp or email, with the rough age of the property and what you are planning to do.</p></div></li>
                <li><span className="steps__n">3</span><div><h3>A surveyor replies</h3><p>Within one working day: what it most likely is, how urgent it is, and exactly what to do next.</p></div></li>
              </ol>
              <p className="fine">
                Nobody can confirm or rule out asbestos from a photograph. Only a laboratory test can do that. What
                you get is an experienced surveyor&apos;s opinion on what the material most likely is, and clear next
                steps for your situation.
              </p>
            </div>
            <div className="chat" role="img" aria-label="Example exchange: a homeowner sends a photo of a textured ceiling and the surveyor replies with advice">
              <div className="chat__me">
                <svg className="chat__thumb" width="150" height="110" viewBox="0 0 150 110" aria-hidden="true">
                  <rect width="150" height="110" fill="#E9E6DC" />
                  <g fill="none" stroke="#B92F2C" strokeWidth="1.6">
                    <path d="M0 40a25 25 0 0 0 50 0M50 40a25 25 0 0 0 50 0M100 40a25 25 0 0 0 50 0M-25 70a25 25 0 0 0 50 0M25 70a25 25 0 0 0 50 0M75 70a25 25 0 0 0 50 0M125 70a25 25 0 0 0 50 0M0 100a25 25 0 0 0 50 0M50 100a25 25 0 0 0 50 0M100 100a25 25 0 0 0 50 0M-25 10a25 25 0 0 0 50 0M25 10a25 25 0 0 0 50 0M75 10a25 25 0 0 0 50 0M125 10a25 25 0 0 0 50 0" />
                  </g>
                </svg>
                <p>Found this on the bedroom ceiling. House is 1972. We want to fit downlights. Is it asbestos?</p>
              </div>
              <div className="chat__them">
                <b>Your surveyor</b>
                <p>
                  That appears to be a textured coating, often called Artex. In a home from 1972 there is a real
                  chance it contains a small amount of asbestos. Please do not drill or cut it yet. One sample,
                  tested by a laboratory, will settle it. Chapter 5 shows you what to do either way, and I can point
                  you to a testing service for your area.
                </p>
              </div>
              <p className="chat__note">An example of the kind of reply you can expect.</p>
            </div>
          </div>
        </section>

        {/* 5. SAMPLE ANSWER */}
        <section className="sec sec--chrys">
          <div className="wrap split split--center">
            <div className="split__a">
              <p className="eyebrow">Read one before you buy</p>
              <h2>Every answer starts with the short version.</h2>
              <p className="body">
                If that is all you need, move on. The detail underneath is there for when you want to understand
                why, with the HSE source tagged so you can check it yourself.
              </p>
            </div>
            <article className="sample">
              <h3>Does all Artex contain asbestos?</h3>
              <p className="sample__short">No. But a great deal of it does, and you cannot tell which by looking.</p>
              <p>
                White asbestos was added to Artex until about 1984. Other makers varied, old stock stayed on shelves
                and in vans for years, and white asbestos itself was not banned until 1999. The safe working
                assumption is that any textured coating applied before 2000 may contain asbestos until a test shows
                otherwise.
              </p>
              <p className="sample__src">From chapter 5, Artex and ceilings</p>
            </article>
          </div>
        </section>

        {/* 6. INSIDE THE BOOK */}
        <section className="sec">
          <div className="wrap">
            <p className="eyebrow">Inside the book</p>
            <h2>Twelve chapters. 121 answers. Designed to be read, not endured.</h2>
            <div className="previews" tabIndex={0} aria-label="Sample pages">
              <img src="/assets/img/page-artex.jpg" width={760} height={1075} loading="lazy" decoding="async" alt="Chapter opener for Artex and ceilings" />
              <img src="/assets/img/page-house.jpg" width={760} height={1075} loading="lazy" decoding="async" alt="Illustration of sixteen places asbestos hides in a house" />
              <img src="/assets/img/page-stop.jpg" width={760} height={1075} loading="lazy" decoding="async" alt="The emergency Stop page" />
              <img src="/assets/img/page-costs.jpg" width={760} height={1075} loading="lazy" decoding="async" alt="Guide price table" />
            </div>
            <ol className="chap">
              {CHAPTERS.map(([n, title, desc]) => (
                <li key={n}><span className="chap__n">{n}</span><div><h3>{title}</h3><p>{desc}</p></div></li>
              ))}
            </ol>
            <BuyButton position="inside">Get the book and your review, <PriceText /></BuyButton>
          </div>
        </section>

        {/* 7. WHO IT IS FOR */}
        <section className="sec sec--bone">
          <div className="wrap">
            <h2>Written for the moment just before the drill goes in.</h2>
            <ul className="cards cards--4">
              <li><h3>Homeowners</h3><p>You are about to drill, sand, rewire or rip out a kitchen in a home built before 2000.</p></li>
              <li><h3>Buyers and sellers</h3><p>A survey has flagged a garage roof or a textured ceiling and you need to know what it means for the price.</p></li>
              <li><h3>Landlords</h3><p>You want to know exactly what the law expects of you, and what it does not.</p></li>
              <li><h3>Trades</h3><p>You need a fast, reliable reference before you open up someone else&apos;s ceiling.</p></li>
            </ul>
          </div>
        </section>

        {/* 8. PRICE COMPARISON */}
        <section className="sec sec--black">
          <div className="wrap">
            <h2>Knowing first is the cheap part.</h2>
            <dl className="compare">
              <div><dt>A surveyor visit to test one ceiling</dt><dd>£150 to £250</dd></div>
              <div><dt>A refurbishment survey of a house</dt><dd>£400 to £900</dd></div>
              <div><dt>An emergency clean after drilling the wrong panel</dt><dd>Thousands</dd></div>
              <div className="compare__us"><dt>The book, plus a surveyor&apos;s view of your photos</dt><dd><PriceText /></dd></div>
            </dl>
            <p className="fine">Typical UK guide prices in 2026, before VAT, taken from chapter 11.</p>
          </div>
        </section>

        {/* 9. WHO WROTE IT */}
        <section className="sec">
          <div className="wrap split">
            <div className="split__a">
              <p className="eyebrow">Who wrote it</p>
              <h2>Working surveyors, not content writers.</h2>
              <p className="body">
                The book comes from a team that tests, surveys and removes asbestos six days a week, led by a
                surveyor with fifteen years on site. These are the answers given to real customers every day, written
                down properly.
              </p>
              {/* TO CONFIRM in the dev questionnaire: author name. Keep the data-todo
                  outline until Core Asbestos supplies it. */}
              <p className="byline" data-todo="author">[AUTHOR NAME], asbestos surveyor</p>
            </div>
            <div className="checked">
              <h3>Every answer checked against</h3>
              <ul className="ticks ticks--ink">
                <li><TickIcon /><span>The Control of Asbestos Regulations 2012 and its Approved Code of Practice, L143</span></li>
                <li><TickIcon /><span>HSG264, the survey guide</span></li>
                <li><TickIcon /><span>HSG247 and HSG248, for licensed removal and analysts</span></li>
                <li><TickIcon /><span>HSG210, all 49 Asbestos Essentials task sheets</span></li>
                <li><TickIcon /><span>Waste rules for England, Wales, Scotland and Northern Ireland</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. REVIEWS — none at launch, section stays hidden. Never add placeholder reviews. */}

        {/* 11. GUARANTEE */}
        <section className="sec sec--chrys">
          <div className="wrap guarantee">
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="#000" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
              <path d="M55 8l38 14v30c0 24-16 42-38 50C33 94 17 76 17 52V22z" />
              <path d="M38 56l12 12 24-27" />
            </svg>
            <div>
              <h2>Read it for 14 days. If it did not help, it is free.</h2>
              <p className="body">
                Email us within 14 days of buying and we refund you in full. You do not need to give a reason. The
                risk should be ours, not yours.
              </p>
            </div>
          </div>
        </section>

        {/* 12. FAQ */}
        <section className="sec">
          <div className="wrap split">
            <h2 className="split__a split__a--narrow">Fair questions</h2>
            <Faq />
          </div>
        </section>

        {/* 13. BUY CARD */}
        <section className="sec sec--croc" id="checkout">
          <div className="wrap split split--center">
            <div className="split__a">
              <h2>The answers tonight. A surveyor&apos;s view by tomorrow.</h2>
              <ul className="ticks">
                <li><TickIcon /><span>Asbestos, Answered. The 2026 UK edition, 58 page PDF</span></li>
                <li><TickIcon /><span>Your personal photo review by a working surveyor, up to three photos</span></li>
                <li><TickIcon /><span>Reply within one working day, by WhatsApp or email</span></li>
                <li><TickIcon /><span>Instant download, plus a link by email</span></li>
                <li><TickIcon /><span>14 day money back guarantee</span></li>
              </ul>
            </div>
            <div className="buycard" id="buycard">
              <LiveOnly>
                <p className="buycard__ends">Launch price ends <DeadlineLabel /></p>
                <Clock light />
              </LiveOnly>
              <p className="buycard__price">
                <PriceText /> <LiveOnly><s>{siteConfig.fullPrice}</s></LiveOnly>
              </p>
              <BuyButton position="buycard" className="btn btn--block">Get the book and review</BuyButton>
              <p className="micro micro--ink">Secure checkout with card, Apple Pay or Google Pay. One payment, no subscription, VAT receipt by email.</p>
            </div>
          </div>
        </section>

        {/* 14. FREE CHECKLIST */}
        <section className="lead">
          <div className="wrap lead__grid">
            <div>
              <h2 className="lead__h">Not ready to buy? Take the emergency page free.</h2>
              <p>The eight step checklist for when you have drilled, sanded or broken something. One page, sent to your inbox.</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      {/* 15. FOOTER */}
      <footer className="foot">
        <div className="wrap">
          <p className="wordmark">asbestosadvice.uk</p>
          <p>
            Asbestos, Answered is general guidance. It is not a substitute for an asbestos survey, a laboratory test,
            legal advice or a doctor. Published by Core Asbestos Services Ltd.{' '}
            {/* TO CONFIRM: Companies House number and registered office. */}
            <span data-todo="company">[Company number and registered office.]</span>
          </p>
          <nav aria-label="Legal">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms of sale</a>
            <a href="/refunds">Refunds</a>
            <a href="/cookies">Cookies</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </footer>

      <StickyBuyBar />
    </>
  );
}
