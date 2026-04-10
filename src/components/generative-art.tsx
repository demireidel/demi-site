"use client";

import { useEffect, useRef } from "react";

// --- Flow Field ---
function FlowField({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);
  const hover = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particles: { x: number; y: number; age: number }[] = [];
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        age: Math.random() * 100,
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, width, height);
      time.current += hover.current ? 0.008 : 0.004;

      for (const p of particles) {
        const angle =
          Math.sin(p.x * 0.008 + time.current) *
            Math.cos(p.y * 0.006 + time.current * 0.7) *
            Math.PI *
            2 +
          Math.sin(time.current * 0.5 + p.y * 0.003) * 0.5;

        p.x += Math.cos(angle) * 0.8;
        p.y += Math.sin(angle) * 0.8;
        p.age += 1;

        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height || p.age > 200) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.age = 0;
        }

        const alpha = Math.sin((p.age / 200) * Math.PI) * 0.6;
        ctx.fillStyle = `rgba(197, 165, 90, ${alpha})`;
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // Initial clear
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, width, height);
    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      style={{ width, height }}
      className="block"
    />
  );
}

// --- Strange Attractor ---
function StrangeAttractor({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let x = 0.1, y = 0, z = 0;
    const sigma = 10, rho = 28, beta = 8 / 3;
    const dt = 0.005;
    let frame = 0;

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, width, height);

    const draw = () => {
      for (let i = 0; i < 8; i++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;
        x += dx; y += dy; z += dz;

        const px = width / 2 + x * (width / 60);
        const py = height / 2 + z * (height / 80) - height * 0.35;

        const alpha = 0.15 + (z / 50) * 0.3;
        ctx.fillStyle = `rgba(197, 165, 90, ${Math.min(alpha, 0.5)})`;
        ctx.fillRect(px, py, 1.2, 1.2);
      }

      frame++;
      if (frame > 12000) {
        ctx.fillStyle = "rgba(10, 10, 10, 0.01)";
        ctx.fillRect(0, 0, width, height);
        if (frame > 14000) { frame = 0; x = 0.1; y = 0; z = 0; }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}

// --- Mathematical Rose ---
function MathRose({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.min(width, height) * 0.38;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.03)";
      ctx.fillRect(0, 0, width, height);
      time.current += 0.003;

      const k = 5 / 3 + Math.sin(time.current * 0.2) * 0.3;

      ctx.beginPath();
      for (let theta = 0; theta < Math.PI * 12; theta += 0.02) {
        const r = maxR * Math.cos(k * theta + time.current);
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(197, 165, 90, 0.15)`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, width, height);
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}

// --- Interference Pattern ---
function InterferencePattern({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const draw = () => {
      time.current += 0.015;

      const cx1 = width * 0.35;
      const cy1 = height * 0.45 + Math.sin(time.current * 0.5) * 20;
      const cx2 = width * 0.65;
      const cy2 = height * 0.55 + Math.cos(time.current * 0.4) * 20;

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const d1 = Math.sqrt((x - cx1) ** 2 + (y - cy1) ** 2);
          const d2 = Math.sqrt((x - cx2) ** 2 + (y - cy2) ** 2);
          const wave = Math.sin(d1 * 0.08 - time.current) + Math.sin(d2 * 0.08 - time.current * 1.1);
          const intensity = (wave + 2) / 4;

          const idx = (y * width + x) * 4;
          const v = intensity * 0.35;
          data[idx] = Math.floor(197 * v);
          data[idx + 1] = Math.floor(165 * v);
          data[idx + 2] = Math.floor(90 * v);
          data[idx + 3] = 255;

          // Fill 2x2 block
          if (x + 1 < width) {
            data[idx + 4] = data[idx];
            data[idx + 5] = data[idx + 1];
            data[idx + 6] = data[idx + 2];
            data[idx + 7] = 255;
          }
          if (y + 1 < height) {
            const idx2 = ((y + 1) * width + x) * 4;
            data[idx2] = data[idx];
            data[idx2 + 1] = data[idx + 1];
            data[idx2 + 2] = data[idx + 2];
            data[idx2 + 3] = 255;
            if (x + 1 < width) {
              data[idx2 + 4] = data[idx];
              data[idx2 + 5] = data[idx + 1];
              data[idx2 + 6] = data[idx + 2];
              data[idx2 + 7] = 255;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}

// --- Gradient Mesh ---
function GradientMesh({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      time.current += 0.005;
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 5; i++) {
        const cx = width * (0.2 + 0.15 * i) + Math.sin(time.current + i * 1.5) * 30;
        const cy = height * 0.5 + Math.cos(time.current * 0.7 + i * 2) * 40;
        const r = Math.min(width, height) * (0.3 + Math.sin(time.current + i) * 0.1);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        const alpha = 0.06 + Math.sin(time.current + i * 0.8) * 0.02;
        gradient.addColorStop(0, `rgba(197, 165, 90, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(197, 145, 50, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}

// --- Voronoi ---
function Voronoi({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const seeds = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const step = 4;
    const draw = () => {
      time.current += 0.01;
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      // Move seeds
      for (const s of seeds) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;
      }

      // Draw Voronoi edges by checking neighbor differences
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          let minD = Infinity, minD2 = Infinity;
          for (const s of seeds) {
            const d = Math.abs(x - s.x) + Math.abs(y - s.y);
            if (d < minD) { minD2 = minD; minD = d; }
            else if (d < minD2) { minD2 = d; }
          }
          const edge = minD2 - minD;
          if (edge < 8) {
            const alpha = (1 - edge / 8) * 0.4;
            ctx.fillStyle = `rgba(197, 165, 90, ${alpha})`;
            ctx.fillRect(x, y, step, step);
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ width, height }} className="block" />;
}

// --- Wrapper for each art piece with lazy init ---
function ArtCanvas({
  Renderer,
  label,
}: {
  Renderer: React.ComponentType<{ width: number; height: number }>;
  label: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const rect = el.getBoundingClientRect();
          sizeRef.current = { width: Math.floor(rect.width), height: Math.floor(rect.height) };
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fade-up aspect-square bg-obsidian border border-rule overflow-hidden group hover:border-gold/30 transition-all duration-500 relative"
    >
      {mounted && sizeRef.current.width > 0 && (
        <Renderer width={sizeRef.current.width} height={sizeRef.current.height} />
      )}
      <div className="absolute bottom-4 left-4 z-10">
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/40 group-hover:text-gold/70 transition-colors duration-500">
          {label}
        </span>
      </div>
    </div>
  );
}

import { useState } from "react";

export const artPieces = [
  { Renderer: FlowField, label: "Flow Field" },
  { Renderer: StrangeAttractor, label: "Lorenz Attractor" },
  { Renderer: MathRose, label: "Mathematical Rose" },
  { Renderer: InterferencePattern, label: "Wave Interference" },
  { Renderer: GradientMesh, label: "Gradient Mesh" },
  { Renderer: Voronoi, label: "Voronoi Tessellation" },
];

export { ArtCanvas };
