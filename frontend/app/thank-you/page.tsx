'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';

type Order = { reviewCode: string; downloadUrl: string; email: string };

// Stripe redirects here with ?session_id=cs_xxx after a successful payment.
// The order is looked up server-side (never trust query params for order details).
function ThankYouContent() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }
    const id: string = sessionId;
    let cancelled = false;
    let attempts = 0;

    // The webhook can land a few seconds after the redirect, so retry briefly.
    async function load() {
      try {
        const res = await fetch(`${siteConfig.apiBaseUrl}/api/orders/by-session/${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setOrder(data);
            setStatus('ready');
          }
          return;
        }
      } catch {
        // fall through and retry
      }
      attempts += 1;
      if (attempts < 8 && !cancelled) {
        setTimeout(load, 2000);
      } else if (!cancelled) {
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  function copyCode() {
    if (!order) return;
    navigator.clipboard.writeText(order.reviewCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main className="sec">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <p className="eyebrow">Thank you</p>
        <h1>Your book is on its way.</h1>

        {status === 'loading' && <p className="body">Finding your order…</p>}

        {status === 'error' && (
          <p className="body">
            We could not find that order automatically. Check your email for the download link and review code. It
            can take a minute to arrive. Still nothing? Use the <a href="/resend">resend page</a> or email
            hello@asbestosadvice.uk.
          </p>
        )}

        {status === 'ready' && order && (
          <>
            <p className="body">
              A confirmation email is on its way to <b>{order.email}</b> with your download link and receipt. Check
              your spam folder if it does not arrive within a few minutes.
            </p>

            <div className="buycard" style={{ marginTop: 24 }}>
              <p className="eyebrow">Your review code</p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 700, letterSpacing: '0.05em' }}>
                {order.reviewCode}
              </p>
              <button type="button" className="btn" onClick={copyCode}>
                {copied ? 'Copied' : 'Copy code'}
              </button>
            </div>

            <p className="body" style={{ marginTop: 24 }}>
              Ready to send your photos now?{' '}
              <a
                className="btn"
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Hi, my Asbestos Answered review code is ${order.reviewCode}. `
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Open WhatsApp
              </a>
            </p>

            <p className="body">
              <a className="btn" href={order.downloadUrl}>Download your book</a>
            </p>
            <p className="micro">This link expires 72 hours from now and can be used up to 5 times.</p>
          </>
        )}
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="sec">
          <div className="wrap" style={{ maxWidth: 640 }}>
            <p className="body">Loading…</p>
          </div>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}