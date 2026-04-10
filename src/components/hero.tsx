"use client";

import { ParticleField } from "./particle-field";

function AnimatedName() {
  const name = "DEMIAN REIDEL";
  const letters = name.split("");
  let charIndex = 0;

  return (
    <h1 className="font-display text-[clamp(4rem,15vw,14rem)] leading-[0.9] tracking-tight text-ivory overflow-hidden">
      {letters.map((letter, i) => {
        if (letter === " ") {
          return (
            <span key={i} className="inline-block w-[0.2em]">
              &nbsp;
            </span>
          );
        }
        const delay = charIndex * 0.04 + 0.3;
        charIndex++;
        return (
          <span
            key={i}
            className="hero-letter"
            style={{ animationDelay: `${delay}s` }}
          >
            {letter}
          </span>
        );
      })}
    </h1>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Particle field — the signature visual */}
      <ParticleField className="z-0" />

      {/* Subtle gold radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(197,165,90,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,165,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center">
        <AnimatedName />
        <p className="page-load-fade mt-8 font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] italic text-gold tracking-wide"
           style={{ animationDelay: "0.9s" }}>
          Physicist. Economist. Builder.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 page-load-fade" style={{ animationDelay: "1.4s" }}>
        <div className="scroll-pulse h-12 w-[1px] bg-gradient-to-b from-gold/60 to-transparent" />
      </div>
    </section>
  );
}
