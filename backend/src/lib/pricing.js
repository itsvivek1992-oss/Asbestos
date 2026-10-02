// The ONLY place that decides what a customer is charged. The browser never
// sends a price — see routes/checkout.js.
//
// Keep DEADLINE_ISO in sync with frontend/lib/siteConfig.ts. UK clocks go
// back to GMT on 25 Oct 2026, so 31 Oct 2026 23:59 UK time is 23:59 UTC.
const DEADLINE_ISO = '2026-10-31T23:59:59Z';

const LAUNCH_PRICE_PENCE = 1999; // £19.99
const FULL_PRICE_PENCE = 2499; // £24.99
const CURRENCY = 'gbp';

function isLaunchPriceLive(now = new Date()) {
  return now.getTime() < new Date(DEADLINE_ISO).getTime();
}

function currentPricePence(now = new Date()) {
  return isLaunchPriceLive(now) ? LAUNCH_PRICE_PENCE : FULL_PRICE_PENCE;
}

module.exports = {
  DEADLINE_ISO,
  LAUNCH_PRICE_PENCE,
  FULL_PRICE_PENCE,
  CURRENCY,
  isLaunchPriceLive,
  currentPricePence,
};
