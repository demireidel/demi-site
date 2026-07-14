"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Current", href: "/#current", section: "Current work" },
  { label: "Arc", href: "/#arc", section: "The arc" },
  { label: "Research", href: "/#research", section: "Research" },
  { label: "Record", href: "/#record", section: "Selected record" },
  { label: "Contact", href: "/#contact", section: "Contact" },
] as const;

export function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Initial conditions");

  useEffect(() => {
    document.documentElement.dataset.js = "true";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealNodes.forEach((node) => node.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12%", threshold: 0.08 },
      );

      revealNodes.forEach((node) => revealObserver.observe(node));

      return () => revealObserver.disconnect();
    }
  }, [pathname]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const label = visible?.target.getAttribute("data-section");
        if (label) setActive(label);
      },
      { rootMargin: "-38% 0px -50%", threshold: [0, 0.1, 0.35, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const updateProgress = () => {
      const root = document.documentElement;
      const distance = Math.max(1, root.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      root.style.setProperty("--site-progress", progress.toFixed(4));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="site-mark" href="/" aria-label="Demian Reidel, home">
          <span>DR</span>
          <span aria-hidden="true">/</span>
          <span>26</span>
        </a>

        <div className="site-state" aria-live="polite">
          <span className="site-state-dot" aria-hidden="true" />
          <span>{active}</span>
        </div>

        <button
          className="index-button"
          type="button"
          aria-expanded={open}
          aria-controls="site-index"
          onClick={() => setOpen((value) => !value)}
        >
          <span>{open ? "Close" : "Index"}</span>
          <span className="index-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div className="site-progress" aria-hidden="true">
        <span />
      </div>

      <aside
        id="site-index"
        className={`site-index ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="site-index-noise" aria-hidden="true" />
        <div className="site-index-inner">
          <p className="micro-label">Navigate the system</p>
          <nav aria-label="Primary navigation">
            <ol>
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                  <small>{item.section}</small>
                </li>
              ))}
              <li>
                <span>06</span>
                <a
                  href="/research/minimum-viable-scale"
                  onClick={() => setOpen(false)}
                >
                  MVS
                </a>
                <small>Interactive paper</small>
              </li>
            </ol>
          </nav>

          <div className="site-index-meta">
            <a href="mailto:demian@demianreidel.com">demian@demianreidel.com</a>
            <p>Science / Capital / State / Infrastructure</p>
          </div>
        </div>
      </aside>
    </>
  );
}
