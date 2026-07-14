"use client";

import { useMemo, useState, type ChangeEvent } from "react";

const KAPPA = 0.018156974557;
const ANALYTICAL_LOWER = 0.01815717;
const CERTIFIED_UPPER = 0.04;
const STATIONARY_SCALE = 5.077;
const SLIDER_MIN = 0.006;
const SLIDER_MAX = 7;
const SLIDER_STEPS = 1000;

type Regime = "forced" | "reversal" | "bracket" | "high";

const regimes: Record<
  Regime,
  { index: string; label: string; title: string; description: string }
> = {
  forced: {
    index: "01",
    label: "Below maintainability",
    title: "Forced extinction",
    description:
      "The stock cannot replace depreciation. Every feasible path contracts toward zero.",
  },
  reversal: {
    index: "02",
    label: "Viable, not selected",
    title: "Possible is not enough",
    description:
      "The stock is physically maintainable and the local return test favors accumulation. The complete welfare comparison still selects liquidation.",
  },
  bracket: {
    index: "03",
    label: "Exact selection bracket",
    title: "Two futures meet",
    description:
      "The unique global threshold lies inside this certified interval. Below it every optimum liquidates; above it every optimum reaches high scale.",
  },
  high: {
    index: "04",
    label: "Above certified bound",
    title: "High scale is selected",
    description:
      "The initial stock exceeds the certified upper bound for the threshold. Every benchmark optimum reaches the high region and converges to the positive stationary scale.",
  },
};

const presets = [
  { label: "Forced", value: 0.012 },
  { label: "Viable / liquidate", value: (KAPPA + ANALYTICAL_LOWER) / 2 },
  { label: "Threshold bracket", value: Math.sqrt(ANALYTICAL_LOWER * CERTIFIED_UPPER) },
  { label: "High selection", value: 0.08 },
] as const;

function toSlider(value: number) {
  const min = Math.log(SLIDER_MIN);
  const max = Math.log(SLIDER_MAX);
  return ((Math.log(value) - min) / (max - min)) * SLIDER_STEPS;
}

function fromSlider(value: number) {
  const min = Math.log(SLIDER_MIN);
  const max = Math.log(SLIDER_MAX);
  return Math.exp(min + (value / SLIDER_STEPS) * (max - min));
}

function plotX(value: number) {
  const left = 74;
  const right = 650;
  const min = Math.log(SLIDER_MIN);
  const max = Math.log(SLIDER_MAX);
  return left + ((Math.log(value) - min) / (max - min)) * (right - left);
}

function formatCapital(value: number) {
  if (value < 0.1) return value.toFixed(8).replace(/0+$/, "");
  return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function getRegime(value: number): Regime {
  if (value <= KAPPA) return "forced";
  if (value < ANALYTICAL_LOWER) return "reversal";
  if (value <= CERTIFIED_UPPER) return "bracket";
  return "high";
}

function TrajectoryPlot({ value, regime }: { value: number; regime: Regime }) {
  const marker = plotX(value);
  const kappaX = plotX(KAPPA);
  const lowerX = plotX(ANALYTICAL_LOWER);
  const upperX = plotX(CERTIFIED_UPPER);
  const stationaryX = plotX(STATIONARY_SCALE);
  const startingY = Math.max(98, Math.min(225, 205 - Math.log(value / KAPPA + 1) * 22));
  const showExtinction = regime !== "high";
  const showHigh = regime === "bracket" || regime === "high" || regime === "reversal";

  return (
    <svg
      className="mvs-plot"
      viewBox="0 0 720 320"
      role="img"
      aria-labelledby="mvs-plot-title mvs-plot-description"
    >
      <title id="mvs-plot-title">Benchmark capital path selection</title>
      <desc id="mvs-plot-description">
        A schematic log-scale view showing extinction below the global selection threshold and convergence to the positive stationary scale above it.
      </desc>

      <g className="mvs-plot-grid" aria-hidden="true">
        <line x1="74" y1="62" x2="650" y2="62" />
        <line x1="74" y1="132" x2="650" y2="132" />
        <line x1="74" y1="202" x2="650" y2="202" />
        <line x1="74" y1="272" x2="650" y2="272" />
      </g>

      <rect
        className="mvs-threshold-band"
        x={Math.max(kappaX + 2, lowerX)}
        y="48"
        width={Math.max(7, upperX - lowerX)}
        height="224"
        rx="3"
      />
      <line className="mvs-boundary-line" x1={kappaX} y1="48" x2={kappaX} y2="272" />
      <line className="mvs-target-line" x1={stationaryX} y1="48" x2={stationaryX} y2="272" />

      {showExtinction && (
        <path
          className={`mvs-path mvs-path-extinction ${regime === "bracket" ? "is-conditional" : "is-selected"}`}
          d={`M ${marker} ${startingY} C ${Math.min(marker + 85, 360)} ${startingY + 12}, 485 250, 650 272`}
        />
      )}

      {showHigh && (
        <path
          className={`mvs-path mvs-path-high ${regime === "high" ? "is-selected" : "is-conditional"}`}
          d={`M ${marker} ${startingY} C ${Math.min(marker + 105, 390)} ${Math.max(75, startingY - 12)}, 490 58, ${stationaryX} 62`}
        />
      )}

      <line className="mvs-current-line" x1={marker} y1="43" x2={marker} y2="279" />
      <circle className="mvs-current-node" cx={marker} cy={startingY} r="6" />

      <g className="mvs-axis-labels" aria-hidden="true">
        <text x="74" y="303">0</text>
        <text x={kappaX} y="303" textAnchor="middle">κ</text>
        <text x={(lowerX + upperX) / 2} y="31" textAnchor="middle">Kₛ bracket</text>
        <text x={stationaryX} y="303" textAnchor="middle">K*</text>
        <text x="650" y="303" textAnchor="end">capital / log scale</text>
      </g>
    </svg>
  );
}

export function MvsExplorer({ compact = false }: { compact?: boolean }) {
  const [capital, setCapital] = useState(0.08);
  const regime = getRegime(capital);
  const copy = regimes[regime];
  const sliderValue = useMemo(() => toSlider(capital), [capital]);
  const ratio = capital / KAPPA;

  return (
    <div className={`mvs-explorer ${compact ? "is-compact" : ""}`}>
      <div className="mvs-control-panel">
        <div className="mvs-state-heading" aria-live="polite">
          <span>{copy.index}</span>
          <div>
            <p>{copy.label}</p>
            <h3>{copy.title}</h3>
          </div>
        </div>

        <p className="mvs-state-description">{copy.description}</p>

        <div className="mvs-readout">
          <div>
            <span>Initial stock</span>
            <output>K₀ = {formatCapital(capital)}</output>
          </div>
          <div>
            <span>Normalized scale</span>
            <output>{ratio.toFixed(ratio < 10 ? 2 : 0)}κ</output>
          </div>
        </div>

        <label className="mvs-slider-label" htmlFor={compact ? "mvs-capital-compact" : "mvs-capital"}>
          <span>Move the initial condition</span>
          <span>{formatCapital(SLIDER_MIN)} — {formatCapital(SLIDER_MAX)}</span>
        </label>
        <input
          id={compact ? "mvs-capital-compact" : "mvs-capital"}
          className="mvs-slider"
          type="range"
          min="0"
          max={SLIDER_STEPS}
          step="1"
          value={sliderValue}
          aria-valuemin={SLIDER_MIN}
          aria-valuemax={SLIDER_MAX}
          aria-valuenow={capital}
          aria-valuetext={`Initial capital ${formatCapital(capital)}, ${copy.title}`}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCapital(fromSlider(Number(event.target.value)))
          }
        />

        <div className="mvs-presets" aria-label="Threshold examples">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={Math.abs(capital - preset.value) < 1e-10 ? "is-active" : ""}
              onClick={() => setCapital(preset.value)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mvs-visual-panel">
        <TrajectoryPlot value={capital} regime={regime} />
        <div className="mvs-proof-note">
          <span>Benchmark A = 10.04</span>
          <span>κ = 0.01815697…</span>
          <span>0.01815717… ≤ Kₛ ≤ 0.04</span>
          <span>K* = 5.077…</span>
        </div>
      </div>
    </div>
  );
}
