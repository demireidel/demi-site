export function PublicService() {
  return (
    <section id="public-service" className="py-[120px] max-md:py-20 px-6 bg-surface">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-5xl max-md:text-4xl text-ivory mb-2">
            PUBLIC SERVICE
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-16" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
          {/* Central Banking */}
          <div className="fade-up">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-6">
              Central Banking & Monetary Policy
            </h3>
            <div className="h-[1px] w-full bg-rule mb-6" />
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
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-6">
              Presidential Advisory
            </h3>
            <div className="h-[1px] w-full bg-rule mb-6" />
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
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-6">
              Nuclear Energy & AI Infrastructure
            </h3>
            <div className="h-[1px] w-full bg-rule mb-6" />
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
