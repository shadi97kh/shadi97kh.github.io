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

const HeroLive = ({ data, accent }) => {
  const [tick, setTick] = useState2(0);
  useEffect2(() => {
    const id = setInterval(() => setTick(t => (t + 1) % NOW_ITEMS.length), 3400);
    return () => clearInterval(id);
  }, []);
  const dateStr = (new Date()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toLowerCase();

  return (
    <div className="hero hero-live">
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
        <p className="lede">{data.bio}</p>

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
    </div>
  );
};

const HeroBig = ({ data, accent }) => (
  <div className="hero hero-big">
    <div className="big-stack">
      <h1 className="display huge">Shadi<br/><span style={{color: accent}}>Khodagholi</span><span className="huge-paren"> (Zahra)</span></h1>
      <p className="huge-line">A computer engineer who took a wrong turn into biology &mdash; and stayed. <span className="dim">PhD at UCF. Today: siRNA, saliency, and graph neural nets &mdash; with a growing pull toward neuroscience.</span></p>
      <p className="huge-bio">{data.bio}</p>
      <div className="huge-status mono">
        <span className="huge-status-dot" style={{background: accent, boxShadow: `0 0 0 4px ${accent}22`}} />
        <span><span style={{color: accent}}>open to collaboration</span> &mdash; especially anything where ML meets the brain. drop a line.</span>
      </div>
      <HeroLinks data={data} />
    </div>
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
    <div className="hero hero-cycler">
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
        <p className="lede">{data.bio}</p>
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
    </div>
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
