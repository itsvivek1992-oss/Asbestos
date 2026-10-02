/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The frontend never talks to Stripe directly and never decides the price.
  // It calls the Node/Express backend, whose base URL is set here.
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'
  }
};

module.exports = nextConfig;
