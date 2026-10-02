import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asbestos, Answered. The UK guide, plus your own surveyor photo review',
  description:
    '121 real questions about asbestos in UK homes, answered in plain English, with a personal photo review from a working asbestos surveyor included.',
  openGraph: {
    title: 'Is it asbestos? Read the answers. Then ask a surveyor.',
    description: 'The 121 question guide to asbestos in UK homes, with a personal surveyor photo review included.',
    images: ['/assets/img/cover.jpg'],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preload" href="/assets/fonts/archivo-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/hanken-grotesk-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/assets/styles.css" />
        {/* DEV: CookieYes / consent-mode script goes here. Meta Pixel, GA4 and
            Clarity must not fire until consent is given — see lib/analytics.ts. */}
      </head>
      <body>{children}</body>
    </html>
  );
}
