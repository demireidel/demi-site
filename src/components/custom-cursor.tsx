"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);

  useEffect(() => {
    // Only on desktop with pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      dot.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Add cursor:none to body
    document.body.style.cursor = "none";
    // Add cursor:none to all links and buttons
    const style = document.createElement("style");
    style.textContent = `
      @media (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = "";
      style.remove();
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-opacity duration-300 mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div className="h-[10px] w-[10px] rounded-full bg-gold" />
    </div>
  );
}
