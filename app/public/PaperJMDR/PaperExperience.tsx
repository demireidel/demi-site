"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./paper.module.css";

const PDF_PATH = "/PaperJMDR/Minimum_Viable_Scale_Main.pdf";

type Region = {
  id: string;
  number: string;
  name: string;
  short: string;
  body: string;
  tone: string;
};

const regions: Region[] = [
  {
    id: "physical",
    number: "01",
    name: "Physical extinction",
    short: "The stock cannot replace itself.",
    body: "Below the replacement boundary κ, every feasible path contracts toward zero. Extinction is technological before it is a welfare choice.",
    tone: "cold",
  },
  {
    id: "reversal",
    number: "02",
    name: "Viable, optimally extinct",
    short: "Survival is possible. Liquidation still wins.",
    body: "Between κ and Kₛ, the stock can be maintained, yet every optimum becomes extinct. Physical viability and optimal selection point in opposite directions.",
    tone: "signal",
  },
  {
    id: "coexistence",
    number: "03",
    name: "Coexistence",
    short: "Two optimal futures branch from one state.",
    body: "At Kₛ, an extinction optimum and a high-scale optimum coexist. Their first moves can be chosen on opposite sides of the current stock.",
    tone: "split",
  },
  {
    id: "escape",
    number: "04",
    name: "High selection",
    short: "Every optimizer reaches the certified high regime.",
    body: "Above Kₛ, every optimum enters the high set H in finite time and remains there. Convergence to a particular K* requires a separate destination condition.",
    tone: "electric",
  },
];

const barrierCases = [
  {
    id: "stay",
    label: "Stay unresolved",
    title: "The history remains in the middle region forever.",
    body: "A residual supersolution Bᴹ caps every lifetime payoff that never reaches the high set and never exits below the low boundary.",
    certificate: "Middle barrier · Bᴹ",
  },
  {
    id: "down",
    label: "Exit downward",
    title: "The history falls below Kₗₒ before reaching H.",
    body: "An independently certified continuation bound prices everything that can happen after the first exit. An explicit reach-and-remain policy then dominates from the identical pre-exit state.",
    certificate: "Continuation bound · V̄ + Wᴹ",
  },
  {
    id: "leave",
    label: "Leave high",
    title: "The history reaches H, then tries to leave.",
    body: "At the first downward exit, the common prefix cancels. The continuation is replaced by a high-admissible policy from exactly the same state.",
    certificate: "Same-state splice · Wᴴ",
  },
  {
    id: "remain",
    label: "Enter and remain",
    title: "The history reaches H and never leaves.",
    body: "This is already a target-class history. The four cases exhaust every feasible lifetime path that begins in the middle or high region.",
    certificate: "Target class · Vᴴ",
  },
];

const objects = [
  {
    symbol: "κ",
    label: "Replacement boundary",
    body: "The smallest positive stock at which maximal current resources can replace the productive stock.",
    note: "Physical object",
  },
  {
    symbol: "Kₛ",
    label: "Selection frontier",
    body: "The unique initial scale at which optimal welfare switches between extinction and growth.",
    note: "Economic object",
  },
  {
    symbol: "H",
    label: "Certified high set",
    body: "A proof target used to establish high selection. It is not the definition of minimum viable scale.",
    note: "Proof object",
  },
  {
    symbol: "K*",
    label: "Stationary destination",
    body: "A long-run state inside the selected regime, available only when additional destination conditions hold.",
    note: "Conditional object",
  },
];

function PhaseField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let pointerX = 0.55;
    let pointerY = 0.45;

    type Particle = { x: number; y: number; age: number; life: number; speed: number };
    const particles: Particle[] = [];

    const resetParticle = (particle: Particle, initial = false) => {
      particle.x = initial ? Math.random() * width : -8;
      particle.y = height * (0.1 + Math.random() * 0.8);
      particle.age = initial ? Math.random() * particle.life : 0;
      particle.life = 220 + Math.random() * 260;
      particle.speed = 0.35 + Math.random() * 0.65;
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles.length = 0;
      const count = reducedMotion ? 90 : Math.min(240, Math.round(width / 5));
      for (let index = 0; index < count; index += 1) {
        const particle = { x: 0, y: 0, age: 0, life: 300, speed: 1 };
        resetParticle(particle, true);
        particles.push(particle);
      }
    };

    const drawFrame = () => {
      if (frame === 0 || reducedMotion) {
        context.fillStyle = "#050507";
        context.fillRect(0, 0, width, height);
      } else {
        context.fillStyle = "rgba(5, 5, 7, 0.095)";
        context.fillRect(0, 0, width, height);
      }

      const threshold = width * 0.49;
      const highLine = width * 0.72;
      const glow = context.createLinearGradient(0, 0, width, 0);
      glow.addColorStop(0, "rgba(126,166,255,0.08)");
      glow.addColorStop(0.48, "rgba(255,92,53,0.2)");
      glow.addColorStop(0.72, "rgba(49,92,255,0.18)");
      glow.addColorStop(1, "rgba(49,92,255,0.02)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.lineWidth = 1;
      context.strokeStyle = "rgba(255,255,255,0.12)";
      context.beginPath();
      context.moveTo(threshold, 0);
      context.lineTo(threshold, height);
      context.moveTo(highLine, 0);
      context.lineTo(highLine, height);
      context.stroke();

      for (const particle of particles) {
        const oldX = particle.x;
        const oldY = particle.y;
        const normalizedX = particle.x / width;
        const normalizedY = particle.y / height;
        const bifurcation = Math.tanh((normalizedX - 0.49) * 8);
        const current =
          Math.sin(normalizedY * 11 + frame * 0.008 + particle.speed * 4) *
          (0.35 + Math.abs(bifurcation) * 0.65);
        const pointerPull = Math.max(
          0,
          1 -
            Math.hypot(normalizedX - pointerX, normalizedY - pointerY) * 3.2,
        );

        particle.x += particle.speed * (0.55 + bifurcation * 0.24);
        particle.y += current + (pointerY - normalizedY) * pointerPull * 2.4;
        particle.age += 1;

        if (
          particle.x > width + 12 ||
          particle.y < -20 ||
          particle.y > height + 20 ||
          particle.age > particle.life
        ) {
          resetParticle(particle);
          continue;
        }

        const isHigh = normalizedX > 0.5;
        context.strokeStyle = isHigh
          ? `rgba(126,166,255,${0.18 + pointerPull * 0.32})`
          : `rgba(255,119,83,${0.12 + pointerPull * 0.26})`;
        context.beginPath();
        context.moveTo(oldX, oldY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }

      frame += 1;
      if (!reducedMotion) animationFrame = window.requestAnimationFrame(drawFrame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = (event.clientX - bounds.left) / bounds.width;
      pointerY = (event.clientY - bounds.top) / bounds.height;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    resize();
    drawFrame();

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.phaseCanvas} aria-hidden="true" />;
}

function ThresholdLab() {
  const [position, setPosition] = useState(50);

  const region =
    position <= 22
      ? regions[0]
      : position < 50
        ? regions[1]
        : position === 50
          ? regions[2]
          : regions[3];

  const trajectoryClass = `${styles.trajectory} ${styles[`trajectory_${region.id}`]}`;

  return (
    <div className={styles.thresholdLab}>
      <div className={styles.labHeader}>
        <div>
          <span className={styles.microLabel}>Interactive model map</span>
          <p className={styles.labPrompt}>Move the initial productive scale K₀</p>
        </div>
        <span className={styles.conceptualTag}>Normalized · conceptual</span>
      </div>

      <div className={styles.scaleControl}>
        <div className={styles.scaleTrack} aria-hidden="true">
          <span className={styles.trackPhysical} />
          <span className={styles.trackReversal} />
          <span className={styles.trackEscape} />
          <span className={styles.thresholdMarker} style={{ left: `${position}%` }}>
            <i />
          </span>
          <span className={`${styles.scaleBoundary} ${styles.kappa}`}>
            <b>κ</b>
            <small>replacement</small>
          </span>
          <span className={`${styles.scaleBoundary} ${styles.ks}`}>
            <b>Kₛ</b>
            <small>selection</small>
          </span>
          <span className={`${styles.scaleBoundary} ${styles.high}`}>
            <b>H</b>
            <small>proof target</small>
          </span>
          <span className={`${styles.scaleBoundary} ${styles.kstar}`}>
            <b>K*</b>
            <small>conditional destination</small>
          </span>
        </div>
        <label className={styles.rangeLabel}>
          <span className={styles.visuallyHidden}>Initial productive scale</span>
          <input
            type="range"
            min="4"
            max="96"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-valuetext={region.name}
          />
        </label>
      </div>

      <div className={styles.labResult} data-tone={region.tone}>
        <div className={styles.resultIndex}>{region.number}</div>
        <div>
          <span className={styles.resultState}>K₀ = {position}</span>
          <h3>{region.name}</h3>
          <p className={styles.resultShort}>{region.short}</p>
        </div>
        <p className={styles.resultBody}>{region.body}</p>
        <div className={trajectoryClass} aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function BarrierExplorer() {
  const [active, setActive] = useState(barrierCases[0].id);
  const selected = barrierCases.find((item) => item.id === active) ?? barrierCases[0];

  return (
    <div className={styles.barrierExplorer}>
      <div className={styles.barrierTabs} role="group" aria-label="Four exhaustive path classes">
        {barrierCases.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={active === item.id ? styles.activeBarrierTab : undefined}
            onClick={() => setActive(item.id)}
            aria-pressed={active === item.id}
          >
            <span>0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.barrierStage}>
        <div className={`${styles.pathStage} ${styles[`path_${selected.id}`]}`} aria-hidden="true">
          <span className={styles.lowZone}>Below Kₗₒ</span>
          <span className={styles.middleZone}>M</span>
          <span className={styles.highZone}>H</span>
          <i className={styles.boundaryLow} />
          <i className={styles.boundaryHigh} />
          <div className={styles.pathDots}>
            <b /><b /><b /><b /><b /><b /><b />
          </div>
        </div>
        <div className={styles.barrierCopy}>
          <span className={styles.microLabel}>{selected.certificate}</span>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function PaperExperience() {
  return (
    <main className={styles.paperPage}>
      <a className={styles.skipLink} href="#frontier">Skip to the explanation</a>
      <header className={styles.paperHeader}>
        <a className={styles.paperMark} href="#top" aria-label="Minimum Viable Scale, top">
          <span>JM</span><i /><span>DR</span>
        </a>
        <nav aria-label="Paper navigation">
          <a href="#frontier">Frontier</a>
          <a href="#barrier">Barrier</a>
          <a href="#proof">Proof</a>
          <a href="#paper">Paper</a>
        </nav>
        <a className={styles.headerDownload} href={PDF_PATH} download>
          PDF <span aria-hidden="true">↓</span>
        </a>
      </header>

      <section className={styles.hero} id="top">
        <PhaseField />
        <div className={styles.heroGrid} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className={styles.heroMeta}>
          <span>Submitted to Econometrica</span>
          <span>Working paper · August 2026</span>
        </div>
        <div className={styles.heroTitle}>
          <p>Javier Milei · Demian Reidel</p>
          <h1>
            Minimum
            <br />
            Viable Scale
          </h1>
          <h2>and First-Passage Bellman Barriers</h2>
        </div>
        <div className={styles.heroThesis}>
          <span className={styles.heroQuestion}>The question</span>
          <p>When is productive activity large enough that growth is better than liquidation?</p>
          <a href="#frontier">Enter the frontier <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroEquation} aria-label="Replacement boundary is below the selection frontier, which is below the high proof target">
          <span>κ</span><i>&lt;</i><span>Kₛ</span><i>&lt;</i><span>inf H</span>
        </div>
      </section>

      <section className={styles.statementSection}>
        <div className={styles.sectionRail}>
          <span>00</span>
          <span>The central distinction</span>
        </div>
        <div className={styles.statementCopy}>
          <p className={styles.overline}>Survival is not selection.</p>
          <h2>
            A system can be physically viable
            <em>and still be optimally abandoned.</em>
          </h2>
        </div>
        <div className={styles.statementBody}>
          <p>
            Physical feasibility asks whether a productive stock can replace itself. Welfare selection asks a harder question: whether protecting resources for the future beats liquidation across complete lifetime histories.
          </p>
          <p>
            With increasing returns, those thresholds separate. The paper identifies the unique frontier between extinction and growth—and proves which regime every optimizer selects.
          </p>
        </div>
      </section>

      <section className={styles.frontierSection} id="frontier">
        <div className={styles.sectionHeading}>
          <div className={styles.sectionRail}>
            <span>01</span>
            <span>The frontier</span>
          </div>
          <div>
            <p className={styles.overline}>One scale · Four regimes</p>
            <h2>The point where the future changes class.</h2>
          </div>
          <p>
            The scale below is normalized to explain the theorem. It is a conceptual map, not an empirical calibration or a numerical estimate for any country or industry.
          </p>
        </div>
        <ThresholdLab />
      </section>

      <section className={styles.objectsSection}>
        <div className={styles.objectsLead}>
          <p className={styles.overline}>Four objects</p>
          <h2>Do not compress them into one “critical capital” number.</h2>
          <p>Each object answers a different question, and each relation has a different proof.</p>
        </div>
        <div className={styles.objectsGrid}>
          {objects.map((item, index) => (
            <article key={item.symbol} className={styles.objectCard}>
              <div className={styles.objectTop}>
                <span>0{index + 1}</span>
                <span>{item.note}</span>
              </div>
              <strong>{item.symbol}</strong>
              <h3>{item.label}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.reversalSection}>
        <div className={styles.sectionRail}>
          <span>02</span>
          <span>Viability reversal</span>
        </div>
        <div className={styles.reversalGraphic} aria-hidden="true">
          <div className={styles.protectedBase}>
            <span>Protected base</span>
            <b>κ</b>
          </div>
          <div className={styles.excessFlow}>
            <span>Consumable excess</span>
            <b>x → 0</b>
          </div>
          <div className={styles.releaseFlow}>
            <span>Liquidation releases the base</span>
            <b>complete lifetime value</b>
          </div>
        </div>
        <div className={styles.reversalCopy}>
          <p className={styles.overline}>Why viability can lose</p>
          <h2>Preservation protects the base. Liquidation can consume it.</h2>
          <p>
            Close to κ, a preserving path can consume only the thin surplus generated above the replacement boundary. As that excess vanishes, so does its current flow. A declining path can release part of the productive base instead.
          </p>
          <p>
            The relevant comparison is therefore not a one-period return or an Euler condition. It is the welfare ranking of complete lifetime histories.
          </p>
          <div className={styles.formulaBlock}>
            <span>Viability-selection reversal</span>
            <strong>Vᴾ(κ + x) &lt; Wᴱ(κ + x)</strong>
            <small>for a certified nonempty interval to the right of κ</small>
          </div>
        </div>
      </section>

      <section className={styles.barrierSection} id="barrier">
        <div className={styles.sectionHeadingLight}>
          <div className={styles.sectionRail}>
            <span>03</span>
            <span>First passage</span>
          </div>
          <div>
            <p className={styles.overline}>The methodological contribution</p>
            <h2>Don’t solve every path. Certify every path class.</h2>
          </div>
          <p>
            A beautiful candidate trajectory proves that one good history exists. It does not exclude decline, delay, recovery, cycling, repeated crossings, or later exit. The barrier covers them all.
          </p>
        </div>
        <BarrierExplorer />
        <div className={styles.barrierConclusion}>
          <span>Global in path space</span>
          <p>
            Every feasible history is either already high-admissible or is weakly dominated by an explicit history that reaches H and remains there.
          </p>
          <strong>V(K) = Vᴴ(K)</strong>
        </div>
      </section>

      <section className={styles.contributionsSection}>
        <div className={styles.sectionRail}>
          <span>04</span>
          <span>What is solved</span>
        </div>
        <div className={styles.contributionIntro}>
          <p className={styles.overline}>Two contributions</p>
          <h2>A frontier—and a new way to certify the regime above it.</h2>
        </div>
        <div className={styles.contributionGrid}>
          <article>
            <span>01 / Structural</span>
            <h3>The unique minimum viable scale</h3>
            <p>
              Separate low and high certificates, joined by local order only on the unresolved bracket, deliver extinction below Kₛ, coexistence at it, and all-optimizer high selection above it.
            </p>
            <div className={styles.gapEquation}>
              <small>Canonical attained Bellman gap</small>
              <strong>Δ₁(K) = V₁⁺(K) − V₁⁻(K)</strong>
              <span>Its unique zero is Kₛ.</span>
            </div>
          </article>
          <article>
            <span>02 / Method</span>
            <h3>The first-passage Bellman barrier</h3>
            <p>
              Stay-class upper bounds, an independent continuation bound, attained policy floors, and same-state splicing prove exact all-optimizer selection without solving the unrestricted value function or imposing global order.
            </p>
            <div className={styles.gapEquation}>
              <small>Proof target</small>
              <strong>all feasible lifetime histories</strong>
              <span>not one computed path</span>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.proofSection} id="proof">
        <div className={styles.proofBackdrop} aria-hidden="true">394681</div>
        <div className={styles.sectionRail}>
          <span>05</span>
          <span>The exact proof object</span>
        </div>
        <div className={styles.proofLead}>
          <p className={styles.overline}>Degree-5/4 CES realization</p>
          <h2>Finite ledger.<br />Continuum conclusion.</h2>
          <p>
            The retained certificate is not a pointwise grid sample. Exact endpoint bounds and complete transition-box coverage lift the verified inequalities to the continuum.
          </p>
        </div>
        <div className={styles.proofMetrics}>
          <article>
            <strong>390,842</strong>
            <span>exact proof rows</span>
          </article>
          <article>
            <strong>3,839</strong>
            <span>coverage cells</span>
          </article>
          <article>
            <strong>394,681</strong>
            <span>recorded rows or cells</span>
          </article>
          <article>
            <strong>4.46 × 10⁻⁹</strong>
            <span>smallest replayed strict margin</span>
          </article>
          <article>
            <strong>1,959</strong>
            <span>stationary audit boxes</span>
          </article>
        </div>
        <p className={styles.proofNote}>
          These counts describe the paper’s mild-return degree-5/4 realization, not the conceptual definition of the method and not an empirical dataset.
        </p>
      </section>

      <section className={styles.patienceSection}>
        <div className={styles.sectionRail}>
          <span>06</span>
          <span>Patience</span>
        </div>
        <div className={styles.patienceCopy}>
          <p className={styles.overline}>Inside the ordered realization</p>
          <h2>The more the future matters, the less scale is needed to choose it.</h2>
          <p>
            In the ordered CES-log economy, greater patience strictly lowers the minimum viable scale and raises the positive stationary destination. Every more-patient optimal path lies weakly above every less-patient one after the initial date.
          </p>
        </div>
        <div className={styles.patienceVisual} aria-label="As beta approaches one, minimum viable scale approaches the replacement boundary">
          <div className={styles.betaAxis}>
            <span>β = 0.70</span>
            <span>β → 1</span>
          </div>
          <div className={styles.convergenceLines} aria-hidden="true">
            <i /><i /><i /><i /><i />
          </div>
          <div className={styles.limitEquation}>
            <span>limit as β approaches 1</span>
            <strong>Kₛ(A, β) = κ(A)</strong>
          </div>
        </div>
      </section>

      <section className={styles.limitsSection}>
        <div className={styles.sectionRail}>
          <span>07</span>
          <span>Scope</span>
        </div>
        <div className={styles.limitsHeading}>
          <p className={styles.overline}>What the paper does not claim</p>
          <h2>Precision includes the boundary of the result.</h2>
        </div>
        <div className={styles.limitsGrid}>
          <article><span>01</span><h3>Not a calibration</h3><p>The displayed economies are theoretical implementations, not empirical estimates.</p></article>
          <article><span>02</span><h3>Selection is not destination</h3><p>Entering and remaining in H does not by itself prove convergence to a particular K*.</p></article>
          <article><span>03</span><h3>Sufficient, not necessary</h3><p>Failure to construct a barrier certificate does not prove that high selection is false.</p></article>
          <article><span>04</span><h3>A narrow environment</h3><p>The model is deterministic, one-state, and planner-based. Strategic, stochastic, and multidimensional extensions require new theorems.</p></article>
          <article><span>05</span><h3>No automatic policy rule</h3><p>The augmentation exercise does not specify financing, decentralization, or a direct policy prescription.</p></article>
          <article><span>06</span><h3>Classical frontier, new composition</h3><p>The paper does not claim to discover the Skiba state or first-passage analysis; its claim concerns the certificate’s composition and application.</p></article>
        </div>
      </section>

      <section className={styles.paperSection} id="paper">
        <div className={styles.paperPreview}>
          <Image
            src="/PaperJMDR/Minimum_Viable_Scale_First_Page.png"
            alt="First page of Minimum Viable Scale and First-Passage Bellman Barriers"
            width={1190}
            height={1540}
            sizes="(max-width: 860px) 86vw, 38vw"
          />
        </div>
        <div className={styles.paperDetails}>
          <div className={styles.paperStatus}>
            <span>Working paper</span>
            <span>August 2026</span>
            <span>35 pages</span>
          </div>
          <p className={styles.overline}>Read the complete argument</p>
          <h2>Minimum Viable Scale and First-Passage Bellman Barriers</h2>
          <p className={styles.paperAuthors}>Javier Milei · Demian Reidel</p>
          <p className={styles.paperAbstract}>
            The paper characterizes the unique welfare frontier at which the planner switches from extinction to growth and introduces a first-passage Bellman-barrier certificate for exact all-optimizer regime selection in nonconcave growth.
          </p>
          <div className={styles.paperActions}>
            <a className={styles.primaryPaperAction} href={PDF_PATH} download>
              Download PDF <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.secondaryPaperAction} href={PDF_PATH} target="_blank" rel="noreferrer">
              Open paper <Arrow />
            </a>
          </div>
          <div className={styles.paperMetadata}>
            <span>Submitted to Econometrica</span>
            <span>PDF · 181 KB</span>
            <span>JEL C61 · E22 · O41</span>
          </div>
          <p className={styles.disclaimer}>
            The views expressed are the authors’ own and do not represent an official position of the Government of Argentina.
          </p>
        </div>
      </section>

      <footer className={styles.paperFooter}>
        <a className={styles.paperMark} href="#top" aria-label="Back to top">
          <span>JM</span><i /><span>DR</span>
        </a>
        <p>Minimum Viable Scale<br />August 2026</p>
        <p>Working paper<br />Submitted to Econometrica</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
