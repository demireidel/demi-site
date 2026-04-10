"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#roles", label: "Roles" },
  { href: "#research", label: "Research" },
  { href: "#public-service", label: "Service" },
  { href: "#media", label: "Media" },
  { href: "#art", label: "Art" },
  { href: "#kitchen", label: "Kitchen" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/80 backdrop-blur-md border-b border-rule/50"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 font-sans">
        <a
          href="#"
          className="font-display text-2xl tracking-wide text-ivory no-underline hover:text-gold transition-colors magnetic"
        >
          DR
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-muted hover:text-ivory transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-[1.5px] w-6 bg-ivory transition-transform duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-ivory transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-ivory transition-transform duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 bg-obsidian/98 backdrop-blur-md ${
          open ? "max-h-[500px] border-b border-rule" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-sans font-medium uppercase tracking-widest text-muted hover:text-ivory transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
