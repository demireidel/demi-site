"use client";

import { useRef, useCallback } from "react";

const papers = [
  {
    title:
      "Scale Safety in Increasing-Returns Sectors: A Decision Framework for Remedy Design, with Google Search as a Worked Illustration",
    authors: "Demian Reidel & Javier Milei",
    year: "2026",
    summary:
      "Introduces the Scale Impact Assessment (SIA), a front-end screen for evaluating whether antitrust remedies risk destroying the productive scale on which quality, reliability, and innovation depend.",
    tag: "Policy",
    href: "/papers/scale-safety-sia.pdf",
  },
  {
    title:
      "Minimum Viable Scale, Local Activation, and Threshold Geometry under Increasing Returns and Endogenous Labor Supply",
    authors: "Demian Reidel & Javier Milei",
    year: "2026",
    summary:
      "An exact theory of scale floors, viability, threshold geometry, and decentralized scale safety under increasing returns and endogenous labor supply.",
    tag: "Theory",
    href: "/papers/minimum-viable-scale.pdf",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="tilt-card"
    >
      {children}
    </div>
  );
}

function PdfButton({ href }: { href: string }) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      // Show a subtle notification
      const el = e.currentTarget as HTMLElement;
      const original = el.textContent;
      el.textContent = "Available soon";
      setTimeout(() => {
        el.textContent = original;
      }, 2000);
    },
    []
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-sm border border-gold/50 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      PDF
    </a>
  );
}

export function Research() {
  return (
    <section id="research" className="py-[140px] max-md:py-24 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-ivory mb-1 leading-[0.95]">
            RESEARCH
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-16 gold-line" />
        </div>

        <div className="space-y-8 stagger-children">
          {papers.map((p, i) => (
            <TiltCard key={i}>
              <article className="fade-up group relative border border-rule bg-surface p-8 max-md:p-6 transition-all duration-300 hover:border-gold/30">
                <div className="flex items-start justify-between gap-4 max-md:flex-col">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block rounded-sm border border-gold/40 px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                        {p.tag}
                      </span>
                      <span className="font-sans text-sm text-muted">
                        {p.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-ivory leading-snug mb-2 normal-case">
                      {p.title}
                    </h3>
                    <p className="font-sans text-sm text-muted mb-3">
                      {p.authors}
                    </p>
                    <p className="font-serif text-base text-ivory/70 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                  <div className="flex-shrink-0 max-md:mt-4">
                    <PdfButton href={p.href} />
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
