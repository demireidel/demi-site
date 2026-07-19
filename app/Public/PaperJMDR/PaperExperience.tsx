"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./paper.module.css";

const PDF_PATH = "/PaperJMDR/Minimum_Viable_Scale_Main.pdf";

const glossary = [
  ["Productive stock", "The capital base available for future production. The paper writes it as K."],
  ["Feasible", "A path the economy can physically carry out."],
  ["Optimal", "A feasible path that delivers the highest discounted lifetime welfare."],
  ["Extinction", "A path along which productive capital converges to zero. It need not mean an immediate shutdown."],
];

const objects = [
  {
    symbol: "κ",
    title: "Physical replacement boundary",
    question: "Can the productive base replace itself?",
    meaning: "At κ, maximal resources only weakly replace capital. Because positive consumption is required, every admissible path from κ must move below it.",
    not: "Not the welfare frontier.",
  },
  {
    symbol: "Kₛ",
    title: "Minimum viable scale",
    question: "When does preserving productive scale become welfare-optimal?",
    meaning: "The unique initial stock at which an extinction optimum and a high-admissible optimum are tied.",
    not: "Not defined by the proof target H.",
  },
  {
    symbol: "H",
    title: "Certified high set",
    question: "What target is used to prove high-regime selection?",
    meaning: "A closed interval [K_hi, K̄] that a high-admissible path enters in finite time and never leaves.",
    not: "A proof target, not an economic threshold.",
  },
  {
    symbol: "K*",
    title: "Stationary destination",
    question: "Where might a selected high path eventually converge?",
    meaning: "A positive long-run state available only under an additional destination interface or in specific realizations.",
    not: "Not implied by selection alone.",
  },
];

const regimes = [
  {
    id: "physical",
    interval: "0 < K₀ ≤ κ",
    name: "Physical extinction",
    plain: "The initial productive base is at or below the replacement boundary.",
    feasibility: "With positive consumption, the productive stock cannot remain at κ or below it.",
    optimality: "Every feasible path—not merely every optimal path—converges to zero.",
    distinction: "Extinction is a technological fact.",
  },
  {
    id: "reversal",
    interval: "κ < K₀ < Kₛ",
    name: "Viable, optimally extinct",
    plain: "The productive base can be maintained, but it is still below the welfare frontier.",
    feasibility: "A preserving path with positive consumption is physically feasible.",
    optimality: "Every optimal plan nevertheless crosses below κ and becomes extinct.",
    distinction: "Possible is not yet worth choosing.",
  },
  {
    id: "coexistence",
    interval: "K₀ = Kₛ",
    name: "Coexistence",
    plain: "This single state is the minimum viable scale.",
    feasibility: "Both an extinction path and a path selecting the certified high regime are feasible.",
    optimality: "An optimal path of each kind exists, and their first moves can branch to opposite sides of Kₛ.",
    distinction: "The two lifetime programs deliver the same welfare.",
  },
  {
    id: "selection",
    interval: "Kₛ < K₀ ≤ K̄",
    name: "All-optimum high selection",
    plain: "The initial productive base lies above the welfare frontier.",
    feasibility: "The certified target H is reachable through an explicit feasible policy.",
    optimality: "Every optimizer enters H in finite time and remains there.",
    distinction: "Selection does not, by itself, imply convergence to K*.",
  },
];

const mechanismSteps = [
  {
    id: "start",
    step: "01",
    label: "Start just above κ",
    title: "Write the initial stock as κ + x.",
    body: "The economy has its replacement base κ and a small excess x. States immediately to the right of κ can be physically maintained.",
    note: "The question is not whether survival can be engineered. It is whether protecting the base maximizes lifetime welfare.",
  },
  {
    id: "preserve",
    step: "02",
    label: "Protect the base",
    title: "Preservation keeps κ tied up.",
    body: "A path that never crosses below κ can consume only from resources generated above the protected base. The paper bounds this consumable surplus by h(x).",
    note: "As x approaches zero, h(x) approaches zero, so the first-period welfare available to a preserving history collapses.",
  },
  {
    id: "release",
    step: "03",
    label: "Release the base",
    title: "A declining path can use resources preservation keeps locked.",
    body: "A feasible policy that crosses below κ supplies an attained, finite welfare floor. It need not preserve the productive base forever.",
    note: "This is why a one-period marginal product or Euler condition cannot settle the comparison.",
  },
  {
    id: "compare",
    step: "04",
    label: "Compare lifetimes",
    title: "Liquidation strictly dominates on a nonempty interval above κ.",
    body: "When the excess x is small enough, every preserving history lies below the value attained by an explicit declining policy.",
    note: "Theorem 2 supplies the low certificate. It does not, by itself, locate the global frontier Kₛ.",
  },
];

const barrierCases = [
  {
    id: "stay",
    number: "01",
    label: "Remain in M⁻ forever",
    event: "The path starts in the unresolved middle region and never reaches H or exits below Klo.",
    proof: "Iterate the middle-region supersolution until the discounted terminal term disappears.",
    chain: "J(π) ≤ Bᴹ ≤ Wᴹ ≤ Jᴹ ≤ Vᴴ",
    plain: "An explicit high-admissible witness is at least as good as the rival history.",
  },
  {
    id: "below",
    number: "02",
    label: "Exit below Kₗₒ before H",
    event: "The first exit from M⁻ occurs downward, before the path has entered the high set.",
    proof: "An independently certified V̄ bounds every possible continuation below K_hi. At the exact pre-exit state, splice in the attained policy Jᴹ.",
    chain: "u + βV̄ ≤ Wᴹ ≤ Jᴹ",
    plain: "The common history is preserved; only the inferior continuation is replaced.",
  },
  {
    id: "leave",
    number: "03",
    label: "Enter H, then leave",
    event: "After entering H, the path makes its first transition to a successor below K_hi.",
    proof: "Use the independent continuation bound after that exit, then splice in the attained high policy Jᴴ from the same current state.",
    chain: "u + βV̄ ≤ Wᴴ ≤ Jᴴ",
    plain: "A path that abandons the target cannot outperform the certified replacement path.",
  },
  {
    id: "remain",
    number: "04",
    label: "Enter H and remain",
    event: "The path reaches the target set in finite time and never leaves it.",
    proof: "No replacement is required: this history already belongs to the high-admissible class.",
    chain: "J(π) ≤ Vᴴ",
    plain: "Together, the four cases exhaust paths starting in M ∪ H.",
  },
];

const realizations = [
  {
    id: "ordered",
    short: "Ordered CES–log",
    role: "Full classification and destination",
    establishes: "A unique Kₛ, extinction/coexistence/high selection, convergence to a unique K*, exact rational localization, and the patience theorem.",
    lesson: "Greater patience lowers Kₛ toward κ and raises K*. This conclusion belongs to this ordered benchmark, not to every nonconcave economy.",
    evidence: "Analytical order arguments plus certified rational value envelopes.",
  },
  {
    id: "mild",
    short: "Degree-5/4 CES",
    role: "Direct Bellman-barrier realization",
    establishes: "The first-passage certificate proves high selection even though both displayed order-based high modules are unavailable in the paper’s architecture.",
    lesson: "This is a realization of Theorem 3, not a second minimum-viable-scale classification theorem and not a proof that no other method could work.",
    evidence: "390,842 proof rows and 3,839 coverage cells, checked with outward exact bounds and positive margins.",
  },
  {
    id: "annual",
    short: "Annual CES–log",
    role: "Selection without global order",
    establishes: "A unique frontier and complete optimizer classification using local order where the frontier is resolved, even though global increasing differences fails elsewhere.",
    lesson: "Every optimizer above Kₛ reaches and remains in H, but the result does not prove that every selected high path converges to a common destination.",
    evidence: "An analytical locally ordered high proof; retained ledgers serve as independent exact audits.",
  },
];

function FrontierExplorer() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = regimes[activeIndex];

  return (
    <div className={styles.frontierExplorer}>
      <div className={styles.explorerHeader}>
        <div>
          <span>Interactive theorem map</span>
          <h3>Move among the four logical regions</h3>
        </div>
        <p>Equal visual widths do not represent economic distance. This is a theorem selector, not a calibration.</p>
      </div>

      <div className={styles.symbolicOrder} aria-label="Zero, replacement boundary, selection frontier, high-set boundary, and upper state limit">
        <span>0</span><i /><span>κ</span><i /><span>Kₛ</span><i /><span>K<sub>hi</sub></span><i /><span>K̄</span>
      </div>

      <fieldset className={styles.regimeControls} aria-controls="frontier-result">
        <legend className={styles.visuallyHidden}>Select an initial-scale region</legend>
        {regimes.map((regime, index) => (
          <label key={regime.id} className={active.id === regime.id ? styles.activeRegime : undefined}>
            <input
              type="radio"
              name="initial-scale-region"
              value={regime.id}
              checked={active.id === regime.id}
              onChange={() => setActiveIndex(index)}
            />
            <span>0{index + 1}</span>
            <strong>{regime.interval}</strong>
            <small>{regime.name}</small>
          </label>
        ))}
      </fieldset>

      <div id="frontier-result" className={styles.frontierResult} role="status" aria-live="polite" aria-atomic="true">
        <div className={styles.resultIdentity}>
          <span>{active.interval}</span>
          <h3>{active.name}</h3>
          <p>{active.plain}</p>
        </div>
        <dl>
          <div><dt>What is feasible?</dt><dd>{active.feasibility}</dd></div>
          <div><dt>What do optimal plans do?</dt><dd>{active.optimality}</dd></div>
          <div><dt>The essential distinction</dt><dd>{active.distinction}</dd></div>
        </dl>
      </div>
    </div>
  );
}

function MechanismExplainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = mechanismSteps[activeIndex];

  return (
    <div className={styles.mechanismExplorer}>
      <div className={styles.mechanismControls} role="group" aria-label="Protected-resource explanation steps">
        {mechanismSteps.map((step, index) => (
          <button
            type="button"
            key={step.id}
            onClick={() => setActiveIndex(index)}
            aria-pressed={active.id === step.id}
          >
            <span>{step.step}</span>
            <strong>{step.label}</strong>
          </button>
        ))}
      </div>

      <div className={styles.mechanismStage} data-step={active.id} aria-live="polite">
        <div className={styles.stockFigure} aria-hidden="true">
          <div className={styles.stockLabels}><span>Protected base κ</span><span>Excess x</span></div>
          <div className={styles.stockBar}><span /><i /></div>
          <div className={styles.stockOutcome}>
            <span>Schematic—not proportional</span>
            <strong>{active.id === "release" || active.id === "compare" ? "base can be released" : "base remains protected"}</strong>
          </div>
        </div>
        <div className={styles.mechanismCopy}>
          <span>{active.step} / 04</span>
          <h3>{active.title}</h3>
          <p>{active.body}</p>
          <aside>{active.note}</aside>
        </div>
      </div>
    </div>
  );
}

function BarrierExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = barrierCases[activeIndex];

  return (
    <div className={styles.barrierExplorer}>
      <div className={styles.barrierControls} role="group" aria-label="Select one of four exhaustive first-passage path classes">
        {barrierCases.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveIndex(index)}
            aria-pressed={active.id === item.id}
          >
            <span>{item.number}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>

      <div className={styles.barrierResult} aria-live="polite">
        <span>Path class {active.number}</span>
        <h3>{active.label}</h3>
        <dl>
          <div><dt>First-passage event</dt><dd>{active.event}</dd></div>
          <div><dt>How the rival is bounded</dt><dd>{active.proof}</dd></div>
        </dl>
        <div className={styles.certificateChain}>{active.chain}</div>
        <p>{active.plain}</p>
      </div>
    </div>
  );
}

function RealizationExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = realizations[activeIndex];

  return (
    <div className={styles.realizationExplorer}>
      <div className={styles.realizationControls} role="group" aria-label="Select one of three theoretical realizations">
        {realizations.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveIndex(index)}
            aria-pressed={active.id === item.id}
          >
            <span>0{index + 1}</span>
            <strong>{item.short}</strong>
            <small>{item.role}</small>
          </button>
        ))}
      </div>
      <div className={styles.realizationResult} aria-live="polite">
        <span>{active.role}</span>
        <h3>{active.short}</h3>
        <dl>
          <div><dt>What it establishes</dt><dd>{active.establishes}</dd></div>
          <div><dt>How to read it</dt><dd>{active.lesson}</dd></div>
          <div><dt>Evidence</dt><dd>{active.evidence}</dd></div>
        </dl>
      </div>
    </div>
  );
}

export default function PaperExperience() {
  return (
    <main className={styles.paperPage}>
      <a className={styles.skipLink} href="#guide">Skip to the guide</a>

      <header className={styles.paperHeader}>
        <Link className={styles.siteName} href="/">Demian Reidel</Link>
        <nav aria-label="Paper guide navigation">
          <a href="#idea">Idea</a>
          <a href="#frontier">Frontier</a>
          <a href="#barrier">Proof method</a>
          <a href="#evidence">Evidence</a>
        </nav>
        <a className={styles.headerDownload} href={PDF_PATH} download>Download PDF</a>
      </header>

      <article id="guide" tabIndex={-1}>
        <section className={styles.hero} id="top">
          <div className={styles.docket}>
            <span>Explanatory guide</span>
            <span>Working Paper · August 2026</span>
            <span>Submitted to Econometrica</span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroTitle}>
              <span className={styles.eyebrow}>The question</span>
              <h1>When is productive activity large enough to be worth preserving?</h1>
            </div>
            <div className={styles.heroIntroduction}>
              <p>
                A productive system can be physically capable of survival and still be too small for preservation to maximize lifetime welfare.
              </p>
              <p>
                <em>Minimum Viable Scale and First-Passage Bellman Barriers</em> identifies the welfare frontier where the optimal future changes regime—and develops a separate method for proving all-optimizer high selection without first solving the unrestricted value function.
              </p>
              <div className={styles.paperActions}>
                <a href="#idea">Read the guide</a>
                <a href={PDF_PATH} download>Download the paper</a>
              </div>
            </div>
          </div>

          <div className={styles.heroFooter}>
            <div className={styles.authors}>
              <p>Javier Milei · Demian Reidel</p>
              <span>Office of the President of Argentina</span>
            </div>
            <div className={styles.heroThesis}>
              <span>Central distinction</span>
              <strong>Can survive</strong><i>≠</i><strong>worth saving</strong>
            </div>
          </div>

          <p className={styles.heroDisclaimer}>
            The views expressed are the authors’ own and do not represent an official position of the Government of Argentina.
          </p>
        </section>

        <section className={styles.orientationSection} id="idea">
          <header className={styles.sectionHeading}>
            <span>01 · Start here</span>
            <h2>Possible is not the same as optimal.</h2>
            <p>
              In the model, a stock of productive capital may generate enough resources to keep operating. That does not mean keeping it intact beats every feasible way of letting it run down.
            </p>
          </header>

          <div className={styles.plainLanguageStatement}>
            <p>
              Imagine a productive base that can just sustain itself. Preserving it keeps that base locked in production and leaves only the surplus available to consume. A declining plan can release part of the base. When the system is small enough, the second lifetime can be better—even though survival was technically possible.
            </p>
          </div>

          <dl className={styles.glossary} aria-label="Plain-language definitions">
            {glossary.map(([term, definition]) => (
              <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>
            ))}
          </dl>

          <MechanismExplainer />
        </section>

        <section className={styles.objectsSection}>
          <header className={styles.sectionHeading}>
            <span>02 · Four different objects</span>
            <h2>The paper separates questions that are often collapsed into one number.</h2>
            <p>The notation matters because each object belongs to a different conclusion and requires a different proof.</p>
          </header>

          <div className={styles.objectLedger}>
            {objects.map((item) => (
              <article key={item.symbol}>
                <strong>{item.symbol}</strong>
                <div><span>{item.question}</span><h3>{item.title}</h3></div>
                <p>{item.meaning}</p>
                <small>{item.not}</small>
              </article>
            ))}
          </div>

          <div className={styles.objectOrder} aria-label="The physical boundary is below the welfare frontier, which is below the high-set boundary">
            <span>0</span><i>&lt;</i><span>κ</span><i>&lt;</i><span>Kₛ</span><i>&lt;</i><span>inf H</span>
          </div>
        </section>

        <section className={styles.frontierSection} id="frontier">
          <header className={styles.sectionHeading}>
            <span>03 · The economic theorem</span>
            <h2>One welfare frontier classifies every optimizer.</h2>
            <p>
              The minimum viable scale is Kₛ—not κ. Below it, every optimum becomes extinct. Above it, every optimum selects the certified high regime. At it, the two regimes coexist.
            </p>
          </header>

          <FrontierExplorer />

          <div className={styles.architectureHeading}>
            <span>How the frontier theorem is assembled</span>
            <h3>No single certificate proves the whole classification.</h3>
          </div>

          <div className={styles.architecture}>
            <article><span>A0</span><h4>Dynamic foundations</h4><p>Existence, continuity, attainment, and a closed optimal-transition graph.</p></article>
            <article><span>A1</span><h4>Low certificate</h4><p>A nonempty interval above κ on which every optimum becomes extinct.</p></article>
            <article><span>A2</span><h4>One high certificate</h4><p>First passage, global order, or a locally ordered analytical route supplies the high anchor.</p></article>
            <article><span>A3</span><h4>Local order and no trap</h4><p>Order only on the unresolved bracket, plus exclusion of a low stationary optimum.</p></article>
            <div className={styles.architectureResult}>
              <span>Together</span>
              <strong>Unique Kₛ + optimizer exhaustion</strong>
              <p>Every optimum is either an extinction path or a high-admissible path.</p>
            </div>
          </div>

          <div className={styles.gapStatement}>
            <div>
              <span>Intrinsic solution</span>
              <h3>Kₛ is the unique zero of an attained first-move Bellman gap.</h3>
            </div>
            <div className={styles.gapEquation}>
              <strong>Δ₁(K) = V₁⁺(K) − V₁⁻(K)</strong>
              <p><span>Below Kₛ</span> negative · <span>At Kₛ</span> zero · <span>Above Kₛ</span> positive</p>
            </div>
          </div>
        </section>

        <section className={styles.barrierSection} id="barrier">
          <header className={styles.sectionHeading}>
            <span>04 · The second contribution</span>
            <h2>How do you rule out every strange rival history?</h2>
            <p>
              A promising computed path proves that one good history exists. It does not exclude a rival that waits, declines, recovers, cycles, enters the target, leaves it, or crosses a boundary repeatedly.
            </p>
          </header>

          <div className={styles.barrierIntroduction}>
            <p>
              The first-passage Bellman barrier changes the proof target. It places valid upper bounds on exhaustive classes of rival histories and compares them with values actually attained by explicit reach-and-remain policies.
            </p>
            <dl>
              <div><dt>Domain</dt><dd>Paths starting in M ∪ H</dd></div>
              <div><dt>Middle</dt><dd>M⁻ = [Kₗₒ, K<sub>hi</sub>)</dd></div>
              <div><dt>Target</dt><dd>H = [K<sub>hi</sub>, K̄]</dd></div>
            </dl>
          </div>

          <BarrierExplorer />

          <div className={styles.barrierConclusions}>
            <article>
              <span>Weak certificate</span>
              <strong>V(K) = Vᴴ(K), &nbsp; K ∈ M ∪ H</strong>
              <p>Every feasible rival is weakly dominated by a high-admissible history.</p>
            </article>
            <article>
              <span>Strict ε margins</span>
              <strong>Every optimizer from M ∪ H is high-admissible.</strong>
              <p>The strictness is pathwise. Very late exits need not create a uniform value gap.</p>
            </article>
          </div>

          <p className={styles.barrierLimit}>
            This method supplies one high-side certificate. It does not locate Kₛ, identify the policy inside the selected regime, or prove convergence to K*.
          </p>
        </section>

        <section className={styles.evidenceSection} id="evidence">
          <header className={styles.sectionHeading}>
            <span>05 · Three realizations</span>
            <h2>Each theoretical economy has a different job.</h2>
            <p>
              The examples are not calibrations. One realizes the full ordered classification, one isolates the barrier method, and one shows that global order is unnecessary for selection.
            </p>
          </header>

          <RealizationExplorer />

          <div className={styles.exactnessNote}>
            <span>What “exact” means here</span>
            <p>
              The finite ledger is not a sample of favorable points and not a simulation. Outward rational bounds, endpoint checks, and complete transition-box coverage lift the retained inequalities to a continuum certificate. Exactness remains conditional on the stated software and arithmetic trust base.
            </p>
          </div>
        </section>

        <section className={styles.scopeSection}>
          <header className={styles.sectionHeading}>
            <span>06 · Read the claims precisely</span>
            <h2>What the paper does—and does not—establish.</h2>
          </header>

          <div className={styles.scopeGrid}>
            <article><span>It does</span><h3>Classify every optimizer</h3><p>Under the stated modular conditions, the frontier separates all-extinction, coexistence, and all-optimum high selection.</p></article>
            <article><span>It does not</span><h3>Discover the Skiba state</h3><p>The threshold tradition is classical. The contribution is the constructive architecture, optimizer exhaustion, and certificate composition.</p></article>
            <article><span>It does</span><h3>Certify a continuum exactly</h3><p>The degree-5/4 realization uses complete box coverage and exact margins, not pointwise numerical evidence.</p></article>
            <article><span>It does not</span><h3>Offer an empirical calibration</h3><p>The model is deterministic, one-state, and planner-based. The displayed economies are theoretical implementations.</p></article>
            <article><span>It does</span><h3>Separate selection from destination</h3><p>Reaching and remaining in H is a selection result. Convergence to K* requires an extra interface.</p></article>
            <article><span>It does not</span><h3>Specify a policy program</h3><p>No financing rule, decentralized implementation, strategic equilibrium, or stochastic entry probability is derived.</p></article>
          </div>
        </section>

        <section className={styles.paperSection} id="paper">
          <div className={styles.paperPreview}>
            <Image
              src="/PaperJMDR/Minimum_Viable_Scale_First_Page.png"
              alt="First page of Minimum Viable Scale and First-Passage Bellman Barriers"
              width={1190}
              height={1540}
              sizes="(max-width: 780px) 90vw, 38vw"
            />
          </div>

          <div className={styles.paperDetails}>
            <span>Complete paper</span>
            <h2>Minimum Viable Scale and First-Passage Bellman Barriers</h2>
            <p className={styles.paperAuthors}>Javier Milei · Demian Reidel</p>
            <p className={styles.paperSummary}>
              The paper characterizes a unique welfare-selection frontier and develops a first-passage Bellman-barrier method for exact all-optimizer high-regime selection in nonconcave growth.
            </p>
            <dl>
              <div><dt>Status</dt><dd>Submitted to Econometrica</dd></div>
              <div><dt>Version</dt><dd>Working Paper · August 2026</dd></div>
              <div><dt>Length</dt><dd>35 pages</dd></div>
              <div><dt>JEL</dt><dd>C61 · E22 · O41</dd></div>
            </dl>
            <div className={styles.paperActions}>
              <a href={PDF_PATH} download>Download PDF</a>
              <a href={PDF_PATH} target="_blank" rel="noreferrer" aria-label="Open the paper in a new browser tab">Open in browser</a>
            </div>
            <p className={styles.paperNote}>The formal assumptions, proofs, exact certificates, and replication details are contained in the paper and its accompanying materials.</p>
          </div>
        </section>
      </article>

      <footer className={styles.paperFooter}>
        <p>Minimum Viable Scale<br />Public explanatory guide</p>
        <p>Javier Milei · Demian Reidel<br />Working Paper · August 2026</p>
        <a href="#top">Return to top</a>
      </footer>
    </main>
  );
}
