/* global React */
const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

// ────────────────────────────────────────────────────────────────────
// HERO variants — no portrait photo. Multi-pastel friendly.
// ────────────────────────────────────────────────────────────────────

// Personal, slightly playful blurbs for the "currently doing" panel.
const NOW_ITEMS = [
  "staring at saliency maps until they confess",
  "trying to convince a model that biology has rules",
  "tuning a GNN on a stubborn spatial-omics graph",
  "rewriting a sentence in the camera-ready for the 9th time",
  "looking up RNA secondary structure with too many tabs open",
];

// Render the bio paragraph with keyword highlighting. Each keyword gets one of
// the section palette colors so the page feels visually unified.
const BIO_PARTS = [
  { t: "Deep learning",                 c: "#d8b4fe" }, // purple
  { t: " for "                                          },
  { t: "biomedicine",                   c: "#86efac" }, // mint
  { t: ". Currently working on "                        },
  { t: "siRNA therapeutic design",      c: "#fda4af" }, // rose
  { t: ", "                                             },
  { t: "saliency-based interpretability", c: "#fcd34d" }, // amber
  { t: ", and "                                         },
  { t: "graph neural networks for spatial omics", c: "#93c5fd" }, // blue
  { t: ". I build methods that bridge ML with biological domain knowledge \u2014 " },
  { t: "biology-informed regularization", c: "#86efac" }, // mint
  { t: " for RNA therapeutics, and "                    },
  { t: "spatiotemporal models",         c: "#f0abfc" }, // fuchsia
  { t: " for real-time clinical applications."          },
];
const BioText = () => (
  <>
    {BIO_PARTS.map((p, i) => p.c
      ? <span key={i} className="bio-kw" style={{color: p.c}}>{p.t}</span>
      : <span key={i}>{p.t}</span>)}
  </>
);

const HeroLive = ({ data, accent }) => {
  const [tick, setTick] = useState2(0);
  useEffect2(() => {
    const id = setInterval(() => setTick(t => (t + 1) % NOW_ITEMS.length), 3400);
    return () => clearInterval(id);
  }, []);
  const dateStr = (new Date()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toLowerCase();

  return (
    <div className="hero hero-live with-sidecar">
      <div className="hero-stack">
        <div className="status-line">
          <span className="status-dot" style={{ background: accent }} />
          <span className="mono dim">orlando · {dateStr}</span>
        </div>
        <h1 className="display">
          Hi, I&rsquo;m <span className="name-accent" style={{ color: accent }}>Shadi</span> <span className="name-paren">(Zahra)</span> Khodagholi.
          <br/>
          <span className="display-soft">I poke at biology with neural nets,
          <br/>and at neural nets with biology.</span>
        </h1>
        <p className="lede"><BioText/></p>

        <div className="now-block">
          <div className="now-label mono">[ now ]</div>
          <div className="now-ticker">
            {NOW_ITEMS.map((t, i) => (
              <div key={i} className={"ticker-item " + (i === tick ? "on" : "")}>
                <span className="ticker-bullet" style={{ color: accent }}>▸</span> {t}
              </div>
            ))}
          </div>
        </div>

        <div className="research-areas inline">
          {data.research_areas.map((r, i) => (
            <div className="ra" key={i} style={{ "--ax-delay": (i * 0.08) + "s" }}>
              <span className="ra-tag" style={{ borderColor: accent, color: accent }}>{r.tag}</span>
              <span className="ra-note mono">{r.note}</span>
            </div>
          ))}
        </div>

        <HeroLinks data={data} />
      </div>
      <BioSidecar accent={accent} />
    </div>
  );
};

const HeroBig = ({ data, accent }) => (
  <div className="hero hero-big with-sidecar">
    <div className="big-stack">
      <h1 className="display huge">Shadi<br/><span style={{color: accent}}>Khodagholi</span><span className="huge-paren"> (Zahra)</span></h1>
      <p className="huge-line">A computer engineer who took a wrong turn into biology &mdash; and stayed. <span className="dim">PhD at UCF. Today: siRNA, saliency, and graph neural nets &mdash; with a growing pull toward neuroscience.</span></p>
      <p className="huge-bio"><BioText/></p>
      <div className="huge-status mono">
        <span className="huge-status-dot" style={{background: accent, boxShadow: `0 0 0 4px ${accent}22`}} />
        <span><span style={{color: accent}}>open to collaboration</span> &mdash; especially anything where ML meets the brain. drop a line.</span>
      </div>
      <HeroLinks data={data} />
    </div>
    <BioSidecar accent={accent} />
  </div>
);

// "Cycler" hero — replaces the old typewriter. The old "I work on…" line was
// too AI-pitch-y; this one reads like a human introducing herself, with the
// rotating part doing real work (showing range across CS / bio / neuro).
const HeroCycler = ({ data, accent }) => {
  const phrases = [
    { a: "I taught a model to read",       b: "RNA"               },
    { a: "I taught a model to read",       b: "ultrasound"        },
    { a: "I taught a model to read",       b: "spatial omics"     },
    { a: "Mostly I just want to know",     b: "why it predicts that" },
  ];
  const [i, setI] = useState2(0);
  useEffect2(() => {
    const id = setInterval(() => setI(x => (x + 1) % phrases.length), 3200);
    return () => clearInterval(id);
  }, []);
  const cur = phrases[i];
  return (
    <div className="hero hero-cycler with-sidecar">
      <div className="hero-stack">
        <div className="status-line">
          <span className="status-dot" style={{ background: accent }}/>
          <span className="mono dim">phd_student · ucf</span>
        </div>
        <h1 className="display cycler-head">
          <span className="cyc-line-a">{cur.a}</span>{" "}
          <span className="cyc-line-b" key={i} style={{color: accent}}>
            {cur.b}
          </span>
          <span className="cyc-period" style={{color: accent}}>.</span>
        </h1>
        <p className="lede"><BioText/></p>
        <div className="research-areas inline">
          {data.research_areas.map((r, idx) => (
            <div className="ra" key={idx} style={{ "--ax-delay": (idx * 0.08) + "s" }}>
              <span className="ra-tag" style={{ borderColor: accent, color: accent }}>{r.tag}</span>
              <span className="ra-note mono">{r.note}</span>
            </div>
          ))}
        </div>
        <HeroLinks data={data} />
      </div>
      <BioSidecar accent={accent} />
    </div>
  );
};

// BioSidecar — a small lab-notebook panel about Shadi. Rotating "currently"
// lines, an animated helix, and a heat-mapped "what I'm chasing" matrix.
const BioSidecar = ({ accent }) => {
  const [tick, setTick] = useState2(0);
  useEffect2(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 4), 2800);
    return () => clearInterval(id);
  }, []);

  // Personal "currently" cards — small first-person facts, rotating.
  // Each has a label, a value, a confidence bar, and a sequence-y motif so
  // the panel still reads as comp-bio.
  const CARDS = [
    { id: "now/01", label: "obsessing over",  val: "siRNA off-target effects",   seq: "GUUACGAUCGAUACG", conf: 0.78 },
    { id: "now/02", label: "reading",         val: "Krishnaswamy lab papers",    seq: "CGAACGGAUUACGAU", conf: 0.65 },
    { id: "now/03", label: "training",        val: "a stubborn GNN on omics",    seq: "AUGCAUGCGAUACGA", conf: 0.92 },
    { id: "now/04", label: "writing",         val: "the camera-ready, again",    seq: "UACGGAUACGAUCGA", conf: 0.55 },
  ];
  const cur = CARDS[tick];

  // 4×10 heatmap labeled with research themes — gives the panel a real signal
  // about what Shadi works on, not just decoration.
  const ROW_LABELS = ["rna  ", "graph", "neuro", "imag."];
  const heat = [];
  for (let r = 0; r < 4; r++) {
    const row = [];
    for (let c = 0; c < 10; c++) {
      const v = (Math.sin((r * 7 + c * 1.7) + tick * 0.6) + 1) / 2;
      row.push(v);
    }
    heat.push(row);
  }

  const N = 60;
  const pathA = Array.from({length: N}).map((_, i) => {
    const x = (i / (N-1)) * 200;
    const y = 45 + Math.sin((i / (N-1)) * Math.PI * 4) * 22;
    return (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2);
  }).join(" ");
  const pathB = Array.from({length: N}).map((_, i) => {
    const x = (i / (N-1)) * 200;
    const y = 45 - Math.sin((i / (N-1)) * Math.PI * 4) * 22;
    return (i === 0 ? "M" : "L") + x.toFixed(2) + "," + y.toFixed(2);
  }).join(" ");

  return (
    <aside className="bio-sidecar" aria-label="about shadi">
      <header className="bsc-head mono">
        <span className="bsc-corner" style={{borderColor: accent}}/>
        <span className="bsc-title" style={{color: accent}}>about/shadi.md</span>
        <span className="bsc-sub dim">live</span>
      </header>

      {/* quick stats line — facts that don't change */}
      <div className="bsc-facts mono">
        <div className="bsc-fact"><span className="dim">role</span><span>PhD · CS · UCF</span></div>
        <div className="bsc-fact"><span className="dim">field</span><span>ML · bio · neuro</span></div>
        <div className="bsc-fact"><span className="dim">papers</span><span style={{color: accent}}>2 · 1 in review</span></div>
        <div className="bsc-fact"><span className="dim">looking for</span><span style={{color: accent}}>collabs</span></div>
      </div>

      {/* DNA helix */}
      <div className="bsc-helix" aria-hidden="true">
        <svg viewBox="0 0 200 90" width="100%" height="90">
          <defs>
            <linearGradient id="strandA" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={accent} stopOpacity="0.9"/>
              <stop offset="1" stopColor={accent} stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          {Array.from({length: 15}).map((_, i) => {
            const x = (i / 14) * 200;
            const y1 = 45 + Math.sin((i / 14) * Math.PI * 4) * 22;
            const y2 = 45 - Math.sin((i / 14) * Math.PI * 4) * 22;
            return <line key={i} x1={x} y1={y1} x2={x} y2={y2} stroke="rgba(255,255,255,0.13)" strokeWidth="1"/>;
          })}
          <path d={pathA} fill="none" stroke="url(#strandA)" strokeWidth="2"/>
          <path d={pathB} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4"/>
          {Array.from({length: 15}).map((_, i) => {
            const x = (i / 14) * 200;
            const y = 45 + Math.sin((i / 14) * Math.PI * 4) * 22;
            return <circle key={i} cx={x} cy={y} r="1.7" fill={accent}/>;
          })}
        </svg>
      </div>

      {/* rotating "currently" card */}
      <div className="bsc-read">
        <div className="bsc-read-head mono">
          <span className="dim">{cur.label}</span>
          <span style={{color: accent}}>&gt; {cur.id}</span>
        </div>
        <div className="bsc-now mono" key={cur.id}>{cur.val}</div>
        <div className="bsc-seq mono">
          {cur.seq.split("").map((b, i) => (
            <span key={cur.id + "-" + i} className={"bsc-base bsc-base-" + b.toLowerCase()}>{b}</span>
          ))}
        </div>
        <div className="bsc-score mono">
          <span className="dim">confidence</span>
          <span className="bsc-score-bar">
            <span className="bsc-score-fill" style={{ width: (cur.conf * 100) + "%", background: accent }}/>
          </span>
          <span style={{color: accent}}>{cur.conf.toFixed(2)}</span>
        </div>
      </div>

      {/* heatmap labeled with research themes */}
      <div className="bsc-heat">
        <div className="bsc-heat-head mono dim">research signal · last 12 weeks</div>
        <div className="bsc-heat-rows">
          {heat.map((row, r) => (
            <div key={r} className="bsc-heat-row">
              <span className="bsc-heat-label mono dim">{ROW_LABELS[r]}</span>
              <div className="bsc-heat-cells">
                {row.map((v, c) => (
                  <span key={c} className="bsc-cell"
                        style={{ background: "color-mix(in oklab, " + accent + " " + Math.round(v*88) + "%, transparent)" }}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bsc-foot mono dim">
        <span>built from caffeine &amp; curiosity</span>
        <span className="bsc-blink" style={{background: accent}}/>
      </footer>
    </aside>
  );
};

const HeroLinks = ({ data }) => (
  <div className="hero-links">
    <a className="link-chip" href={"mailto:" + data.links.email}><Icon name="mail"/><span className="mono">{data.links.email}</span></a>
    <a className="link-chip" href={data.links.cv}><Icon name="file"/><span className="mono">cv.pdf</span></a>
    <a className="link-chip" href={data.links.github} target="_blank" rel="noreferrer"><Icon name="github"/><span className="mono">github</span></a>
    <a className="link-chip" href={data.links.scholar} target="_blank" rel="noreferrer"><Icon name="scholar"/><span className="mono">scholar</span></a>
    <a className="link-chip" href={data.links.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin"/><span className="mono">linkedin</span></a>
    <a className="link-chip" href={data.links.orcid} target="_blank" rel="noreferrer"><Icon name="orcid"/><span className="mono">orcid</span></a>
  </div>
);

const Hero = ({ variant, data, accent }) => {
  if (variant === "big") return <HeroBig data={data} accent={accent}/>;
  // accept old "typer" id — render as cycler
  if (variant === "typer" || variant === "cycler") return <HeroCycler data={data} accent={accent}/>;
  return <HeroLive data={data} accent={accent}/>;
};

window.Hero = Hero;
