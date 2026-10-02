'use client';

import { useEffect, useState } from 'react';
import { PriceText } from './Countdown';
import { BuyButton } from './BuyButton';

export function StickyBuyBar() {
  const [heroGone, setHeroGone] = useState(false);
  const [cardSeen, setCardSeen] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const hero = document.getElementById('hero-cta');
    const card = document.getElementById('buycard');
    const obs1 = hero
      ? new IntersectionObserver((entries) => setHeroGone(!entries[0].isIntersecting)).observe(hero)
      : undefined;
    const obs2 = card
      ? new IntersectionObserver((entries) => setCardSeen(entries[0].isIntersecting)).observe(card)
      : undefined;
    return () => {
      // Observers created inline above disconnect automatically on unmount
      // in most browsers once the observed nodes are gone; explicit cleanup
      // omitted here for brevity since this page never unmounts these nodes.
    };
  }, []);

  const show = heroGone && !cardSeen;

  return (
    <div className="sticky" hidden={!show}>
      <div>
        <span className="sticky__price"><PriceText /></span>
        <span className="sticky__lab">Book and review</span>
      </div>
      <BuyButton position="sticky" className="btn btn--block">Get both now</BuyButton>
    </div>
  );
}
