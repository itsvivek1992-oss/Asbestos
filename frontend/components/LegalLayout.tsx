import Link from 'next/link';
import s from './legal.module.css';

export type LegalNavItem = { id: string; title: string };

/** Marks a detail that is still to be confirmed (shows with a red outline). */
export function Todo({ children }: { children: React.ReactNode }) {
  return <span data-todo="legal">{children}</span>;
}

export function LegalSection({
  n,
  id,
  title,
  children,
}: {
  n: number;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={s.section} id={id}>
      <span className={s.num}>{String(n).padStart(2, '0')}</span>
      <div>
        <h2 className={s.h}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function LegalLayout({
  title,
  intro,
  updated,
  sections,
  children,
}: {
  title: string;
  intro: string;
  updated: React.ReactNode;
  sections: LegalNavItem[];
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={s.top}>
        <div className={`wrap ${s.topInner}`}>
          <Link href="/" className={s.brand}>asbestosadvice.uk</Link>
          <Link href="/" className={s.back}>&larr; Back to the book</Link>
        </div>
      </div>

      <header className={s.hero}>
        <div className="wrap">
          <p className="eyebrow">Legal</p>
          <h1 className={s.title}>{title}</h1>
          <p className={s.intro}>{intro}</p>
          <p className={s.meta}>Last updated: {updated}</p>
        </div>
      </header>

      <main className="wrap">
        <div className={s.layout}>
          <nav className={s.toc} aria-label="On this page">
            <p className={s.tocTitle}>On this page</p>
            {sections.map((x, i) => (
              <a key={x.id} href={`#${x.id}`}>
                {String(i + 1).padStart(2, '0')}&nbsp;&nbsp;{x.title}
              </a>
            ))}
          </nav>

          <div className={s.content}>
            {children}
            <div className={s.more}>
              <Link href="/refunds">Refunds</Link>
              <Link href="/terms">Terms and conditions</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}