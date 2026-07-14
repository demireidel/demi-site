import Link from "next/link";
import { ThresholdField } from "@/components/threshold-field";

export default function NotFound() {
  return (
    <main className="not-found-page" id="main-content">
      <ThresholdField />
      <div className="ambient-wash" aria-hidden="true" />
      <div className="grain-layer" aria-hidden="true" />
      <div>
        <p className="micro-label">404 / Outside the represented domain</p>
        <h1>NO PATH<br />FOUND.</h1>
        <Link className="button-link" href="/">
          <span>Return to initial conditions</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
