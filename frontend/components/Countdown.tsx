'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getState() {
  const end = new Date(siteConfig.deadlineIso).getTime();
  const left = Math.max(0, end - Date.now());
  const live = left > 0;
  const s = Math.floor(left / 1000);
  return {
    live,
    d: pad(Math.floor(s / 86400)),
    h: pad(Math.floor((s % 86400) / 3600)),
    m: pad(Math.floor((s % 3600) / 60)),
    s: pad(s % 60),
  };
}

export function useCountdown() {
  const [state, setState] = useState(getState);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => {
        const next = getState();
        return prev.live !== next.live || prev.s !== next.s ? next : prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return state;
}

export function deadlineLabel() {
  return new Date(siteConfig.deadlineIso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/London',
  });
}

/**
 * Server Components cannot call a plain function imported from a
 * 'use client' module — only render components from it. This wraps
 * deadlineLabel() as a component so app/page.tsx can use <DeadlineLabel />
 * instead of calling deadlineLabel() directly.
 */
export function DeadlineLabel() {
  return <>{deadlineLabel()}</>;
}

export function PriceText() {
  const { live } = useCountdown();
  return <>{live ? siteConfig.launchPrice : siteConfig.fullPrice}</>;
}

export function Clock({ light }: { light?: boolean }) {
  const { d, h, m, s } = useCountdown();
  return (
    <div className={`clock${light ? ' clock--light' : ''}`} aria-live="off">
      <div className="clock__cell"><span className="clock__num">{d}</span><span className="clock__lab">days</span></div>
      <div className="clock__cell"><span className="clock__num">{h}</span><span className="clock__lab">hrs</span></div>
      <div className="clock__cell"><span className="clock__num">{m}</span><span className="clock__lab">min</span></div>
      <div className="clock__cell"><span className="clock__num">{s}</span><span className="clock__lab">sec</span></div>
    </div>
  );
}

/** Wraps children, only rendering while the launch price is live. */
export function LiveOnly({ children }: { children: React.ReactNode }) {
  const { live } = useCountdown();
  if (!live) return null;
  return <>{children}</>;
}

export function EndedOnly({ children }: { children: React.ReactNode }) {
  const { live } = useCountdown();
  if (live) return null;
  return <>{children}</>;
}
