
'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/siteConfig';

type CountdownState = {
  live: boolean;
  d: string;
  h: string;
  m: string;
  s: string;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getState(): CountdownState {
  const end = new Date(siteConfig.deadlineIso).getTime();
  const left = Math.max(0, end - Date.now());
  const live = left > 0;
  const seconds = Math.floor(left / 1000);

  return {
    live,
    d: pad(Math.floor(seconds / 86400)),
    h: pad(Math.floor((seconds % 86400) / 3600)),
    m: pad(Math.floor((seconds % 3600) / 60)),
    s: pad(seconds % 60),
  };
}

export function useCountdown() {
  // Keep the initial server and browser render identical.
  const [state, setState] = useState<CountdownState | null>(null);

  useEffect(() => {
    // Calculate the actual countdown only after the component mounts.
    setState(getState());

    const timer = setInterval(() => {
      setState(getState());
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

export function DeadlineLabel() {
  return <>{deadlineLabel()}</>;
}

export function PriceText() {
  const state = useCountdown();

  // Use a consistent value during server rendering and hydration.
  if (state === null) {
    return <>{siteConfig.launchPrice}</>;
  }

  return <>{state.live ? siteConfig.launchPrice : siteConfig.fullPrice}</>;
}

export function Clock({ light }: { light?: boolean }) {
  const state = useCountdown();

  // Display placeholders until the real countdown is calculated.
  const { d, h, m, s } = state ?? {
    d: '--',
    h: '--',
    m: '--',
    s: '--',
  };

  return (
    <div className={`clock${light ? ' clock--light' : ''}`} aria-live="off">
      <div className="clock__cell">
        <span className="clock__num">{d}</span>
        <span className="clock__lab">days</span>
      </div>

      <div className="clock__cell">
        <span className="clock__num">{h}</span>
        <span className="clock__lab">hrs</span>
      </div>

      <div className="clock__cell">
        <span className="clock__num">{m}</span>
        <span className="clock__lab">min</span>
      </div>

      <div className="clock__cell">
        <span className="clock__num">{s}</span>
        <span className="clock__lab">sec</span>
      </div>
    </div>
  );
}

export function LiveOnly({ children }: { children: React.ReactNode }) {
  const state = useCountdown();

  // Keep the initial render consistent until the deadline is checked.
  if (state === null) {
    return <>{children}</>;
  }

  if (!state.live) {
    return null;
  }

  return <>{children}</>;
}

export function EndedOnly({ children }: { children: React.ReactNode }) {
  const state = useCountdown();

  if (state === null || state.live) {
    return null;
  }

  return <>{children}</>;
}
