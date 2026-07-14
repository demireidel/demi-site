import { MvsExplorer } from "@/components/mvs-explorer";
import { ThresholdField } from "@/components/threshold-field";

const arc = [
  {
    number: "01",
    label: "Science",
    title: "Understand the system.",
    text: "Physics supplied the first language: dynamics, uncertainty, emergence, and the discipline to distinguish signal from noise.",
    proof: [
      "Instituto Balseiro — Physics",
      "University of Chicago — Financial Mathematics",
      "Harvard University — PhD, Economics",
    ],
  },
  {
    number: "02",
    label: "Capital",
    title: "Put judgment at risk.",
    text: "Markets turned models into decisions. Price, timing, incentives, and uncertainty became operating constraints rather than abstractions.",
    proof: [
      "JPMorgan & Goldman Sachs — Emerging Markets",
      "QFR Capital Management — Co-founder",
      "More than $3B in assets under management during tenure",
    ],
  },
  {
    number: "03",
    label: "State",
    title: "Move from analysis to responsibility.",
    text: "Public institutions introduced a different form of scale: monetary systems, regulation, international coordination, and sovereign execution.",
    proof: [
      "Central Bank of Argentina — Board & Monetary Policy Committee",
      "G20 & Financial Stability Board",
      "Presidential advisory work — Argentina",
    ],
  },
  {
    number: "04",
    label: "Infrastructure",
    title: "Turn strategy into physical capacity.",
    text: "Energy and industrial systems make the constraint tangible. Steel, power, capital, regulation, safety, and time must converge in one executable system.",
    proof: [
      "Argentine Nuclear Plan",
      "Nucleoeléctrica Argentina — President, 2025–2026",
      "Siderian — Founder",
    ],
  },
] as const;

const record = [
  {
    years: "1997—2006",
    title: "Emerging markets",
    institution: "JPMorgan / Goldman Sachs",
    detail: "Sovereign risk, currencies, rates, credit, and macroeconomic research across global markets.",
    source: "https://jrc.princeton.edu/events/demian-reidel",
  },
  {
    years: "2006—2015",
    title: "Co-founder & portfolio manager",
    institution: "QFR Capital Management",
    detail: "Built a global macro investment firm that exceeded $3 billion in assets under management during his tenure.",
    source: "https://jrc.princeton.edu/events/demian-reidel",
  },
  {
    years: "2015—2018",
    title: "Second Vice President & board member",
    institution: "Central Bank of Argentina",
    detail: "Monetary policy, prudential oversight, and representation at the G20 and Financial Stability Board.",
    source: "https://jrc.princeton.edu/events/demian-reidel",
  },
  {
    years: "2024—2025",
    title: "Head of presidential advisers",
    institution: "Argentine Republic",
    detail: "Strategic work across economic policy, technology, international relationships, and energy.",
    source: "https://www.boletinoficial.gob.ar/detalleAviso/primera/309982/20240703",
  },
  {
    years: "2025—2026",
    title: "President",
    institution: "Nucleoeléctrica Argentina",
    detail: "Led the national nuclear operator during the launch and early execution of the Argentine Nuclear Plan.",
    source: "https://www.iaea.org/sites/default/files/25/05/day_3_transition_to_a_sustainable_future_with_nuclear_mr_demian_reidel.pdf",
  },
  {
    years: "2026—",
    title: "Founder",
    institution: "Siderian",
    detail: "Building an industrial coordination system for repeatable advanced nuclear deployment at scale.",
    source: "https://siderian.energy/founder",
  },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <ThresholdField />
      <div className="ambient-wash" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />

      <main id="main-content">
        <section className="hero" data-section="Initial conditions">
          <div className="hero-topline">
            <p>Demian Reidel</p>
            <p>Systems at scale</p>
            <p>Science / Capital / Infrastructure</p>
          </div>

          <div className="hero-name" aria-label="Demian Reidel">
            <span>DEMIAN</span>
            <span>REIDEL</span>
          </div>

          <div className="hero-bottom">
            <p className="hero-thesis">
              I work on the systems that determine whether ambitious ideas reach viable scale.
            </p>
            <div className="hero-coordinates" aria-label="Fields of work">
              <span>SCIENCE</span>
              <i />
              <span>CAPITAL</span>
              <i />
              <span>STATE</span>
              <i />
              <span>INFRASTRUCTURE</span>
            </div>
          </div>

          <a className="scroll-cue" href="#threshold">
            <span>Increase scale</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section
          id="threshold"
          className="threshold-intro section-shell"
          data-section="The threshold"
        >
          <div className="section-kicker" data-reveal>
            <span>00</span>
            <p>The controlling idea</p>
          </div>

          <div className="threshold-lockup" data-reveal>
            <p>VIABLE</p>
            <span>≠</span>
            <p>SELECTED</p>
          </div>

          <div className="threshold-copy-grid">
            <p className="threshold-lede" data-reveal>
              A system can be physically possible, locally productive, and still lose the complete path comparison.
            </p>
            <p data-reveal>
              Scale is a regime, not a vanity metric. Below a critical condition, a system fragments or liquidates. Above it, reinforcement changes the destination.
            </p>
          </div>

          <div className="three-tests" data-reveal>
            <div>
              <span>01 / Physical</span>
              <strong>Can it survive?</strong>
              <em>Yes</em>
            </div>
            <div>
              <span>02 / Marginal</span>
              <strong>Is the local return enough?</strong>
              <em>Yes</em>
            </div>
            <div className="is-negative">
              <span>03 / Global</span>
              <strong>Is preservation optimal?</strong>
              <em>No</em>
            </div>
          </div>
        </section>

        <section
          id="current"
          className="current-work section-shell"
          data-section="Current work"
        >
          <div className="section-kicker" data-reveal>
            <span>01</span>
            <p>Current work</p>
          </div>

          <div className="current-grid">
            <div className="current-copy">
              <p className="micro-label" data-reveal>Founder / Siderian</p>
              <h2 data-reveal>
                Industrialize the deployment of advanced nuclear power.
              </h2>
              <p className="body-large" data-reveal>
                The reactor is only one part of the system. Fleet deployment also requires qualified demand, verified industrial capacity, capital formation, sovereign coordination, and an executable sequence.
              </p>
              <a
                className="text-link"
                href="https://siderian.energy"
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                <span>Visit Siderian</span>
                <Arrow />
              </a>
            </div>

            <div className="coordination-map" aria-label="Siderian coordination model" data-reveal>
              <div className="coordination-core">
                <span>S</span>
                <small>Deployment layer</small>
              </div>
              <div className="coordination-node node-demand">
                <span>01</span>
                <strong>Demand</strong>
                <small>Qualified / contracted</small>
              </div>
              <div className="coordination-node node-capacity">
                <span>02</span>
                <strong>Capacity</strong>
                <small>Verified / sequenced</small>
              </div>
              <div className="coordination-node node-capital">
                <span>03</span>
                <strong>Capital</strong>
                <small>Structured / committed</small>
              </div>
              <div className="coordination-node node-sovereign">
                <span>04</span>
                <strong>Sovereign</strong>
                <small>Licensed / enabled</small>
              </div>
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <circle cx="300" cy="300" r="205" />
                <circle cx="300" cy="300" r="119" />
                <line x1="300" y1="90" x2="300" y2="510" />
                <line x1="90" y1="300" x2="510" y2="300" />
                <path d="M155 155 C245 245 355 355 445 445" />
                <path d="M445 155 C355 245 245 355 155 445" />
              </svg>
            </div>
          </div>
        </section>

        <section id="arc" className="arc section-shell" data-section="The arc">
          <div className="section-kicker" data-reveal>
            <span>02</span>
            <p>One question / four operating systems</p>
          </div>

          <div className="arc-heading">
            <h2 data-reveal>SCIENCE → CAPITAL → STATE → INFRASTRUCTURE</h2>
            <p data-reveal>
              The career is not a sequence of unrelated institutions. Each chapter enlarges the same question: how do complex systems cross from possibility into durable scale?
            </p>
          </div>

          <div className="arc-list">
            {arc.map((item) => (
              <article className="arc-row" key={item.label} data-reveal>
                <div className="arc-index">
                  <span>{item.number}</span>
                  <p>{item.label}</p>
                </div>
                <div className="arc-main">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <ul>
                  {item.proof.map((proof) => (
                    <li key={proof}>{proof}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="research section-shell" data-section="Research">
          <div className="section-kicker" data-reveal>
            <span>03</span>
            <p>Research / July 2026</p>
          </div>

          <div className="research-heading">
            <div>
              <p className="micro-label" data-reveal>Working paper / exact computation</p>
              <h2 data-reveal>Minimum Viable Scale</h2>
            </div>
            <div data-reveal>
              <p className="research-subtitle">Threshold Wedges and Global Selection</p>
              <p>Javier Milei · Demian Reidel</p>
            </div>
          </div>

          <div className="research-claim" data-reveal>
            <blockquote>
              A modest difference in initial scale can become a radical difference in the long-run regime.
            </blockquote>
            <p>
              The paper separates physical viability, return viability, maintainability, global selection, and the stationary destination. Only the global threshold ranks complete paths.
            </p>
          </div>

          <div data-reveal>
            <MvsExplorer compact />
          </div>

          <div className="research-actions" data-reveal>
            <a className="button-link" href="/research/minimum-viable-scale">
              <span>Explore the paper</span>
              <Arrow />
            </a>
            <a className="button-link is-quiet" href="/papers/minimum-viable-scale.pdf">
              <span>Read PDF</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <section id="record" className="record section-shell" data-section="Selected record">
          <div className="section-kicker" data-reveal>
            <span>04</span>
            <p>Selected record</p>
          </div>

          <div className="record-heading">
            <h2 data-reveal>Responsibility at increasing scale.</h2>
            <p data-reveal>
              Institutions are evidence. The relevant thread is the level at which decisions had to work: a portfolio, a monetary system, a state, a nuclear fleet, an industrial platform.
            </p>
          </div>

          <ol className="record-list">
            {record.map((item, index) => (
              <li key={`${item.years}-${item.institution}`} data-reveal>
                <span className="record-count">{String(index + 1).padStart(2, "0")}</span>
                <time>{item.years}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                </div>
                <div className="record-detail">
                  <p>{item.detail}</p>
                  <a
                    className="record-source"
                    href={item.source}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Source for ${item.title} at ${item.institution}`}
                  >
                    Source ↗
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="human section-shell" data-section="Other systems">
          <div className="section-kicker" data-reveal>
            <span>05</span>
            <p>Other systems</p>
          </div>

          <div className="human-grid">
            <div className="human-copy">
              <h2 data-reveal>Precision can still be playful.</h2>
              <p data-reveal>
                Generative work and cooking are parallel practices in emergence: simple rules, exact constraints, iteration, heat, time, and outcomes that cannot be reduced to any single ingredient.
              </p>
            </div>

            <div className="material-study" aria-hidden="true" data-reveal>
              {Array.from({ length: 16 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact section-shell" data-section="Contact">
          <div className="section-kicker" data-reveal>
            <span>06</span>
            <p>Contact</p>
          </div>

          <h2 data-reveal>
            THE NEXT SYSTEM STARTS WITH A CONVERSATION.
          </h2>

          <div className="contact-grid" data-reveal>
            <a href="mailto:demian@demianreidel.com">
              <span>Email</span>
              <strong>demian@demianreidel.com</strong>
              <Arrow />
            </a>
            <a href="https://x.com/dreidel1" target="_blank" rel="noreferrer">
              <span>X</span>
              <strong>@dreidel1</strong>
              <Arrow />
            </a>
            <a href="https://www.linkedin.com/in/demianreidel" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>demianreidel</strong>
              <Arrow />
            </a>
          </div>

          <footer className="site-footer">
            <p>© 2026 Demian Reidel</p>
            <p>Built around the threshold.</p>
            <a href="#main-content">Return to initial conditions ↑</a>
          </footer>
        </section>
      </main>
    </>
  );
}
