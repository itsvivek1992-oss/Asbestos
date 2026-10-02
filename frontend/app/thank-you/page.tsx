'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';

// DEV: Stripe redirects here with ?session_id=cs_xxx after a successful
// payment. We look the order up server-side (never trust query params for
// order details) to get the review code and download link.
export default function ThankYouPage() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState<{ reviewCode: string; downloadUrl: string; email: string } | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }
    fetch(`${siteConfig.apiBaseUrl}/api/orders/by-session/${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setStatus('ready');
        // Purchase event is sent server-side from the Stripe webhook (with
        // Conversions API dedup), not from here, so a page refresh can never
        // double count a sale.
      })
      .catch(() => setStatus('error'));
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
            We could not find that order automatically. Check your email for the download link and review code — it
            can take a minute to arrive. Still nothing? Use the{' '}
            <a href="/resend">resend page</a> or email support@asbestosadvice.uk.
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
