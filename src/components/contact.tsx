const links = [
  {
    label: "Email",
    href: "mailto:demian.reidel@gmail.com",
    display: "demian.reidel@gmail.com",
  },
  {
    label: "X",
    href: "https://x.com/dreidel1",
    display: "@dreidel1",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/demianreidel",
    display: "demianreidel",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/demireidel",
    display: "@demireidel",
  },
  {
    label: "Columbia Business School",
    href: "https://business.columbia.edu/",
    display: "Faculty Profile",
  },
  {
    label: "Harvard Kennedy School",
    href: "https://www.hks.harvard.edu/centers/mrcbg",
    display: "Mossavar-Rahmani Center",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-[120px] max-md:py-20 px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="fade-up">
          <h2 className="font-display text-5xl max-md:text-4xl text-ivory mb-2">
            CONTACT
          </h2>
          <div className="h-[1px] w-16 bg-gold mb-12" />
        </div>

        <div className="fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[780px]">
          {links.map((l) => (
            <div key={l.label}>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-muted mb-1">
                {l.label}
              </p>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel={l.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="font-serif text-base text-gold hover:text-ivory transition-colors"
              >
                {l.display}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
