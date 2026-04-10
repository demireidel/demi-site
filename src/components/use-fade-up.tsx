"use client";

import { useEffect } from "react";

export function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    document
      .querySelectorAll(".fade-up, .clip-reveal, .gold-line")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
