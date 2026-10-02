# asbestosadvice.uk

Next.js frontend + Node/Express backend, built from the approved
`asbestosadvice-landing-page_Core-Design` handover pack and the
40-section dev questionnaire.

## Structure

```
frontend/   Next.js 14 (App Router) — the site
backend/    Node/Express API — checkout, webhook, fulfilment, admin
```

## Running locally

**Backend**
```
cd backend
npm install
cp .env.example .env      # fill in Stripe TEST keys at minimum
npm run dev                # http://localhost:4000
```

**Frontend**
```
cd frontend
npm install
npm run dev                # http://localhost:3000
```

The frontend calls the backend at `NEXT_PUBLIC_API_BASE_URL`
(defaults to `http://localhost:4000`).

To test the Stripe webhook locally, use the Stripe CLI:
```
stripe listen --forward-to localhost:4000/api/webhook
```
Copy the `whsec_...` it prints into `backend/.env` as `STRIPE_WEBHOOK_SECRET`.

## What's implemented

- Landing page rebuilt from the approved design (same HTML structure, CSS,
  fonts and images — nothing re-imagined)
- Live countdown + launch/full price switch, FAQ accordion, sticky mobile
  buy bar, checklist lead form
- Stripe Checkout session creation — **price is decided entirely server-side**
  from one fixed deadline (`backend/src/lib/pricing.js`); the browser cannot
  influence what it's charged
- Stripe webhook: signature verification, duplicate-event protection, order
  creation, unique review code (`AA-7F29K3` format, no look-alike characters),
  secure download token, refund handling
- Secure download endpoint: 72 hour expiry, 5 uses, private file, not
  publicly linked or indexed
- Resend-download page: identical response whether or not an order exists
  for the given email (no account enumeration)
- Thank-you page: pulls the order server-side by Stripe session ID, shows
  the review code with copy button and a WhatsApp deep link
- Admin review-code lookup page (password protected) for the surveyor to
  check/mark codes as used
- SQLite for storage — fine for staging/low volume, swap for Postgres/MySQL
  before scaling

## What's deliberately stubbed, and why

Search the code for `DEV:` and `TODO` comments. The main ones:

| Area | Status | Needs |
|---|---|---|
| Email sending (`backend/src/lib/email.js`) | Logs instead of sending | Approved wording (section 15) + mailbox provider decision (section 17) |
| Brevo checklist automation | Leads stored locally | Brevo account + API key (section 18) |
| Meta Pixel / Conversions API | Client event dispatched (`aa:initiate_checkout`, `aa:lead`), not yet wired to Meta | Business Manager access, pixel ID (section 19–20) |
| GA4 / Microsoft Clarity | Not wired | Property/project creation, access (section 21, 23) |
| Cookie consent (CookieYes) | Not wired — analytics scripts must not fire before consent | CookieYes account |
| Legal pages (privacy/terms/cookies) | Clearly marked placeholders | Approved legal wording from Core Asbestos (section 25) |
| Admin auth | Single shared password | Fine to ship as-is per the brief, but consider real per-user auth if more than one surveyor needs access |
| Stripe account | Uses test keys until swapped | A verified live Stripe account (section 9) |
| Consumer Contracts cancellation tickbox | Not yet on Checkout | Final legal sign-off on the wording (section 26) |
| Hosting/domain | Not deployed anywhere yet | Domain DNS access, hosting decision (sections 2–3) |
| PDF stamping (buyer email/order number footer) | Not built | Explicitly phase 2 per the brief — quote separately |

## Access you'll need before launch (not for me — for whoever deploys this)

Per section 38 of the brief, every account stays owned by Core Asbestos
Services Ltd with collaborator-only access for the developer:
domain DNS, Stripe, the mailbox provider, Meta Business Manager, GA4,
Microsoft Clarity, and Brevo. None of that is needed to keep developing —
only to go live.
