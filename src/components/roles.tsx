type Role = {
  period: string;
  title: string;
  org: string;
  desc: string;
};

const current: Role[] = [
  {
    period: "2024\u2013Present",
    title: "Advisor to the President",
    org: "Argentine Republic",
    desc: "Strategic counsel to President Javier Milei on economic policy, technology, and international relations.",
  },
  {
    period: "2025\u2013Present",
    title: "Adjunct Professor",
    org: "Columbia Business School",
    desc: "Teaching asset valuation in the Finance Masters Program.",
  },
  {
    period: "2019\u2013Present",
    title: "Research Affiliate",
    org: "Harvard Kennedy School",
    desc: "Mossavar-Rahmani Center for Business and Government.",
  },
];

const recent: Role[] = [
  {
    period: "2025\u20132026",
    title: "President",
    org: "Nucleoel\u00e9ctrica Argentina S.A.",
    desc: "Led Argentina\u2019s state nuclear operator. Architect of the Argentine Nuclear Plan.",
  },
  {
    period: "2024\u20132025",
    title: "Founding Chairman",
    org: "Presidential Council of Advisors",
    desc: "Established and led the advisory body to the Argentine presidency.",
  },
];

const previous: Role[] = [
  {
    period: "2006\u20132015",
    title: "Co-Founder & Principal Portfolio Manager",
    org: "QFR Capital Management, New York",
    desc: "Global macro hedge fund. $3B+ AUM. FX, fixed income, and credit.",
  },
  {
    period: "2015\u20132018",
    title: "Deputy Governor & Board Member",
    org: "Central Bank of Argentina",
    desc: "Designed Argentina\u2019s first inflation-targeting regime. G20 Finance Track representative.",
  },
  {
    period: "2018",
    title: "G20 Finance Track Representative",
    org: "Argentine Republic",
    desc: "Designed the priorities of the G20 Finance Track during Argentina\u2019s presidency.",
  },
  {
    period: "2000\u20132006",
    title: "Senior Member, Emerging Markets Research",
    org: "Goldman Sachs, New York",
    desc: "Sovereign credit and macroeconomic analysis across emerging markets.",
  },
  {
    period: "1997\u20132000",
    title: "Emerging Markets Research",
    org: "JP Morgan",
    desc: "New York, London, and Buenos Aires offices.",
  },
];

function RoleGroup({ label, roles }: { label: string; roles: Role[] }) {
  return (
    <div className="fade-up">
      <h3 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-6">
        {label}
      </h3>
      <div className="space-y-0 stagger-children">
        {roles.map((r, i) => (
          <div
            key={i}
            className="fade-up group grid grid-cols-[100px_1fr] max-md:grid-cols-1 gap-x-8 gap-y-1 border-t border-rule py-5 transition-all duration-300 hover:bg-surface/50 hover:pl-2"
          >
            <span className="font-sans text-sm text-muted whitespace-nowrap">
              {r.period}
            </span>
            <div>
              <p className="font-sans text-base font-medium text-ivory leading-snug">
                {r.title}
              </p>
              <p className="font-sans text-sm text-gold/80 mt-0.5">{r.org}</p>
              <p className="font-serif text-sm text-muted mt-1 leading-relaxed">
                {r.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Roles() {
  return (
    <section id="roles" className="py-[140px] max-md:py-24 px-6 bg-surface">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-ivory mb-1 leading-[0.95]">
            ROLES &amp; AFFILIATIONS
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-16 gold-line" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16">
          <div className="space-y-12">
            <RoleGroup label="Current" roles={current} />
            <RoleGroup label="Recent" roles={recent} />
          </div>
          <div>
            <RoleGroup label="Previous" roles={previous} />
          </div>
        </div>
      </div>
    </section>
  );
}
