export function PublicService() {
  return (
    <section id="public-service" className="py-[140px] max-md:py-24 px-6 bg-surface">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-ivory mb-1 leading-[0.95]">
            PUBLIC SERVICE
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-16 gold-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10 stagger-children">
          {/* Central Banking */}
          <div className="fade-up">
            <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-6">
              Central Banking &amp; Monetary Policy
            </h3>
            <div className="h-[1px] w-full bg-rule mb-6" />

            {/* Photo placeholder — dark atmospheric treatment */}
            <div className="relative aspect-[16/10] mb-6 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(30,25,18,0.95) 50%, rgba(15,15,12,1) 100%)",
                }}
              />
              <div className="absolute inset-[1px] border border-gold/8" />
              <div className="absolute bottom-3 left-3">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold/30">
                  G20 Buenos Aires 2018
                </span>
              </div>
            </div>

            <div className="space-y-4 font-serif text-base text-ivory/80 leading-relaxed">
              <p>
                Deputy Governor of Argentina&rsquo;s Central Bank during the
                Macri administration. Designed and implemented the country&rsquo;s
                first inflation-targeting regime with a flexible exchange rate.
              </p>
              <p>
                Oversaw prudential regulation of financial institutions.
                Represented the Central Bank at the G20 and designed the G20
                Finance Track priorities during Argentina&rsquo;s 2018
                presidency.
              </p>
            </div>
          </div>

          {/* Presidential Advisory */}
          <div className="fade-up">
            <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-6">
              Presidential Advisory
            </h3>
            <div className="h-[1px] w-full bg-rule mb-6" />

            <div className="relative aspect-[16/10] mb-6 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(20,18,14,1) 0%, rgba(35,28,18,0.9) 50%, rgba(15,13,10,1) 100%)",
                }}
              />
              <div className="absolute inset-[1px] border border-gold/8" />
              <div className="absolute bottom-3 left-3">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold/30">
                  Casa Rosada
                </span>
              </div>
            </div>

            <div className="space-y-4 font-serif text-base text-ivory/80 leading-relaxed">
              <p>
                Founding Chairman of the Presidential Council of Advisors under
                President Milei. Responsible for long-term economic policy
                strategy, international relationship-building&thinsp;&mdash;&thinsp;including
                organizing presidential meetings with Silicon Valley
                leaders&thinsp;&mdash;&thinsp;and policy proposals at the
                intersection of technology, energy, and economic reform.
              </p>
            </div>
          </div>

          {/* Nuclear */}
          <div className="fade-up">
            <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-6">
              Nuclear Energy &amp; AI Infrastructure
            </h3>
            <div className="h-[1px] w-full bg-rule mb-6" />

            <div className="relative aspect-[16/10] mb-6 overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(15,18,20,1) 0%, rgba(20,25,30,0.9) 40%, rgba(25,22,15,0.95) 100%)",
                }}
              />
              <div className="absolute inset-[1px] border border-gold/8" />
              {/* Subtle Cherenkov blue glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(circle at 50% 70%, rgba(80,140,200,0.15) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-3 left-3">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold/30">
                  Atucha Nuclear Complex
                </span>
              </div>
            </div>

            <div className="space-y-4 font-serif text-base text-ivory/80 leading-relaxed">
              <p>
                President of Nucleoel&eacute;ctrica Argentina, the state nuclear
                operator. Architect of the Argentine Nuclear Plan, announced
                jointly with President Milei and IAEA Director General Rafael
                Grossi at Casa Rosada.
              </p>
              <p>
                Advocated for integrating nuclear energy with AI data center
                development, positioning Argentina&rsquo;s geographic
                advantages&thinsp;&mdash;&thinsp;extensive land, water access,
                cold Patagonian climate, no conflict zones&thinsp;&mdash;&thinsp;for
                large-scale compute infrastructure. Championed the ACR-300
                reactor, a 300MW small modular reactor designed by Argentine
                engineers at INVAP, as a globally exportable technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
