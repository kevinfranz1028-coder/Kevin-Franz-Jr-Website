/* global React */
const { useState: useStateIA, useRef: useRefIA, useEffect: useEffectIA } = React;

/* =====================================================
   INTERACTIVE COMPONENTS — shared across pages
   ===================================================== */

/* PanningHero — drag-to-pan strip of action photos */
function PanningHero() {
  const [offset, setOffset] = useStateIA(0);
  const [isDragging, setDragging] = useStateIA(false);
  const dragRef = useRefIA({ startX: 0, startOffset: 0 });
  const containerRef = useRefIA(null);

  const photos = [
    'src/images/banner/large_Copy_of_655_A7902_Enhanced_NR_742d9cd3fb.jpg',
    'src/images/banner/large_Copy_of_618_A3075_2_Enhanced_NR_0a0a68195a.jpg',
    'src/images/banner/large_Copy_of_618_A3237_2_Enhanced_NR_8707ac32b4.jpg',
    'src/images/banner/large_Copy_of_655_A7945_Enhanced_NR_38a7db1e08.jpg',
    'src/images/banner/large_Kevin_Jr_Layup_Black_and_White_Game_be9d381555.JPG',
    'src/images/banner/large_Kevin_Jr_Blocked_Shot_Black_and_White_Game_0761755000.JPG',
  ];

  // Auto-pan when not dragging
  useEffectIA(() => {
    if (isDragging) return;
    const id = setInterval(() => {
      setOffset(o => {
        const next = o - 0.4;
        // wrap around: each photo is 1/photos.length of total
        return next < -100 ? 0 : next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [isDragging]);

  function onDown(e) {
    setDragging(true);
    dragRef.current = {
      startX: e.clientX || (e.touches && e.touches[0].clientX) || 0,
      startOffset: offset,
    };
  }
  function onMove(e) {
    if (!isDragging || !containerRef.current) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const dx = x - dragRef.current.startX;
    const w = containerRef.current.offsetWidth;
    const newOffset = dragRef.current.startOffset + (dx / w) * 100;
    setOffset(Math.max(-100, Math.min(0, newOffset)));
  }
  function onUp() { setDragging(false); }

  return (
    <div
      ref={containerRef}
      className={`b-pan ${isDragging ? 'is-dragging' : ''}`}
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      <div
        className="b-pan-track"
        style={{ transform: `translateX(${offset}%)`, width: `${photos.length * 50}%` }}
      >
        {photos.map((src, i) => (
          <div key={i} className="b-pan-frame">
            <img src={src} alt="" draggable="false" />
            <div className="b-pan-frame-num">{String(i + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</div>
          </div>
        ))}
      </div>
      <div className="b-pan-grad"></div>
      <div className="b-pan-hint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M8 12L4 8M4 8L8 4M4 8H20M16 12L20 16M20 16L16 20M20 16H4" stroke="currentColor" strokeWidth="2"/>
        </svg>
        DRAG TO PAN
      </div>
    </div>
  );
}

/* RevealPanel — click to expose */
function RevealPanel({ label, value, hint, children }) {
  const [open, setOpen] = useStateIA(false);
  return (
    <div className={`b-reveal ${open ? 'is-open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="b-reveal-front">
        <div className="b-reveal-label">{label}</div>
        <div className="b-reveal-value">{value}</div>
        <div className="b-reveal-hint">{hint || 'CLICK TO EXPAND'} →</div>
      </div>
      <div className="b-reveal-back">
        {children}
        <div className="b-reveal-close">← CLOSE</div>
      </div>
    </div>
  );
}

/* WeatherWidget — interactive forecast slider for the meteorology angle */
function WeatherWidget() {
  const [hour, setHour] = useStateIA(14);
  const conditions = [
    { h: 0, t: 41, c: 'CLEAR', icon: '○' },
    { h: 6, t: 38, c: 'CLEAR', icon: '○' },
    { h: 12, t: 56, c: 'PARTLY CLOUDY', icon: '◐' },
    { h: 14, t: 62, c: 'STORMS BUILDING', icon: '◉' },
    { h: 17, t: 71, c: 'SEVERE WATCH', icon: '⚠' },
    { h: 20, t: 64, c: 'TSTORM PASSING', icon: '◑' },
  ];
  const current = conditions.reduce((acc, c) => Math.abs(c.h - hour) < Math.abs(acc.h - hour) ? c : acc, conditions[0]);

  return (
    <div className="b-weather">
      <div className="b-weather-head">
        <div>
          <div className="b-weather-tag">LIVE FORECAST · OVERLAND PARK, KS</div>
          <div className="b-weather-time">{String(hour).padStart(2, '0')}:00 CT</div>
        </div>
        <div className="b-weather-icon">{current.icon}</div>
      </div>
      <div className="b-weather-temp">
        {current.t}<span>°F</span>
      </div>
      <div className="b-weather-cond">{current.c}</div>
      <div className="b-weather-slider">
        <input type="range" min="0" max="23" value={hour} onChange={e => setHour(Number(e.target.value))} />
        <div className="b-weather-ticks">
          <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
        </div>
      </div>
      <div className="b-weather-note">
        <span style={{color:'var(--b-amber)'}}>⚠</span> Severe storms expected 17:00–20:00 — perfect for storm-chasing data collection.
      </div>
    </div>
  );
}

/* CourseExpand — click course to expand details */
function CourseRow({ course, grade, teacher, notes }) {
  const [open, setOpen] = useStateIA(false);
  return (
    <div className={`b-course ${open ? 'is-open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="b-course-row">
        <div className="b-course-name">{course}</div>
        <div className="b-course-grade">{grade}</div>
        <div className="b-course-toggle">{open ? '−' : '+'}</div>
      </div>
      {open && (
        <div className="b-course-detail">
          <div><span>TEACHER</span> {teacher}</div>
          <div className="b-course-notes">{notes}</div>
        </div>
      )}
    </div>
  );
}

/* GalleryItem — hover to pan inside the frame */
function PanGallery({ src, title, description, link }) {
  const [coords, setCoords] = useStateIA({ x: 50, y: 50 });
  const [hovered, setHovered] = useStateIA(false);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }

  return (
    <a
      href={link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="b-gal-item"
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="b-gal-img"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: hovered ? `${coords.x}% ${coords.y}%` : 'center 30%',
          backgroundSize: hovered ? '170%' : '110%',
        }}
      />
      <div className="b-gal-meta">
        <div>
          <div className="b-gal-title">{title}</div>
          <div className="b-gal-desc">{description}</div>
        </div>
        <div className="b-gal-arrow">→</div>
      </div>
      <div className="b-gal-pan-hint">{hovered ? '✦ MOVE TO PAN' : '✦ HOVER'}</div>
    </a>
  );
}

/* ValueCard — flip card for character values */
function ValueCard({ num, title, description, detail }) {
  const [flipped, setFlipped] = useStateIA(false);
  return (
    <div className={`b-vcard ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="b-vcard-face b-vcard-front">
        <div className="b-vcard-num">{num}</div>
        <h3 className="b-vcard-title">{title}</h3>
        <p className="b-vcard-desc">{description}</p>
        <div className="b-vcard-flip-hint">CLICK FOR STORY ↻</div>
      </div>
      <div className="b-vcard-face b-vcard-back">
        <div className="b-vcard-back-tag">/ STORY</div>
        <p className="b-vcard-back-text">{detail}</p>
        <div className="b-vcard-flip-hint">↺ BACK</div>
      </div>
    </div>
  );
}

window.PanningHero = PanningHero;
window.RevealPanel = RevealPanel;
window.WeatherWidget = WeatherWidget;
window.CourseRow = CourseRow;
window.PanGallery = PanGallery;
window.ValueCard = ValueCard;
