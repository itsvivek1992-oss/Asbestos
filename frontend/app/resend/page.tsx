'use client';

import { FormEvent, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

// Section 32 of the brief: the page always shows the same message, whether
// or not an order exists for that email, so it never reveals which emails
// have purchased.
export default function ResendPage() {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${siteConfig.apiBaseUrl}/api/resend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderNumber: orderNumber || undefined }),
      });
    } catch (err) {
      console.error('Resend request failed', err);
      // Deliberately swallowed — the visible outcome must not change either way.
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <main className="sec">
      <div className="wrap" style={{ maxWidth: 560 }}>
        <p className="eyebrow">Resend my download</p>
        <h1>Get your download link again.</h1>

        {submitted ? (
          <p className="body">
            If that email has an order with us, a new download link is on its way. It can take a few minutes, and it
            is worth checking your spam folder. Still nothing after ten minutes? Email support@asbestosadvice.uk.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="lead__form" style={{ maxWidth: 420 }}>
            <label className="sr" htmlFor="resend-email">Email used at checkout</label>
            <input
              id="resend-email"
              type="email"
              required
              placeholder="you@example.co.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="sr" htmlFor="resend-order">Order number (optional)</label>
            <input
              id="resend-order"
              type="text"
              placeholder="Order number (optional)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              style={{ marginTop: 12 }}
            />
            <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
              {loading ? 'Sending…' : 'Send my download link'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
