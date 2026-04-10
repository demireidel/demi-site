export function Kitchen() {
  return (
    <section id="kitchen" className="relative py-[140px] max-md:py-24 px-6 overflow-hidden">
      {/* Warm amber gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(197,145,50,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-ivory mb-1 leading-[0.95]">
            THE KITCHEN
          </h2>
          <p className="font-serif text-[clamp(1.1rem,2vw,1.4rem)] italic text-gold/80 mb-16">
            Science &amp; Table
          </p>
        </div>

        <div className="mx-auto max-w-[780px]">
          <p className="fade-up font-serif text-[clamp(1.05rem,1.8vw,1.2rem)] text-ivory/85 leading-[1.8]">
            The same instinct that draws Reidel to complex systems in economics
            draws him to the kitchen. He is a serious practitioner of modernist
            cuisine&thinsp;&mdash;&thinsp;the science-driven approach to cooking
            developed by Nathan Myhrvold, the former Microsoft CTO and physicist
            whom Reidel met at the Sun Valley Conference. For Reidel, a kitchen
            is a laboratory: temperature gradients, Maillard reactions, emulsion
            physics, and fermentation kinetics are not metaphors but working
            tools. The result is food that sits at the intersection of precision
            and pleasure&thinsp;&mdash;&thinsp;the same intersection where his
            best work lives.
          </p>
        </div>

        {/* Moody food-aesthetic placeholders */}
        <div className="fade-up mt-16 grid grid-cols-3 max-md:grid-cols-1 gap-4">
          {[
            { aspect: "aspect-[4/5]", label: "Precision" },
            { aspect: "aspect-square", label: "Process" },
            { aspect: "aspect-[4/5]", label: "Pleasure" },
          ].map((item, i) => (
            <div
              key={i}
              className={`${item.aspect} relative overflow-hidden group`}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, rgba(30,25,18,1) 0%, rgba(50,40,25,0.95) 50%, rgba(20,18,14,1) 100%)`,
                }}
              />
              <div className="absolute inset-[1px] border border-gold/10" />
              {/* Atmospheric glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(197,145,50,0.08) 0%, transparent 70%)",
                }}
              />
              <div className="absolute bottom-6 left-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/40">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
