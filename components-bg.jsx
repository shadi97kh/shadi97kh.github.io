/* global React */

// Tiny tiled SVG background — rendered as a CSS background-image data URI
// on the body via an injected style. Each tile is 240x240 with a few small
// pastel motifs scattered. Repeats subtly across the whole viewport.
const BioBackground = () => {
  const tile = `
    <svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'>
      <g opacity='0.35'>
        <!-- helix -->
        <g transform='translate(20,40)'>
          <path d='M0 12 Q12 0 24 12 T48 12 T72 12' stroke='%23f5b8c8' stroke-width='0.9' fill='none'/>
          <path d='M0 12 Q12 24 24 12 T48 12 T72 12' stroke='%23aac6e5' stroke-width='0.9' fill='none'/>
          <line x1='12' y1='6'  x2='12' y2='18' stroke='%23cdb8e6' stroke-width='0.6'/>
          <line x1='36' y1='6'  x2='36' y2='18' stroke='%23a9d8c5' stroke-width='0.6'/>
          <line x1='60' y1='6'  x2='60' y2='18' stroke='%23f1dca0' stroke-width='0.6'/>
        </g>
        <!-- spike -->
        <g transform='translate(140,90)'>
          <path d='M0 8 L10 8 L12 0 L14 12 L16 8 L28 8 L30 2 L32 10 L34 8 L48 8'
                stroke='%23bfd9a8' stroke-width='0.8' fill='none'/>
        </g>
        <!-- mini network -->
        <g transform='translate(40,150)'>
          <line x1='2' y1='6'  x2='18' y2='2'  stroke='%23f5b8c8' stroke-width='0.5'/>
          <line x1='18' y1='2' x2='34' y2='10' stroke='%23aac6e5' stroke-width='0.5'/>
          <line x1='34' y1='10' x2='52' y2='4' stroke='%23a9d8c5' stroke-width='0.5'/>
          <line x1='18' y1='2' x2='28' y2='18' stroke='%23cdb8e6' stroke-width='0.5'/>
          <circle cx='2'  cy='6'  r='1.6' fill='%23f5b8c8'/>
          <circle cx='18' cy='2'  r='1.6' fill='%23aac6e5'/>
          <circle cx='34' cy='10' r='1.6' fill='%23a9d8c5'/>
          <circle cx='52' cy='4'  r='1.6' fill='%23cdb8e6'/>
          <circle cx='28' cy='18' r='1.6' fill='%23f1dca0'/>
        </g>
        <!-- tiny base letters -->
        <text x='180' y='40'  font-family='monospace' font-size='8' fill='%23f5c5a3'>A</text>
        <text x='200' y='30'  font-family='monospace' font-size='8' fill='%23a9d8c5'>U</text>
        <text x='190' y='200' font-family='monospace' font-size='8' fill='%23cdb8e6'>G</text>
        <text x='10'  y='220' font-family='monospace' font-size='8' fill='%23f5b8c8'>C</text>
      </g>
    </svg>
  `.replace(/\n/g, '').replace(/\s+/g, ' ');

  // soft pastel wash dots — three blurred circles fixed to viewport corners
  return (
    <>
      <div className="bio-bg" aria-hidden="true"
           style={{ backgroundImage: `url("data:image/svg+xml;utf8,${tile}")` }} />
      <div className="bio-wash" aria-hidden="true" />
    </>
  );
};

window.BioBackground = BioBackground;
