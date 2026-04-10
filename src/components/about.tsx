export function About() {
  return (
    <section id="about" className="py-[120px] max-md:py-20 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-5xl max-md:text-4xl text-ivory mb-2">
            THE ARC
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-12" />
        </div>

        <div className="mx-auto max-w-[780px] space-y-6 font-serif text-lg leading-[1.7] text-ivory/90">
          <p className="fade-up">
            Demian Reidel trained as a physicist at Argentina&rsquo;s Instituto
            Balseiro before crossing into financial mathematics at the University
            of Chicago and economics at Harvard, where he earned his PhD under
            Ken Rogoff&thinsp;&mdash;&thinsp;who has publicly described Demi as
            his best student. That migration&thinsp;&mdash;&thinsp;from nuclear
            physics to mathematical finance to macroeconomic
            theory&thinsp;&mdash;&thinsp;is not a career change. It is a single
            intellectual project: understanding how complex systems behave at
            scale.
          </p>

          <p className="fade-up">
            That project has played out across three domains. In global finance,
            he co-founded QFR Capital Management, a New York-based macro fund
            that grew beyond three billion dollars in assets under management,
            trading currencies, rates, and credit across emerging and developed
            markets. In public service, he served as Deputy Governor of
            Argentina&rsquo;s Central Bank, where he helped design the
            country&rsquo;s first inflation-targeting regime and represented the
            institution at the G20, and later as founding Chairman of President
            Milei&rsquo;s Council of Advisors and President of Nucleoel&eacute;ctrica
            Argentina, the state nuclear operator. In academia, he holds
            affiliations at Harvard Kennedy School and Columbia Business School
            and co-authors research on increasing returns, scale viability, and
            threshold dynamics.
          </p>

          <p className="fade-up">
            What connects these roles is a consistent question: what makes
            large-scale productive systems viable, and what destroys them? His
            recent work with President Milei on the economics of increasing
            returns&thinsp;&mdash;&thinsp;including a practical framework for
            evaluating whether antitrust remedies risk destroying the productive
            scale they claim to discipline&thinsp;&mdash;&thinsp;brings that
            question into direct contact with the most consequential regulatory
            debates of this decade.
          </p>
        </div>

        <div className="fade-up mt-12 text-center">
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-muted">
            Languages
          </p>
          <p className="mt-2 font-serif text-lg text-ivory/80">
            Spanish &middot; English &middot; Chinese (Mandarin) &middot; Italian &middot; French
          </p>
        </div>
      </div>
    </section>
  );
}
