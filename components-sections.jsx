/* global React */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

// ────────────────────────────────────────────────────────────────────
// SectionHead — lab-notebook style heading with auto-numbering
// ────────────────────────────────────────────────────────────────────
const SectionHead = ({ num, title, subtitle, accent }) => (
  <div className="section-head">
    <div className="section-num mono" style={{ color: accent }}>§{num}</div>
    <div className="section-title-wrap">
      <h2 className="section-title">{title}</h2>
      {subtitle && <div className="section-sub mono dim">{subtitle}</div>}
    </div>
    <div className="section-rule" />
  </div>
);

// ────────────────────────────────────────────────────────────────────
// PaperCard — tabbed (TL;DR / abstract / figure / links)
// ────────────────────────────────────────────────────────────────────
const PaperCard = ({ paper, accent }) => {
  const [tab, setTab] = useStateS("tldr");
  const tabs = [
    { id: "tldr",     label: "TL;DR" },
    { id: "abstract", label: "abstract" },
    { id: "figure",   label: "figure" },
    { id: "links",    label: "links" },
  ];
  return (
    <article className="paper-card">
      <header className="paper-head">
        <div className="paper-meta mono">
          <span className="venue" style={{ color: accent, borderColor: accent }}>{paper.venue}</span>
          <span className="dim">·</span>
          <span className="dim">{paper.year}</span>
        </div>
        <h3 className="paper-title">{paper.title}</h3>
        {paper.subtitle && <div className="paper-subtitle mono dim">{paper.subtitle}</div>}
        <div className="paper-authors">
          {paper.authors.map((a, i) => (
            <span key={i} className={"author " + (a.startsWith("Zahra") ? "self" : "")}
                  style={a.startsWith("Zahra") ? { color: accent } : undefined}>
              {a}{i < paper.authors.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </header>
      <div className="paper-tabs" role="tablist">
        {tabs.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={"paper-tab mono " + (tab === t.id ? "active" : "")}
            style={tab === t.id ? { borderBottomColor: accent, color: accent } : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="paper-body">
        {tab === "tldr" && <p className="tldr">{paper.tldr}</p>}
        {tab === "abstract" && <p className="abstract">{paper.abstract}</p>}
        {tab === "figure" && (
          <div className="figure-wrap">
            <PaperFigure kind={paper.figure} accent={accent} />
            <div className="figure-cap mono dim">
              fig. — {paper.figure === "bioprior"
                ? "Per-position saliency over an siRNA antisense strand. BioPrior (dashed) tracks the seed region; vanilla saliency drifts."
                : "Live ultrasound frame with predicted neck landmarks and per-class uncertainty σ."}
            </div>
          </div>
        )}
        {tab === "links" && (
          <ul className="link-list">
            {paper.links.map((l, i) => (
              <li key={i}>
                <a href={l.href} target="_blank" rel="noreferrer" className="link-row">
                  <span className="mono link-label" style={{ color: accent }}>{l.label}</span>
                  <span className="mono link-href dim">{l.href}</span>
                  <Icon name="ext" size={14} />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

// ────────────────────────────────────────────────────────────────────
// Education
// ────────────────────────────────────────────────────────────────────
const Education = ({ items, accent }) => (
  <div className="edu-list">
    {items.map((e, i) => (
      <div className="edu-row" key={i}>
        <div className="edu-logo-wrap">
          <img src={e.logo} alt={e.school} className="edu-logo" />
        </div>
        <div className="edu-body">
          <div className="edu-degree">{e.degree}</div>
          <div className="edu-school mono">{e.school} <span className="dim">· {e.where}</span></div>
        </div>
        <div className="edu-side mono dim">
          <div>{e.span}</div>
          <div>{e.detail}</div>
        </div>
      </div>
    ))}
  </div>
);

// ────────────────────────────────────────────────────────────────────
// Experience — vertical timeline
// ────────────────────────────────────────────────────────────────────
const Experience = ({ items, accent }) => (
  <div className="exp-list">
    <div className="exp-rail" style={{ background: `linear-gradient(180deg, ${accent}55, transparent)` }} />
    {items.map((e, i) => (
      <div className="exp-row" key={i}>
        <div className="exp-marker" style={{ borderColor: accent, background: "var(--bg-1)" }}>
          <div className="exp-dot" style={{ background: accent }} />
        </div>
        <div className="exp-card">
          <div className="exp-card-head">
            <img src={e.logo} alt={e.org} className="exp-logo" />
            <div>
              <div className="exp-role">{e.role}</div>
              <div className="exp-org mono dim">@ {e.org}</div>
            </div>
            <div className="exp-span mono dim">{e.span}</div>
          </div>
          <p className="exp-detail">{e.detail}</p>
        </div>
      </div>
    ))}
  </div>
);

// ────────────────────────────────────────────────────────────────────
// Projects
// ────────────────────────────────────────────────────────────────────
const Projects = ({ items, accent }) => (
  <div className="proj-grid">
    {items.map((p, i) => (
      <a className="proj-card" key={i} href={p.link || "#"} target={p.link ? "_blank" : undefined} rel="noreferrer">
        <div className="proj-num mono" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</div>
        <div className="proj-title">{p.title}</div>
        <div className="proj-span mono dim">{p.span}</div>
        <p className="proj-detail">{p.detail}</p>
        <div className="proj-stack">
          {p.stack.map((s, j) => (
            <span key={j} className="stack-chip mono">{s}</span>
          ))}
        </div>
        <div className="proj-foot mono">
          {p.link
            ? <span style={{ color: accent }}>open repo <Icon name="ext" size={12}/></span>
            : <span className="dim">internal · no public repo</span>}
        </div>
      </a>
    ))}
  </div>
);

// ────────────────────────────────────────────────────────────────────
// Off-screen — a bookshelf (CSS book spines) + a film reel
// ────────────────────────────────────────────────────────────────────
const Offscreen = ({ data, accent }) => {
  const { books, watching, quote } = data.reading;
  return (
    <div className="off-wrap">
      <p className="off-intro">
        A few favorites out of many &mdash; my full shelves live on{" "}
        <a href={data.links.goodreads} target="_blank" rel="noreferrer" style={{color: accent}}>Goodreads</a>{" "}
        and{" "}
        <a href={data.links.letterboxd} target="_blank" rel="noreferrer" style={{color: accent}}>Letterboxd</a>.
        If we share a favorite (or you want to argue about one), I&rsquo;d love to hear it.
      </p>
      <div className="off-grid">
        {/* Bookshelf */}
        <div className="off-pane">
          <div className="off-pane-head mono">
            <span className="off-pane-num" style={{color: accent}}>§ a</span>
            <span className="off-pane-title">on the shelf</span>
            <span className="dim off-pane-meta">{books.length} spines</span>
          </div>
          <div className="bookshelf">
            <div className="shelf-board" />
            <div className="spines">
              {books.map((b, i) => {
                // small per-book variation so it feels like a real shelf
                const heights = [200, 290, 290, 220, 250, 290];
                const widths  = [44, 38, 46, 40, 44, 38];
                const tilts   = [0, 0, 0, -1.5, 0, 0];
                return (
                  <div key={i} className="spine"
                       style={{
                         background: b.color,
                         height: heights[i % heights.length],
                         width: widths[i % widths.length],
                         transform: `rotate(${tilts[i % tilts.length]}deg)`,
                       }}>
                    <div className="spine-text">
                      <span className="spine-title">{b.title}</span>
                      <span className="spine-author">{b.author}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <a href={data.links.goodreads} target="_blank" rel="noreferrer"
             className="off-pane-link mono" style={{color: accent}}>
            goodreads &rarr;
          </a>
        </div>

        {/* Film reel */}
        <div className="off-pane">
          <div className="off-pane-head mono">
            <span className="off-pane-num" style={{color: accent}}>§ b</span>
            <span className="off-pane-title">on the screen</span>
            <span className="dim off-pane-meta">{watching.length} entries</span>
          </div>
          <div className="filmreel">
            <div className="reel-strip reel-strip-top">
              {Array.from({length: 14}).map((_, i) => <span key={i} className="reel-perf" />)}
            </div>
            <div className="film-cards">
              {watching.map((f, i) => (
                <div key={i} className="film-card">
                  <div className="film-num mono dim">{String(i + 1).padStart(2, "0")}</div>
                  <div className="film-title">{f.title}</div>
                  <div className="film-meta mono">
                    <span>{f.director}</span>
                    <span className="dim"> &middot; {f.year}</span>
                    <span className="film-kind" style={{borderColor: accent, color: accent}}>{f.kind}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="reel-strip reel-strip-bot">
              {Array.from({length: 14}).map((_, i) => <span key={i} className="reel-perf" />)}
            </div>
          </div>
          <a href={data.links.letterboxd} target="_blank" rel="noreferrer"
             className="off-pane-link mono" style={{color: accent}}>
            letterboxd &rarr;
          </a>
        </div>
      </div>

      {/* hand-written marginalia */}
      <div className="off-margin">
        <span className="off-margin-mark" style={{color: accent}}>&#10078;</span>
        <span className="off-margin-text">{quote}</span>
      </div>
    </div>
  );
};

window.SectionHead = SectionHead;
window.PaperCard = PaperCard;
window.Education = Education;
window.Experience = Experience;
window.Projects = Projects;
window.Offscreen = Offscreen;
