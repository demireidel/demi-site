export function Art() {
  return (
    <section id="art" className="py-[120px] max-md:py-20 px-6 bg-surface">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-5xl max-md:text-4xl text-ivory mb-2">
            GENERATIVE WORK
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-12" />
        </div>

        <p className="fade-up mx-auto max-w-[640px] font-serif text-lg text-ivory/70 leading-relaxed mb-14 text-center">
          Beyond economics and policy, Demi creates generative and digital
          art&thinsp;&mdash;&thinsp;exploring the same questions about emergent
          complexity and pattern that drive his academic work, through a
          different medium.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="fade-up aspect-square bg-obsidian border border-rule flex items-center justify-center group hover:border-gold/20 transition-colors"
            >
              {/* PLACEHOLDER: replace with actual art */}
              <div className="text-center px-4">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-rule flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-muted"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <span className="font-sans text-xs text-muted/60 uppercase tracking-widest">
                  Art {n}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
