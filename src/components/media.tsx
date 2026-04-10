"use client";

import { useRef, useCallback } from "react";

const appearances = [
  {
    title: "IAEA International Symposium on AI and Nuclear Energy",
    year: "2025",
    desc: "Presented as President of Nucleoel\u00e9ctrica Argentina on transitioning to a sustainable future with nuclear. Positioned Argentina\u2019s AI and nuclear ambitions at the highest international stage.",
    type: "Conference",
    link: "https://www.iaea.org/sites/default/files/25/05/day_3_transition_to_a_sustainable_future_with_nuclear_mr_demian_reidel.pdf",
  },
  {
    title: "Argentine Nuclear Plan \u2014 Casa Rosada",
    year: "2024",
    desc: "Joint presentation with President Milei and IAEA Director General Rafael Grossi. Announced the ACR-300 SMR reactor program and creation of the Argentine Nuclear Council.",
    type: "Policy",
  },
  {
    title: "Lex Fridman Podcast #453",
    year: "2024",
    desc: 'During this landmark two-hour interview, President Milei referenced Demi and noted that Ken Rogoff called him his best student. Millions of views across platforms.',
    type: "Podcast",
  },
  {
    title: "La \u00daltima Frontera \u2014 Episode 95",
    year: "2024",
    desc: "In-depth conversation with Santi Siri on the Argentine Nuclear Plan, AI, Cherenkov radiation physics, and Argentina\u2019s technology positioning.",
    type: "Podcast",
    link: "https://youtu.be/qImx7ouZKes",
  },
  {
    title: "DEF / Infobae \u2014 Science Salon, Casa Rosada",
    year: "2025",
    desc: '"El Plan Nuclear Argentino puede cambiar el pa\u00eds para siempre." Detailed discussion of SMR technology, ACR-300, and Argentina\u2019s competitive advantages for AI infrastructure.',
    type: "Interview",
  },
  {
    title: "World Economic Forum",
    year: "2025",
    desc: "Participant and speaker. Listed as Chairman of the Argentine Nuclear Council.",
    type: "Conference",
  },
  {
    title: "Princeton \u2014 Julis-Rabinowitz Center",
    year: "2024",
    desc: 'Invited speaker at "Argentina Under Pressure Again" \u2014 Princeton\u2019s center for economics and finance.',
    type: "Academic",
  },
  {
    title: "CNEA 75th Anniversary \u2014 RA-10 Reactor Speech",
    year: "2025",
    desc: 'Delivered at Centro At\u00f3mico Ezeiza. Announced construction of four ACR-300 modules. "El futuro es nuclear y Argentina est\u00e1 llamada a liderarlo."',
    type: "Speech",
  },
];

const typeColors: Record<string, string> = {
  Conference: "text-gold border-gold/40",
  Policy: "text-gold border-gold/40",
  Podcast: "text-ivory/60 border-ivory/20",
  Interview: "text-ivory/60 border-ivory/20",
  Academic: "text-ivory/60 border-ivory/20",
  Speech: "text-gold border-gold/40",
};

function MediaCard({
  a,
}: {
  a: (typeof appearances)[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (el)
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="fade-up tilt-card group border border-rule bg-surface/50 p-6 transition-all duration-300 hover:border-gold/20"
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`inline-block rounded-sm border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] ${
            typeColors[a.type] || "text-muted border-rule"
          }`}
        >
          {a.type}
        </span>
        <span className="font-sans text-sm text-muted">{a.year}</span>
      </div>
      <h3 className="font-sans text-base font-semibold text-ivory leading-snug mb-2 normal-case">
        {a.title}
      </h3>
      <p className="font-serif text-sm text-ivory/60 leading-relaxed">
        {a.desc}
      </p>
      {a.link && (
        <a
          href={a.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-sans text-xs font-medium uppercase tracking-[0.15em] text-gold hover:text-ivory transition-colors"
        >
          View &rarr;
        </a>
      )}
    </div>
  );
}

export function Media() {
  return (
    <section id="media" className="py-[140px] max-md:py-24 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-ivory mb-1 leading-[0.95]">
            MEDIA
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-16 gold-line" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
          {appearances.map((a, i) => (
            <MediaCard key={i} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
