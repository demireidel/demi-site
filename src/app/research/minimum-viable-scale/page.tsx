import type { Metadata } from "next";
import Link from "next/link";
import { MvsExplorer } from "@/components/mvs-explorer";
import { ThresholdField } from "@/components/threshold-field";

export const metadata: Metadata = {
  title: "Minimum Viable Scale",
  description:
    "An interactive introduction to Minimum Viable Scale: Threshold Wedges and Global Selection, a July 2026 working paper by Javier Milei and Demian Reidel.",
  alternates: { canonical: "/research/minimum-viable-scale" },
};

const hierarchy = [
  {
    index: "01",
    symbol: "Lᵃᵛᵍₘᵢₙ",
    title: "Physical-capacity floor",
    text: "Can any positive stock replace depreciation?",
  },
  {
    index: "02",
    symbol: "Lᵐᵍₘᵢₙ",
    title: "Euler-capacity floor",
    text: "Can capital attain the return required by impatience and depreciation?",
  },
  {
    index: "03",
    symbol: "κ",
    title: "Maintainability boundary",
    text: "Can this particular stock preserve itself for one more period?",
  },
  {
    index: "04",
    symbol: "Kₛ",
    title: "Global selection threshold",
    text: "Which complete lifetime path is optimal: liquidation or high-scale escape?",
    global: true,
  },
  {
    index: "05",
    symbol: "K*",
    title: "Selected stationary scale",
    text: "Where does the high-scale path ultimately converge?",
  },
] as const;

const amplification = [
  {
    index: "01",
    title: "Scale amplification",
    text: "Small productivity or return wedges can produce much larger movements in the capacity floors when returns are close to constant.",
  },
  {
    index: "02",
    title: "Boundary amplification",
    text: "The sustainable interval becomes extremely sensitive as the economy approaches the physical floor.",
  },
  {
    index: "03",
    title: "Welfare amplification",
    text: "A narrow difference in state space can conceal a large permanent-consumption-equivalent loss.",
  },
  {
    index: "04",
    title: "Regime amplification",
    text: "A modest difference around Kₛ selects convergence toward zero or toward a stationary scale hundreds of times larger than κ.",
  },
] as const;

const certificate = [
  "Competing path",
  "First separating event",
  "Residual / downward / high region",
  "Class-specific Bellman bound",
  "Explicit escape policy",
  "Exact rational certificate",
] as const;

export default function MinimumViableScalePage() {
  return (
    <>
      <ThresholdField />
      <div className="ambient-wash" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />

      <main id="main-content" className="paper-page">
        <section className="paper-hero" data-section="Minimum viable scale">
          <div className="paper-hero-inner">
            <div className="paper-eyebrow">
              <span>Research / July 2026</span>
              <span>Nonconcave growth / exact computation</span>
            </div>

            <h1 className="paper-title">
              MINIMUM <em>VIABLE</em> SCALE
            </h1>

            <p className="paper-deck">
              A system may be physically viable and locally productive while the complete welfare comparison still selects liquidation.
            </p>

            <div className="paper-meta">
              <span>Javier Milei · Demian Reidel</span>
              <span>Working paper</span>
              <span>Threshold Wedges and Global Selection</span>
            </div>
          </div>
        </section>

        <div className="paper-section-wrap">
          <section className="paper-section" data-section="Threshold hierarchy">
            <div className="section-kicker" data-reveal>
              <span>01</span>
              <p>A hierarchy, not one number</p>
            </div>

            <h2 data-reveal>FIVE OBJECTS. ONE GLOBAL COMPARISON.</h2>

            <div className="paper-section-lede">
              <p data-reveal>
                Physical survival, adequate returns, maintainability, optimal selection, and the final destination are distinct economic objects.
              </p>
              <p data-reveal>
                The first three answer local or one-period questions. Only Kₛ compares complete paths and determines which long-run regime is selected.
              </p>
            </div>

            <div className="threshold-hierarchy" data-reveal>
              {hierarchy.map((item) => (
                <article
                  className={`hierarchy-card ${item.global ? "is-global" : ""}`}
                  key={item.index}
                >
                  <span>{item.index}</span>
                  <strong>{item.symbol}</strong>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="paper-section" data-section="Viability reversal">
            <div className="section-kicker" data-reveal>
              <span>02</span>
              <p>The central reversal</p>
            </div>

            <h2 data-reveal>VIABLE DOES NOT MEAN WORTH PRESERVING.</h2>

            <div className="reversal-panel">
              <div className="reversal-equation" data-reveal>
                <div>
                  <strong>YES<br />YES<br />NO</strong>
                  <span>Survive / return / select</span>
                </div>
              </div>

              <div className="reversal-copy" data-reveal>
                <blockquote>
                  The marginal-return calculation can be correct and the optimal decision can still be extinction.
                </blockquote>
                <p>
                  A path that preserves viability must keep the base stock κ intact and finance consumption only from the excess above it. Liquidation releases part of that principal. The global comparison includes that transition cost; the local tests do not.
                </p>
              </div>
            </div>
          </section>

          <section className="paper-section" data-section="Interactive threshold">
            <div className="section-kicker" data-reveal>
              <span>03</span>
              <p>Move the initial condition</p>
            </div>

            <h2 data-reveal>ONE STATE. TWO RADICALLY DIFFERENT FUTURES.</h2>

            <div className="paper-section-lede">
              <p data-reveal>
                At the benchmark productivity A = 10.04, the maintainability boundary is approximately 0.018157 and the certified upper bound for the unique selection threshold is 0.04.
              </p>
              <p data-reveal>
                The positive stationary scale is approximately 5.077—about 280 times the maintainability boundary. Horizontal distance can be small while the destination changes completely.
              </p>
            </div>

            <div style={{ marginTop: "clamp(4rem, 8vw, 8rem)" }} data-reveal>
              <MvsExplorer />
            </div>
          </section>

          <section className="paper-section" data-section="Amplification">
            <div className="section-kicker" data-reveal>
              <span>04</span>
              <p>Why thresholds matter</p>
            </div>

            <h2 data-reveal>SMALL WEDGES CAN SELECT LARGE OUTCOMES.</h2>

            <div className="amplification-grid" data-reveal>
              {amplification.map((item) => (
                <article className="amplification-card" key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="paper-section" data-section="Proof architecture">
            <div className="section-kicker" data-reveal>
              <span>05</span>
              <p>First-passage Bellman certificates</p>
            </div>

            <h2 data-reveal>COMPARE PATHS WHERE THEY FIRST SEPARATE.</h2>

            <div className="paper-section-lede">
              <p data-reveal>
                The proof targets the sign question directly rather than uniformly approximating the unrestricted value function everywhere.
              </p>
              <p data-reveal>
                Residual and post-exit supersolutions bound competing path classes; explicit high-admissible policies price escape; exact finite proof objects certify the inequalities over a continuum.
              </p>
            </div>

            <div className="certificate-flow" data-reveal>
              {certificate.map((step, index) => (
                <div className="certificate-step" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="paper-section" data-section="Scope">
            <div className="section-kicker" data-reveal>
              <span>06</span>
              <p>What the paper does and does not establish</p>
            </div>

            <h2 data-reveal>PRECISION IN THE CLAIMS IS PART OF THE RESULT.</h2>

            <div className="paper-note-grid" data-reveal>
              <article className="paper-note">
                <span>Model</span>
                <h3>A planner-selection theorem</h3>
                <p>
                  The thresholds belong to the stated technology and preferences. They are not empirical estimates for a particular country or industry.
                </p>
              </article>
              <article className="paper-note">
                <span>Policy</span>
                <h3>No automatic intervention result</h3>
                <p>
                  Ownership, finance, externalities, market structure, and distribution would require an explicit decentralized institution before a policy conclusion follows.
                </p>
              </article>
              <article className="paper-note">
                <span>Verification</span>
                <h3>Finite, independently checkable objects</h3>
                <p>
                  The reported computational claims rest on exact endpoint ledgers, verifiers, logs, an integrity manifest, and a theorem-to-artifact map.
                </p>
              </article>
            </div>
          </section>
        </div>

        <footer className="paper-footer">
          <div className="paper-actions">
            <Link className="button-link" href="/">
              <span>Return to the main site</span>
              <span aria-hidden="true">←</span>
            </Link>
            <a
              className="button-link is-quiet"
              href="mailto:demian@demianreidel.com?subject=Minimum%20Viable%20Scale"
            >
              <span>Request paper materials</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="paper-citation">
            <span>Suggested citation</span>
            <p>
              Milei, Javier, and Demian Reidel. “Minimum Viable Scale: Threshold Wedges and Global Selection.” Working paper, July 2026.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
