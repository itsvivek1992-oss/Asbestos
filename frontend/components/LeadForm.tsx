'use client';

import { FormEvent, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

export function LeadForm() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (company) return; // honeypot tripped, silently ignore
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return;

    setStatus('sending');
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tag: 'checklist' }),
      });
      if (!res.ok) throw new Error('request failed');
      window.dispatchEvent(new CustomEvent('aa:lead'));
      setStatus('sent');
      setEmail('');
    } catch (err) {
      console.error('Lead submit failed', err);
      setStatus('error');
    }
  }

  return (
    <form className="lead__form" onSubmit={handleSubmit} noValidate>
      <label className="sr" htmlFor="lead-email">Email address</label>
      <input
        id="lead-email"
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.co.uk"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send it to me'}
      </button>
      <p className="lead__consent">
        You will receive the checklist and occasional emails about the book. Unsubscribe at any time.{' '}
        <a href="/privacy">Privacy policy</a>.
      </p>
      {status === 'sent' && (
        <p className="lead__ok" role="status">Sent. Please check your inbox.</p>
      )}
      {status === 'error' && (
        <p className="lead__ok" role="status">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
