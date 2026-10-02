// Display-only configuration for the landing page.
//
// IMPORTANT: this drives what visitors *see* (the countdown, the struck-through
// price, the copy). It is NOT what they get charged. The backend
// (backend/src/lib/pricing.js) re-derives the price from its own copy of the
// deadline at the moment the Stripe Checkout Session is created, so a visitor
// tampering with the browser can never change what they pay.
//
// Keep this in sync with backend/src/lib/pricing.js -> DEADLINE_ISO.
export const siteConfig = {
  launchPrice: '£19.99',
  fullPrice: '£24.99',
  // One fixed moment. Never reset per visitor. UK clocks go back to GMT on
  // 25 Oct 2026, so 31 Oct 2026 23:59 UK time falls in GMT (UTC+0) = 23:59 UTC.
  deadlineIso: '2026-10-31T23:59:59Z',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
};
