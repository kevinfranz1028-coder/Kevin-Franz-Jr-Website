/* global React */
const { useState: useStateT, useRef: useRefT, useEffect: useEffectT } = React;

/* =====================================================
   INTERACTIVE TIMELINE — works for both directions
   Variant A (editorial): cream background, serif
   Variant B (broadcast): dark background, sans
   ===================================================== */
function Timeline({ variant = 'a' }) {
  const items = window.KFJR.TIMELINE;
  const [active, setActive] = useStateT(items.length - 1);
  const trackRef = useRefT(null);

  const isA = variant === 'a';
  const cls = `tl-${variant}`;
  const card = items[active];

  // Auto-scroll active card into view (within track)
  useEffectT(() => {
    if (!trackRef.current) return;
    const el = trackRef.current.querySelector(`[data-tl-idx="${active}"]`);
    if (el) {
      const tr = trackRef.current;
      const elLeft = el.offsetLeft;
      const target = elLeft - tr.clientWidth / 2 + el.clientWidth / 2;
      tr.scrollTo({ left: target, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <section className={cls}>
      <div className="tl-head">
        <div className="tl-eyebrow">
          {isA ? '04 — Journey' : variant === 'c' ? '04 — Career arc' : variant === 'e' ? 'Section 04 — The Journey' : variant === 'f' ? 'Issue 04 / Career Timeline' : variant === 'g' ? 'SECTION_04 // career.log' : variant === 'h' ? '04 / Career' : 'TIMELINE / 2019 — PRESENT'}
        </div>
        <h2 className="tl-title">
          {isA ? <>Six years on the <em>floor.</em></>
            : variant === 'c' ? <>Six seasons, <em>one game.</em></>
            : variant === 'd' ? <>The road <em>so far.</em></>
            : variant === 'e' ? <>The road <em>so far.</em></>
            : variant === 'f' ? <>Six Years <em>On The Floor</em></>
            : variant === 'g' ? <>career.<em>log</em></>
            : variant === 'h' ? <>Six years <em>on the floor.</em></>
            : <>The Road <span className="b-stroke-inline">So Far</span></>}
        </h2>
        <p className="tl-sub">
          {isA
            ? 'From rec league to the 3SSB circuit — every season has shaped who I am as a player and a teammate.'
            : 'Every season. Every team. Every step on the path to college basketball.'}
        </p>
      </div>

      {/* Year scrubber */}
      <div className="tl-scrubber">
        <div className="tl-rail" />
        <div className="tl-rail-progress" style={{ width: `${(active / (items.length - 1)) * 100}%` }} />
        <div className="tl-dots">
          {items.map((it, i) => (
            <button
              key={i}
              className={`tl-dot ${i === active ? 'is-active' : ''} ${i < active ? 'is-passed' : ''}`}
              onClick={() => setActive(i)}
              aria-label={it.year}
            >
              <span className="tl-dot-mark" />
              <span className="tl-dot-year">{it.year}</span>
              <span className="tl-dot-grade">{it.grade.split('•')[0].split('(')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active card display */}
      <div className="tl-stage">
        <div className="tl-stage-image">
          <img key={card.image} src={card.image} alt={card.year} />
          {card.current && <div className="tl-current-tag">CURRENT</div>}
          <div className="tl-image-meta">
            <span>{card.season}</span>
            <span>•</span>
            <span>{card.team}</span>
          </div>
        </div>
        <div className="tl-stage-info">
          <div className="tl-info-year">{card.year}</div>
          <div className="tl-info-grade">{card.grade}</div>
          <p className="tl-info-summary">{card.summary}</p>

          <div className="tl-info-bullets">
            <div className="tl-info-bullets-label">Highlights</div>
            <ul>
              {card.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>

          {card.stats && (
            <div className="tl-info-stats">
              <div className="tl-info-stats-label">Season averages</div>
              <div className="tl-info-stats-grid">
                {Object.entries(card.stats).map(([k, v]) => (
                  <div key={k} className="tl-info-stat">
                    <span className="tl-info-stat-val">{v}</span>
                    <span className="tl-info-stat-lbl">{k.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="tl-nav">
            <button
              className="tl-nav-btn"
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
            >← Prev</button>
            <span className="tl-nav-count">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              className="tl-nav-btn"
              onClick={() => setActive(Math.min(items.length - 1, active + 1))}
              disabled={active === items.length - 1}
            >Next →</button>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Timeline = Timeline;
