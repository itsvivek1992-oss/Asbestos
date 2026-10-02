'use client';

import { FormEvent, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

type LookupResult = {
  code: string;
  status: 'unused' | 'used' | 'refunded' | 'invalid';
  orderDate?: string;
  buyerEmail?: string;
};

// Simple password-protected admin page (section 14). The password is
// checked server-side on every request — nothing sensitive is ever
// trusted from the browser. For anything beyond a single shared
// password, swap this for real auth (e.g. NextAuth) before launch.
export default function ReviewCodeAdminPage() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function lookup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/api/admin/review-codes/${encodeURIComponent(code.trim())}`, {
        headers: { 'x-admin-password': password },
      });
      if (res.status === 401) {
        setError('Wrong password.');
        return;
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('Something went wrong looking that up.');
    } finally {
      setLoading(false);
    }
  }

  async function markUsed() {
    if (!result) return;
    setLoading(true);
    try {
      await fetch(`${siteConfig.apiBaseUrl}/api/admin/review-codes/${encodeURIComponent(result.code)}/mark-used`, {
        method: 'POST',
        headers: { 'x-admin-password': password },
      });
      setResult({ ...result, status: 'used' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="sec">
      <div className="wrap" style={{ maxWidth: 480 }}>
        <p className="eyebrow">Ask a Surveyor</p>
        <h1>Review code lookup</h1>
        <form onSubmit={lookup} className="lead__form">
          <label className="sr" htmlFor="admin-password">Admin password</label>
          <input
            id="admin-password"
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="sr" htmlFor="review-code">Review code</label>
          <input
            id="review-code"
            type="text"
            placeholder="AA-7F29K3"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            style={{ marginTop: 12 }}
            required
          />
          <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
            {loading ? 'Checking…' : 'Look up code'}
          </button>
        </form>

        {error && <p className="body" style={{ color: 'var(--red)' }}>{error}</p>}

        {result && (
          <div className="buycard" style={{ marginTop: 24 }}>
            <p><b>{result.code}</b></p>
            <p>Status: <b>{result.status}</b></p>
            {result.orderDate && <p>Order date: {result.orderDate}</p>}
            {result.buyerEmail && <p>Buyer: {result.buyerEmail}</p>}
            {result.status === 'unused' && (
              <button type="button" className="btn" onClick={markUsed} disabled={loading}>
                Mark as used
              </button>
            )}
            {(result.status === 'invalid' || result.status === 'refunded') && (
              <p className="fine">This code cannot be used for a review.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
