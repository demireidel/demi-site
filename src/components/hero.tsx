export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Subtle gold radial gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(197,165,90,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Fine grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,165,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,165,90,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center">
        <h1 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.95] tracking-tight text-ivory">
          DEMIAN
          <br />
          REIDEL
        </h1>
        <p className="mt-6 font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] italic text-gold tracking-wide">
          Physicist. Economist. Builder.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="h-10 w-[1px] bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
