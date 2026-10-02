'use client';

import { useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';
import { ArrowIcon } from './Icons';

function getUtmParams() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
  const out: Record<string, string> = {};
  keys.forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
}

export function BuyButton({
  position,
  children,
  className = 'btn btn--block-mobile',
}: {
  position: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    if (loading) return;
    setLoading(true);

    // Fire the tracking event. Meta Pixel / GA4 listeners attach to this,
    // gated behind cookie consent — see lib/analytics.ts.
    window.dispatchEvent(new CustomEvent('aa:initiate_checkout', { detail: { position } }));

    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The browser only ever sends *where* the click came from and the
        // marketing attribution. It never sends a price — the server decides
        // that from its own copy of the deadline.
        body: JSON.stringify({ position, utm: getUtmParams() }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || 'Could not start checkout');
      }
    } catch (err) {
      console.error('Checkout failed', err);
      setLoading(false);
      alert('Sorry, checkout could not be started. Please try again in a moment.');
    }
  }

  return (
    <a
      className={className}
      href="#checkout"
      data-buy
      data-position={position}
      onClick={(e) => {
        e.preventDefault();
        startCheckout();
      }}
      aria-busy={loading}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}
