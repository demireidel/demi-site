const scales = [
  { number: "01", name: "Atom", title: "Model the system.", body: "Physics at Instituto Balseiro established the first discipline: begin with structure, constraints, and measurable behavior." },
  { number: "02", name: "Network", title: "Find order in complexity.", body: "Early work on stochastic processes and random neural networks studied how aggregate behavior emerges from interacting parts." },
  { number: "03", name: "Market", title: "Act under uncertainty.", body: "Emerging markets and global macro investing turned models into decisions with immediate financial consequences." },
  { number: "04", name: "Institution", title: "Design the rules.", body: "At a central bank, the problem changes from predicting behavior to shaping the framework in which behavior occurs." },
  { number: "05", name: "State", title: "Coordinate capacity.", body: "Public strategy tests whether institutions can convert technical possibility into durable national capability." },
  { number: "06", name: "Compute", title: "Build for the next regime.", body: "AI infrastructure returns the question to energy, industrial systems, capital, and the physical foundations of intelligence." },
];

const work = [
  { index: "01", status: "CURRENT · FOUNDING STAGE", title: "Industrial assurance for nuclear deployment", body: "A system for making repeat reactor deployment more legible to customers, suppliers, regulators, and capital.", meta: "SIDERIAN · 2026—", href: "https://siderian.energy/", link: "Visit Siderian" },
  { index: "02", status: "WORKING PAPER · SUBMITTED TO ECONOMETRICA", title: "Minimum viable scale", body: "Research on the welfare frontier between extinction and growth, and a first-passage Bellman-barrier certificate for all-optimizer regime selection.", meta: "RESEARCH · AUGUST 2026", href: "/public/PaperJMDR", link: "Explore the paper" },
  { index: "03", status: "COMPLETED TENURE · 2015—2018", title: "Monetary policy and institutional normalization", body: "Work as a director and Second Vice President of Argentina's central bank, including monetary policy and international financial coordination.", meta: "BCRA · G20", href: "https://www.argentina.gob.ar/normativa/nacional/decreto-89-2015-256841/texto", link: "Primary record" },
  { index: "04", status: "HISTORICAL · PRIVATE MARKETS", title: "Capital allocation under uncertainty", body: "From emerging-market research to co-founding QFR, where quantitative structure met judgment, risk, and the discipline of consequences.", meta: "J.P. MORGAN · GOLDMAN SACHS · QFR", href: "https://www.hks.harvard.edu/centers/mrcbg/students/sg/reidel.2019.spring", link: "Institutional biography" },
];

const ideas = [
  { label: "SCALE / ECONOMICS", title: "When does a system become viable?", body: "Increasing returns can turn scale into destiny. Below a threshold, contraction compounds. Above it, growth can reinforce itself." },
  { label: "ENERGY / COMPUTE", title: "Intelligence has a physical foundation.", body: "AI may feel weightless. Its infrastructure is not: energy, land, cooling, supply chains, institutions, and capital determine what can exist." },
  { label: "INSTITUTIONS / UNCERTAINTY", title: "Rules alter the systems they govern.", body: "In markets and public institutions, expectations respond to the framework itself. Credibility is not decoration; it is part of the mechanism." },
];

const timeline = [
  ["1990s", "Instituto Balseiro", "Physics and complex systems"],
  ["2000s", "Chicago · Harvard", "Financial mathematics and economics"],
  ["1990s—2000s", "J.P. Morgan · Goldman Sachs", "Emerging markets"],
  ["2007—", "QFR", "Global macro and capital allocation"],
  ["2015—2018", "Central Bank of Argentina", "Monetary policy and institutional rules"],
  ["2019—2020", "Harvard Kennedy School", "Inflation-targeting research and teaching"],
  ["2024—2026", "Public strategy · Nuclear sector", "State capacity, energy, and AI infrastructure"],
  ["2026—", "Siderian · Research", "Industrial assurance and minimum viable scale"],
];

const media = [
  { image: "/media-iaea.jpg", eyebrow: "IAEA · ADDRESS · 2025", title: "Artificial intelligence and nuclear energy", href: "https://www.youtube.com/watch?v=Xxds2Y4ZZXw" },
  { image: "/media-tedx.jpg", eyebrow: "TEDx RÍO DE LA PLATA · 2017", title: "El fin del efectivo", href: "https://www.youtube.com/watch?v=5LJJoOHX_nY" },
  { image: "/media-kaku.jpg", eyebrow: "IAEF · CONVERSATION · 2025", title: "A conversation with Michio Kaku", href: "https://www.youtube.com/watch?v=zVhw3QRUiYM" },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Demian Reidel, home">DR<span className="signal-dot" /></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a><a href="#ideas">Ideas</a><a href="#archive">Archive</a><a href="#about">About</a><a href="#press">Press</a>
        </nav>
        <a className="header-current" href="#now"><span>Current</span><span className="live-dot" aria-hidden="true" /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-kicker reveal reveal-1"><span>Demian Reidel</span><span>Buenos Aires · New York</span></div>
          <div className="hero-statement reveal reveal-2">
            <p className="identity">Physicist. Economist. Builder.</p>
            <h1>I work where science, capital, and institutions meet—<em>and where systems either reach scale or disappear.</em></h1>
          </div>
          <div className="hero-bottom reveal reveal-3">
            <p>A career across theoretical physics, global markets, central banking, public strategy, nuclear energy, and AI infrastructure.</p>
            <div className="hero-actions"><a className="primary-link" href="#work">Explore the work <Arrow /></a><a className="text-link" href="#ideas">Read the ideas</a></div>
          </div>
        </div>
        <figure className="hero-portrait reveal reveal-2">
          <img src="/demian-reidel-portrait.jpg" alt="Portrait of Demian Reidel" />
          <div className="portrait-overlay" />
          <figcaption><span>01 / Portrait</span><span>Public record</span></figcaption>
        </figure>
        <div className="scale-rail" aria-label="Fields across Demian Reidel's work">{scales.map((scale) => <span key={scale.name}>{scale.name}</span>)}</div>
      </section>

      <section className="now-section dark-section" id="now">
        <div className="section-index"><span>01</span><span>Now</span></div>
        <div className="now-intro"><p className="eyebrow">Present-tense work</p><h2>Building the conditions for repeat nuclear deployment.</h2></div>
        <div className="now-body">
          <p className="now-lead">At Siderian, I am developing an independent industrial-assurance system for repeat Western AP1000 deployment.</p>
          <p>The work begins with a practical question: how can qualified demand, a stable reference package, industrial capacity, evidence, and capital be made to compound rather than fragment?</p>
          <div className="status-row"><span className="status-chip"><i /> Founding stage</span><span>Updated July 2026</span></div>
          <a className="light-link" href="https://siderian.energy/" target="_blank" rel="noreferrer">Visit Siderian <Arrow /></a>
        </div>
        <div className="now-diagram" aria-hidden="true"><span className="axis axis-x" /><span className="axis axis-y" /><span className="threshold-line" /><span className="diagram-point point-a" /><span className="diagram-point point-b" /><span className="diagram-label label-a">possibility</span><span className="diagram-label label-b">viability</span><span className="diagram-label label-c">scale</span></div>
      </section>

      <section className="scales-section" id="about">
        <div className="section-index dark-index"><span>02</span><span>Across scales</span></div>
        <div className="scales-heading"><p className="eyebrow">The governing idea</p><h2>The objects change.<br /><em>The questions recur.</em></h2><p className="scales-intro">How does order emerge? What happens under uncertainty? Which rules alter behavior? What must be coordinated? When does scale become self-sustaining?</p></div>
        <div className="scales-grid">{scales.map((scale) => <article className="scale-card" key={scale.name}><div className="scale-meta"><span>{scale.number}</span><span>{scale.name}</span></div><h3>{scale.title}</h3><p>{scale.body}</p><span className="scale-node" aria-hidden="true" /></article>)}</div>
        <p className="scales-close">Different systems. The same threshold: the point at which possibility becomes capacity.</p>
      </section>

      <section className="work-section dark-section" id="work">
        <div className="section-index"><span>03</span><span>Selected work</span></div>
        <div className="work-heading"><p className="eyebrow">Case files, not trophies</p><h2>Consequential work, with its status made explicit.</h2></div>
        <div className="work-grid">{work.map((item) => <article className="work-card" key={item.index}><div className="work-card-top"><span className="work-index">{item.index}</span><span className="work-status">{item.status}</span></div><h3>{item.title}</h3><p>{item.body}</p><div className="work-card-bottom"><span>{item.meta}</span><a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.link} <Arrow /></a></div></article>)}</div>
        <div className="evidence-note"><span>Evidence protocol</span><p>Every case separates personal role, institutional action, present status, delivered outcome, and unfinished work.</p><div className="evidence-tags" aria-label="Project evidence states"><span>Proposed</span><span>Exploratory</span><span>Contracted</span><span>Financed</span><span>Operating</span></div></div>
      </section>

      <section className="ideas-section" id="ideas">
        <div className="section-index dark-index"><span>04</span><span>Ideas</span></div>
        <div className="ideas-heading"><p className="eyebrow">Proof of mind</p><h2>Questions that connect the work across time.</h2></div>
        <div className="ideas-list">{ideas.map((idea, index) => <article className="idea-row" key={idea.title}><span className="idea-number">0{index + 1}</span><div><p className="idea-label">{idea.label}</p><h3>{idea.title}</h3></div><p className="idea-body">{idea.body}</p><span className="idea-arrow" aria-hidden="true">↗</span></article>)}</div>
        <div className="working-paper"><div><span className="status-chip paper-chip"><i /> Working paper</span><p>August 2026 · Submitted to Econometrica</p></div><h3>Minimum Viable Scale and First-Passage Bellman Barriers</h3><p>A formal characterization of the welfare frontier between extinction and growth, with an exact certificate for all-optimizer regime selection.</p><a className="paper-state" href="/public/PaperJMDR">Read &amp; download ↗</a></div>
      </section>

      <section className="archive-section dark-section" id="archive">
        <div className="section-index"><span>05</span><span>Trajectory</span></div>
        <div className="archive-heading"><p className="eyebrow">A career across systems</p><h2>The transitions are the story.</h2></div>
        <div className="timeline">{timeline.map(([date, institution, description], index) => <article className="timeline-row" key={`${date}-${institution}`}><span className="timeline-count">{String(index + 1).padStart(2, "0")}</span><time>{date}</time><h3>{institution}</h3><p>{description}</p></article>)}</div>
        <p className="archive-note">The complete archive will connect exact titles and dates to primary documents, research, talks, and corrections.</p>
      </section>

      <section className="record-section">
        <div className="section-index dark-index"><span>06</span><span>Public record</span></div>
        <div className="record-heading"><p className="eyebrow">Selected appearances</p><h2>Ideas, in their original setting.</h2></div>
        <div className="media-grid">{media.map((item) => <a className="media-card" href={item.href} target="_blank" rel="noreferrer" key={item.href}><div className="media-image"><img src={item.image} alt="" /><span className="play">Play ↗</span></div><p>{item.eyebrow}</p><h3>{item.title}</h3></a>)}</div>
      </section>

      <section className="closing-section" id="press">
        <div className="closing-grid" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
        <p className="eyebrow">The working proposition</p>
        <h2>The future is not delivered by possibility alone.<em>It has to become viable.</em></h2>
        <div className="closing-links"><a href="#archive">Explore the record <Arrow /></a><a href="https://x.com/dreidel1" target="_blank" rel="noreferrer">X <Arrow /></a><a href="https://www.instagram.com/demireidel/" target="_blank" rel="noreferrer">Instagram <Arrow /></a></div>
      </section>

      <footer><a className="footer-name" href="#top">Demian Reidel</a><p>Physicist · Economist · Builder<br />Buenos Aires · New York</p><div className="footer-status"><span className="live-dot" aria-hidden="true" /><span>Record last reviewed July 2026</span></div><a className="back-top" href="#top">Back to top ↑</a></footer>
    </main>
  );
}
