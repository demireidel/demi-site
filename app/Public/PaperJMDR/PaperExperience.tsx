"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./paper.module.css";

const PDF_PATH = "/PaperJMDR/Minimum_Viable_Scale_Main.pdf";

const regimes = [
  {
    id: "physical",
    interval: "0 < K₀ < κ",
    name: "Physical contraction",
    result: "The productive stock cannot replace itself; every feasible path converges to zero.",
  },
  {
    id: "reversal",
    interval: "κ ≤ K₀ < Kₛ",
    name: "Viable, optimally extinct",
    result: "Replacement is feasible, yet every optimum liquidates.",
  },
  {
    id: "coexistence",
    interval: "K₀ = Kₛ",
    name: "Coexistence",
    result: "An extinction optimum and a high-scale optimum coexist.",
  },
  {
    id: "selection",
    interval: "K₀ > Kₛ",
    name: "High selection",
    result: "Every optimum reaches the certified high set in finite time and remains there.",
  },
];

const barrierCases = [
  {
    label: "Remain in the middle region",
    event: "No first exit occurs.",
    argument: "A stay-class supersolution bounds the value of every history that remains unresolved forever.",
    certificate: "J(π) ≤ Bᴹ(K₀) ≤ Vᴴ(K₀)",
  },
  {
    label: "Exit below before reaching H",
    event: "The first boundary event is downward.",
    argument: "An independent continuation bound prices every possible future after the exit.",
    certificate: "continuation bound + Wᴹ",
  },
  {
    label: "Reach H, then leave",
    event: "The first post-entry event is a downward exit.",
    argument: "The common prefix cancels; same-state splicing replaces the rival continuation.",
    certificate: "same-state splice + Wᴴ",
  },
  {
    label: "Reach H and remain",
    event: "The path belongs to the target class.",
    argument: "Together with the other three rows, this exhausts every feasible lifetime history.",
    certificate: "target class Vᴴ",
  },
];

function ThresholdMap() {
  const [activeIndex, setActiveIndex] = useState(1);
  const active = regimes[activeIndex];

  return (
    <div className={styles.thresholdMap}>
      <div className={styles.mapHeading}>
        <div>
          <span>Theorem map</span>
          <h3>Initial productive scale, K₀</h3>
        </div>
        <p>Symbolic ordering; not a calibration.</p>
      </div>

      <div className={styles.theoremOrder} aria-label="Zero, replacement boundary, selection frontier, and upper state-space limit">
        <span>0</span><i /><span>κ</span><i /><span>Kₛ</span><i /><span>K̄</span>
      </div>

      <output id="regime-result" className={styles.mapResult} aria-live="polite">
        <span>{active.interval}</span>
        <strong>{active.name}</strong>
        <p>{active.result}</p>
      </output>

      <fieldset className={styles.regimeIndex} aria-controls="regime-result">
        <legend className={styles.visuallyHidden}>Select a theorem region</legend>
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
    </div>
  );
}

export default function PaperExperience() {
  return (
    <main className={styles.paperPage}>
      <a className={styles.skipLink} href="#paper-summary">Skip to the paper</a>

      <header className={styles.paperHeader}>
        <Link className={styles.siteName} href="/">Demian Reidel</Link>
        <span>Research</span>
        <a className={styles.headerDownload} href={PDF_PATH} download>Download PDF</a>
      </header>

      <article>
        <section className={styles.hero} id="top">
          <div className={styles.docket}>
            <span>Submitted to Econometrica</span>
            <span>Working Paper · August 2026</span>
            <span>35 pages</span>
          </div>

          <h1>Minimum Viable Scale <em>and First-Passage Bellman Barriers</em></h1>

          <div className={styles.heroInformation}>
            <div className={styles.authors}>
              <p>Javier Milei</p>
              <span>Office of the President of Argentina</span>
              <p>Demian Reidel</p>
              <span>Office of the President of Argentina</span>
            </div>
            <div className={styles.abstract}>
              <p>
                Nonconcave growth can support capital above its physical replacement threshold even when liquidation is optimal. We characterize the minimum viable scale: the unique initial productive scale at which the planner switches from extinction to growth.
              </p>
              <p>
                We also introduce a first-passage Bellman-barrier certificate that proves exact all-optimizer regime selection without solving the unrestricted value function or imposing global order.
              </p>
              <div className={styles.paperActions}>
                <a href={PDF_PATH} download>Download paper</a>
                <a href={PDF_PATH} target="_blank" rel="noreferrer" aria-label="Open paper in a new browser tab">Open in browser</a>
              </div>
            </div>
          </div>

          <div className={styles.ordering} aria-label="The replacement boundary is below the selection frontier, which is below the certified high threshold">
            <span>0</span><i>&lt;</i><span>κ</span><i>&lt;</i><span>Kₛ</span><i>&lt;</i><span>K<sub>hi</sub></span><i>≤</i><span>K̄</span>
          </div>

          <p className={styles.heroDisclaimer}>
            The views expressed are the authors’ own and do not represent an official position of the Government of Argentina.
          </p>
        </section>

        <section className={styles.resultSection} id="paper-summary">
          <header className={styles.sectionHeading}>
            <span>Central result</span>
            <h2>Physical viability and optimal preservation are different thresholds.</h2>
            <p>
              Between κ and Kₛ, productive capital can replace itself, but every optimal plan still liquidates. At Kₛ the two regimes coexist; above it, every optimizer selects the certified high regime.
            </p>
          </header>
          <ThresholdMap />
        </section>

        <section className={styles.certificateSection}>
          <header className={styles.sectionHeading}>
            <span>First-passage certificate</span>
            <h2>Four cases cover every feasible lifetime history.</h2>
            <p>
              The proof classifies rival paths by their first boundary event, then compares continuations from the same state. It is global in path space without requiring the unrestricted value function.
            </p>
          </header>

          <ol className={styles.barrierTable} aria-label="Four exhaustive first-passage cases">
            {barrierCases.map((item, index) => (
              <li key={item.label}>
                <span>0{index + 1}</span>
                <div><strong>{item.label}</strong><p>{item.event}</p></div>
                <p>{item.argument}</p>
                <div><small>Certificate</small><strong>{item.certificate}</strong></div>
              </li>
            ))}
          </ol>

          <div className={styles.certificateConclusion}>
            <span>Certified conclusion</span>
            <strong>V(K) = Vᴴ(K)</strong>
            <p>With strict margins, every optimizer reaches H and remains there.</p>
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
            <dl>
              <div><dt>Status</dt><dd>Submitted to Econometrica</dd></div>
              <div><dt>Version</dt><dd>Working Paper · August 2026</dd></div>
              <div><dt>Length</dt><dd>35 pages</dd></div>
              <div><dt>JEL</dt><dd>C61 · E22 · O41</dd></div>
            </dl>
            <div className={styles.paperActions}>
              <a href={PDF_PATH} download>Download PDF</a>
              <a href={PDF_PATH} target="_blank" rel="noreferrer" aria-label="Open paper in a new browser tab">Open in browser</a>
            </div>
          </div>
        </section>
      </article>

      <footer className={styles.paperFooter}>
        <p>Minimum Viable Scale<br />Working Paper · August 2026</p>
        <p>Javier Milei · Demian Reidel</p>
        <a href="#top">Return to top</a>
      </footer>
    </main>
  );
}
