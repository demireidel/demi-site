"use client";

import { ArtCanvas, artPieces } from "./generative-art";

export function Art() {
  return (
    <section id="art" className="py-[140px] max-md:py-24 px-6 bg-surface">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-ivory mb-1 leading-[0.95]">
            GENERATIVE WORK
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-12 gold-line" />
        </div>

        <p className="fade-up mx-auto max-w-[640px] font-serif text-lg text-ivory/70 leading-relaxed mb-14 text-center">
          Beyond economics and policy, Demi creates generative and digital
          art&thinsp;&mdash;&thinsp;exploring the same questions about emergent
          complexity and pattern that drive his academic work, through a
          different medium.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 stagger-children">
          {artPieces.map((piece, i) => (
            <ArtCanvas key={i} Renderer={piece.Renderer} label={piece.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
