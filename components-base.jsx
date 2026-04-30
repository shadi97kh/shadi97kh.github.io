/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ────────────────────────────────────────────────────────────────────
// Tiny inline icon set (mono, lab-notebook style)
// ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16 }) => {
  const stroke = "currentColor";
  const sw = 1.6;
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "mail":     return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case "github":   return <svg {...common}><path d="M9 19c-4 1-4-2-6-2m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.7 4.7 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.2s-1-.3-3.4 1.2a11.7 11.7 0 0 0-6 0C6.7 3.7 5.7 4 5.7 4a4.4 4.4 0 0 0-.1 3.2A4.7 4.7 0 0 0 4.3 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22"/></svg>;
    case "linkedin": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v8M8 7v.01M12 18v-5a2 2 0 0 1 4 0v5M12 13v5"/></svg>;
    case "scholar":  return <svg {...common}><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11v4a5 5 0 0 0 10 0v-4"/></svg>;
    case "orcid":    return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9 9v8M9 7v.01M13 9h2a4 4 0 1 1 0 8h-2V9z"/></svg>;
    case "file":     return <svg {...common}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></svg>;
    case "arrow":    return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "ext":      return <svg {...common}><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>;
    case "book":     return <svg {...common}><path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5z"/><path d="M19 18H6a2 2 0 0 0-2 2"/></svg>;
    case "film":     return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 7h4M3 12h18M3 17h4M17 7h4M17 17h4"/></svg>;
    case "pin":      return <svg {...common}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case "dot":      return <svg width={size} height={size} viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>;
    case "chev":     return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    default:         return null;
  }
};

// ────────────────────────────────────────────────────────────────────
// PaperFigure — inline SVG illustrations for each paper
// ────────────────────────────────────────────────────────────────────
const PaperFigure = ({ kind, accent }) => {
  if (kind === "bioprior") {
    // siRNA sequence with saliency heatmap
    const bases = "GUCAGGUACUGCUACAGGCAUUGCAUACUGCAGAUCG".split("");
    return (
      <svg viewBox="0 0 600 220" className="paper-fig" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sal" x1="0" x2="1">
            <stop offset="0%"  stopColor="var(--bg-2)"/>
            <stop offset="100%" stopColor={accent}/>
          </linearGradient>
        </defs>
        {/* faithfulness curve */}
        <g opacity="0.55">
          <path d="M30 160 Q 110 120 180 130 T 330 90 T 480 70 T 570 60"
                stroke={accent} strokeWidth="1.6" fill="none" strokeDasharray="2 3"/>
          <path d="M30 175 Q 110 165 180 162 T 330 152 T 480 145 T 570 140"
                stroke="var(--ink-3)" strokeWidth="1" fill="none"/>
        </g>
        {/* saliency bars */}
        <g>
          {bases.map((b, i) => {
            const w = 14, gap = 2;
            const x = 30 + i * (w + gap);
            const sal = Math.abs(Math.sin(i * 0.7) * Math.cos(i * 0.31)) * 0.9 + 0.05;
            const h = sal * 70;
            return (
              <g key={i}>
                <rect x={x} y={110 - h} width={w} height={h} fill="url(#sal)" opacity={0.4 + sal * 0.5}/>
                <text x={x + w / 2} y={130} textAnchor="middle"
                      fontFamily="var(--mono)" fontSize="10" fill="var(--ink-2)">{b}</text>
              </g>
            );
          })}
        </g>
        {/* axis */}
        <line x1="30" y1="111" x2="570" y2="111" stroke="var(--ink-4)" strokeWidth="0.8"/>
        <text x="30" y="200" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)">position →</text>
        <text x="30" y="40"  fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)">|∂ŷ / ∂x|</text>
        <text x="540" y="60" fontFamily="var(--mono)" fontSize="10" fill={accent}>BioPrior</text>
        <text x="540" y="148" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)">vanilla</text>
      </svg>
    );
  }
  if (kind === "ultra-air") {
    // ultrasound landmark tracking — a grayscale wedge with tracked points + uncertainty halos
    const pts = [
      { x: 220, y: 120, r: 6,  u: 4,  label: "trachea" },
      { x: 280, y: 150, r: 5,  u: 9,  label: "cricoid" },
      { x: 350, y: 130, r: 6,  u: 5,  label: "thyroid" },
      { x: 410, y: 165, r: 5,  u: 12, label: "esophagus" },
    ];
    return (
      <svg viewBox="0 0 600 220" className="paper-fig" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="uswedge" cx="50%" cy="0%" r="100%">
            <stop offset="0%"  stopColor="#d6d6d6"/>
            <stop offset="40%" stopColor="#5e5e5e"/>
            <stop offset="100%" stopColor="#0e0e0e"/>
          </radialGradient>
        </defs>
        {/* ultrasound wedge */}
        <path d="M300 10 L120 210 L480 210 Z" fill="url(#uswedge)"/>
        {/* speckle */}
        <g opacity="0.35">
          {Array.from({ length: 80 }).map((_, i) => {
            const x = 130 + Math.random() * 340;
            const y = 30 + Math.random() * 175;
            return <circle key={i} cx={x} cy={y} r={0.6 + Math.random() * 1.2} fill="#cfcfcf"/>;
          })}
        </g>
        {/* anatomy curves */}
        <g stroke="#cfcfcf" strokeWidth="0.8" fill="none" opacity="0.55">
          <path d="M180 140 Q 260 110 340 130 T 460 170"/>
          <path d="M170 175 Q 260 155 340 175 T 470 195"/>
        </g>
        {/* tracked landmarks */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.u + 6} fill={accent} opacity="0.12"/>
            <circle cx={p.x} cy={p.y} r={p.u}     fill={accent} opacity="0.22"/>
            <circle cx={p.x} cy={p.y} r={p.r}     fill={accent}/>
            <line x1={p.x} y1={p.y} x2={p.x + 30} y2={p.y - 22} stroke={accent} strokeWidth="0.8" opacity="0.7"/>
            <text x={p.x + 32} y={p.y - 22} fontFamily="var(--mono)" fontSize="10" fill={accent}>{p.label}</text>
            <text x={p.x + 32} y={p.y - 10} fontFamily="var(--mono)" fontSize="9"  fill="var(--ink-3)">σ={(p.u/14).toFixed(2)}</text>
          </g>
        ))}
        <text x="20" y="208" fontFamily="var(--mono)" fontSize="10" fill="var(--ink-3)">frame 0214 · 30 fps</text>
      </svg>
    );
  }
  return null;
};

window.Icon = Icon;
window.PaperFigure = PaperFigure;
