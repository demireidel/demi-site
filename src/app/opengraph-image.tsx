import { ImageResponse } from "next/og";

export const alt = "Demian Reidel — Systems at Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 64px",
          background:
            "radial-gradient(circle at 18% 30%, rgba(240,75,34,.42), transparent 34%), radial-gradient(circle at 82% 72%, rgba(155,231,236,.3), transparent 36%), #080807",
          color: "#ebe7dd",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>DR / 2026</span>
          <span>Systems at scale</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 142,
            fontWeight: 800,
            lineHeight: 0.76,
            letterSpacing: -11,
          }}
        >
          <span>DEMIAN</span>
          <span style={{ color: "#9be7ec" }}>REIDEL</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 48,
          }}
        >
          <span style={{ maxWidth: 650, fontSize: 31, lineHeight: 1.08 }}>
            Science · Capital · State · Infrastructure
          </span>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#c9c3b6",
            }}
          >
            Viable ≠ Selected
          </span>
        </div>
      </div>
    ),
    size,
  );
}
