const Stripe = require('stripe');

if (!process.env.STRIPE_SECRET_KEY) {
  // Not throwing here so the rest of the app (lead capture, admin lookup)
  // can still run in local dev before Stripe keys are added.
  console.warn('[stripe] STRIPE_SECRET_KEY is not set — checkout and webhook routes will fail.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_missing', {
  apiVersion: '2024-06-20',
});

module.exports = stripe;
