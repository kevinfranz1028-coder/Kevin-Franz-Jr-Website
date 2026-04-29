/* global React */
const { useState: useStateB } = React;

/* =====================================================
   DIRECTION B — BROADCAST
   ===================================================== */

function BNav({ active = 'home' }) {
  const links = [
    ['home', 'Home'], ['basketball', 'Basketball'], ['academics', 'Academics'],
    ['projects', 'Projects'], ['character', 'Character'], ['media', 'Media'], ['contact', 'Contact'],
  ];
  return (
    <nav className="b-nav">
      <div style={{display:'flex', alignItems:'center'}}>
        <div className="b-nav-brand">
          <div className="b-nav-mark">30</div>
          <span>FRANZ JR</span>
        </div>
        <div className="b-nav-live">2025–26 SEASON</div>
      </div>
      <div className="b-nav-links">
        {links.map(([k, label]) => (
          <a key={k} href={`#${k}`} className={active === k ? 'active' : ''}>{label}</a>
        ))}
      </div>
      <a href="#contact" className="b-nav-cta">Recruiting</a>
    </nav>
  );
}

function BFooter() {
  const p = window.KFJR.PLAYER;
  return (
    <footer className="b-footer">
      <div className="b-footer-top">
        <div>
          <div className="b-footer-display">FRANZ JR<br/><span style={{color:'var(--b-green-bright)'}}>'28.</span></div>
          <p style={{fontSize:14, lineHeight:1.6, color:'var(--b-mute)', maxWidth:340, marginTop:20}}>
            6'1" combo guard out of Blue Valley Southwest. Combining college basketball ambitions with a path toward atmospheric science.
          </p>
        </div>
        <div>
          <h4>Site</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#basketball">Basketball</a></li>
            <li><a href="#academics">Academics</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#character">Character</a></li>
          </ul>
        </div>
        <div>
          <h4>Recruiting</h4>
          <ul>
            <li><a href="#">Prephoops</a></li>
            <li><a href="#">NCSA Sports</a></li>
            <li><a href="#">Sports Passports</a></li>
            <li><a href="#">@kfranzjr2028</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${p.email}`}>{p.email}</a></li>
            <li><a href={`tel:${p.phone}`}>{p.phone}</a></li>
            <li>{p.location}</li>
          </ul>
        </div>
      </div>
      <div className="b-footer-bottom">
        <span>© 2026 KEVIN FRANZ JR</span>
        <span>BVSW · #30 · COMBO GUARD · CLASS OF 2028</span>
      </div>
    </footer>
  );
}

function BHomePage() {
  const p = window.KFJR.PLAYER;
  return (
    <div className="b-root">
      <BNav active="home" />

      {/* Hero */}
      <section className="b-hero">
        <div className="b-hero-jersey-num">30</div>
        <div className="b-hero-grid">
          <div className="b-hero-left">
            <div>
              <div className="b-hero-eyebrow">
                <span>CLASS OF 2028</span>
                <span>COMBO GUARD</span>
                <span>OVERLAND PARK, KS</span>
              </div>
              <h1>
                <span>Kevin Franz</span>
                <span className="b-stroke">Junior.</span>
              </h1>
              <p className="b-hero-sub">
                6'1" combo guard at Blue Valley Southwest. Pace, playmaking, and full-court defense — chasing college basketball and a degree in atmospheric science.
              </p>
              <div className="b-hero-cta-row">
                <a href="#basketball" className="b-btn-primary">View Profile →</a>
                <a href="#contact" className="b-btn-ghost">Contact</a>
              </div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:16, marginTop:32, fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>
              <span style={{color:'var(--b-green-bright)'}}>● BVSW JV</span>
              <span>14 GS / 16 GP</span>
              <span>1ST IN RPG</span>
              <span>2ND IN AST/TO</span>
            </div>
          </div>
          <div className="b-hero-image">
            <img src="src/images/player/medium_Copy_of_618_A3075_2_Enhanced_NR_0a0a68195a.jpg" alt="Kevin Franz Jr." />
          </div>
        </div>
        <div className="b-hero-stat-strip">
          {[['HT','6\'1"'],['WT','185'],['POS','G'],['#','30'],['GPA','3.85'],['CLASS','\'28']].map(([l, v]) => (
            <div key={l} className="b-stat-cell">
              <div className="b-stat-cell-label">{l}</div>
              <div className="b-stat-cell-value">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 PILLARS</span>
          <h2 className="b-section-title">Three<br/>at once.</h2>
        </div>
        <a href="#about" className="b-section-cta">VIEW ALL →</a>
      </div>
      <section className="b-pillars">
        <div className="b-pillar">
          <div className="b-pillar-tag">/ BASKETBALL</div>
          <h3>Combo<br/>guard.</h3>
          <p>#30 — Pace, decisions, on-ball defense. JV 2025–26: 5.4 PPG · 4.1 RPG (1st) · 2.6 APG · 2.05 AST/TO.</p>
          <a href="#basketball" className="b-pillar-link">Full profile</a>
        </div>
        <div className="b-pillar">
          <div className="b-pillar-tag">/ ACADEMICS</div>
          <h3>3.85 GPA.</h3>
          <p>Heavy load in math and science at Blue Valley Southwest. Plan to study meteorology / atmospheric science.</p>
          <a href="#academics" className="b-pillar-link">Coursework</a>
        </div>
        <div className="b-pillar">
          <div className="b-pillar-tag">/ CHARACTER</div>
          <h3>Off the<br/>floor.</h3>
          <p>Weather nerd, film-room junkie, and mentor to younger players. Leadership, family, and showing up.</p>
          <a href="#character" className="b-pillar-link">More</a>
        </div>
      </section>

      {/* About — full bleed image w/ text overlay panel */}
      <section style={{position:'relative', height:600, overflow:'hidden', borderBottom:'1px solid var(--b-line)'}}>
        <img src="src/images/banner/large_Copy_of_618_A3237_2_Enhanced_NR_8707ac32b4.jpg" alt="Kevin in action" style={{width:'100%', height:'100%', objectFit:'cover'}} />
        <div style={{position:'absolute', inset:0, background:'linear-gradient(90deg, var(--b-bg) 0%, rgba(11,13,16,0.7) 40%, transparent 70%)'}} />
        <div style={{position:'absolute', top:0, left:0, bottom:0, width:560, padding:'72px 48px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>/02 PROFILE</div>
          <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:56, lineHeight:0.95, letterSpacing:'-0.03em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
            A guard who<br/>plays the<br/><span className="b-stroke-inline" style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>right way.</span>
          </h2>
          <p style={{fontSize:15, lineHeight:1.65, color:'var(--b-mute)', marginTop:24, maxWidth:440}}>
            On the floor I'm a pace-pusher and playmaker — creating for teammates, defending full court, making the right read under pressure. Off the floor I'm just as serious about the classroom, with weather and atmospheric science driving my long-term goals.
          </p>
          <div style={{borderTop:'1px solid var(--b-line)', paddingTop:20, marginTop:32, fontFamily:'JetBrains Mono, monospace', fontSize:12, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--b-text)'}}>
            "Help my team win. Earn the chance to play college ball."
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline variant="b" />

      {/* CTA / Contact */}
      <section style={{padding:'80px 48px', background:'var(--b-bg)', borderBottom:'1px solid var(--b-line)'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center'}}>
          <div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>/05 CONTACT</div>
            <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:64, lineHeight:0.95, textTransform:'uppercase', letterSpacing:'-0.03em', margin:0}}>
              For<br/>coaches.
            </h2>
            <p style={{fontSize:16, color:'var(--b-mute)', marginTop:24, maxWidth:440}}>
              Highlights, stats, and full recruiting profiles live on the Basketball page. For direct inquiries, reach the family below.
            </p>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <a href={`mailto:${p.email}`} style={{display:'flex', justifyContent:'space-between', padding:'24px 28px', background:'var(--b-green)', color:'white', textDecoration:'none', alignItems:'center', clipPath:'polygon(2% 0, 100% 0, 98% 100%, 0% 100%)'}}>
              <div>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', opacity:0.7, marginBottom:6}}>EMAIL →</div>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:22}}>{p.email}</div>
              </div>
            </a>
            <a href={`tel:${p.phone}`} style={{display:'flex', justifyContent:'space-between', padding:'24px 28px', background:'var(--b-bg-2)', border:'1px solid var(--b-line)', color:'var(--b-text)', textDecoration:'none', alignItems:'center'}}>
              <div>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--b-mute)', marginBottom:6}}>PHONE →</div>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:22}}>{p.phone}</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  );
}

function BBasketballPage() {
  const p = window.KFJR.PLAYER;
  const stats = window.KFJR.STATS_2526;
  const sched = window.KFJR.SCHEDULE;
  const high = window.KFJR.HIGHLIGHTS;
  const [filter, setFilter] = useStateB('all');
  const filteredSched = sched.filter(g => filter === 'all' ? true : filter === 'home' ? g.loc === 'Home' : g.loc === 'Away');
  const wins = sched.filter(g => g.result.startsWith('W')).length;
  const losses = sched.filter(g => g.result.startsWith('L')).length;

  return (
    <div className="b-root">
      <BNav active="basketball" />

      {/* HERO — Pannable cinematic strip + Player Card */}
      <section className="b-bball-hero">
        <PanningHero />
        <div className="b-bball-hero-overlay">
          <div className="b-bball-hero-text">
            <div className="b-bball-hero-eyebrow">
              <span style={{color:'var(--b-green-bright)'}}>●</span>
              BASKETBALL · 2025–26
            </div>
            <h1 className="b-bball-hero-title">
              <span>The</span>
              <span>Game.</span>
            </h1>
            <p className="b-bball-hero-sub">
              Stats, schedule, film, and recruiting profiles.<br/>Drag to pan.
            </p>
          </div>
          <div className="b-bball-hero-card">
            <PlayerCard />
          </div>
        </div>
      </section>

      {/* Stats — broadcast scoreboard */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 NUMBERS</span>
          <h2 className="b-section-title">2025–26.</h2>
        </div>
        <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>
          BVSW JV · {sched.filter(g=>!g.upcoming).length} GP · <span style={{color:'var(--b-green-bright)'}}>{wins}W</span>–{losses}L
        </span>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {stats.map((s) => (
          <div key={s.label} style={{padding:'28px', background:'var(--b-bg)', minHeight:160, display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--b-mute)'}}>{s.label}</div>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.1em', color:'var(--b-green-bright)', background:'rgba(34,197,94,0.1)', padding:'2px 8px'}}>{s.rank}</div>
            </div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:56, lineHeight:1, letterSpacing:'-0.04em', color:'var(--b-text)'}}>{s.value}</div>
          </div>
        ))}
      </section>

      {/* Timeline */}
      <Timeline variant="b" />

      {/* Schedule */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/03 SCHEDULE</span>
          <h2 className="b-section-title">Season.</h2>
        </div>
        <div style={{display:'flex', gap:1, background:'var(--b-line)'}}>
          {[['all','ALL'],['home','HOME'],['away','AWAY']].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:11, letterSpacing:'0.1em',
              padding:'8px 18px', cursor:'pointer', border:'none',
              background: filter === k ? 'var(--b-green-bright)' : 'var(--b-bg-2)',
              color: filter === k ? 'var(--b-bg)' : 'var(--b-text)',
            }}>{l}</button>
          ))}
        </div>
      </div>
      <section style={{padding:'0', borderBottom:'1px solid var(--b-line)'}}>
        <div style={{display:'grid', gridTemplateColumns:'90px 1fr 90px 110px 130px', padding:'14px 48px', borderBottom:'1px solid var(--b-line)', fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--b-mute)', background:'var(--b-bg-2)'}}>
          <div>DATE</div><div>OPPONENT</div><div>LOC</div><div>STATUS</div><div>RESULT</div>
        </div>
        {filteredSched.map((g, i) => (
          <div key={i} style={{display:'grid', gridTemplateColumns:'90px 1fr 90px 110px 130px', padding:'18px 48px', borderBottom: i < filteredSched.length - 1 ? '1px solid var(--b-line)' : 'none', alignItems:'center', background: g.upcoming ? 'transparent' : 'var(--b-bg)'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:13, color:'var(--b-mute)', letterSpacing:'0.04em'}}>{g.date}</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:700, fontSize:16, color:'var(--b-text)'}}>{g.opp}</div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>{g.loc}</div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color: g.upcoming ? 'var(--b-amber)' : 'var(--b-green-bright)'}}>{g.upcoming ? '○ UPCOMING' : '● FINAL'}</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:15, color: g.result.startsWith('W') ? 'var(--b-green-bright)' : g.result.startsWith('L') ? 'var(--b-red)' : 'var(--b-mute)', letterSpacing:'0.04em'}}>{g.result}</div>
          </div>
        ))}
      </section>

      {/* Highlights */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/04 FILM</span>
          <h2 className="b-section-title">Highlights.</h2>
        </div>
      </div>
      <section style={{padding:'40px 48px', borderBottom:'1px solid var(--b-line)', display:'grid', gridTemplateColumns:'1fr 1fr', gap:24}}>
        {high.map(h => (
          <div key={h.videoId} style={{background:'var(--b-bg-2)', border:'1px solid var(--b-line)'}}>
            <div style={{aspectRatio:'16/9', background:'var(--b-bg-3)', position:'relative', overflow:'hidden'}}>
              <img src={`https://i.ytimg.com/vi/${h.videoId}/hqdefault.jpg`} alt={h.title} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              <div style={{position:'absolute', inset:0, background:'linear-gradient(0deg, rgba(11,13,16,0.6), transparent 60%)'}} />
              <div style={{position:'absolute', inset:0, display:'grid', placeItems:'center'}}>
                <div style={{width:80, height:80, background:'var(--b-green-bright)', display:'grid', placeItems:'center', clipPath:'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)'}}>
                  <div style={{width:0, height:0, borderTop:'14px solid transparent', borderBottom:'14px solid transparent', borderLeft:'20px solid var(--b-bg)', marginLeft:6}} />
                </div>
              </div>
              <div style={{position:'absolute', top:14, left:14, fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', background:'rgba(11,13,16,0.7)', backdropFilter:'blur(8px)', color:'var(--b-text)', padding:'6px 10px', borderLeft:'2px solid var(--b-green-bright)'}}>HIGHLIGHT REEL</div>
            </div>
            <div style={{padding:'24px 28px'}}>
              <h3 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:22, margin:'0 0 8px', textTransform:'uppercase', letterSpacing:'-0.02em'}}>{h.title}</h3>
              <p style={{fontSize:14, color:'var(--b-mute)', margin:0}}>{h.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Recruiting */}
      <section style={{padding:'80px 48px', background:'var(--b-bg-2)'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start'}}>
          <div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>/05 RECRUITING</div>
            <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:64, lineHeight:0.95, textTransform:'uppercase', letterSpacing:'-0.03em', margin:0}}>
              For coaches<br/>& <span style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>scouts.</span>
            </h2>
            <p style={{fontSize:16, color:'var(--b-mute)', marginTop:24, maxWidth:420}}>
              Find Kevin's profile across major recruiting platforms. For direct inquiries, contact the family.
            </p>
            <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:32}}>
              <a href={`mailto:${p.email}`} style={{color:'var(--b-text)', fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:20, textDecoration:'none', borderBottom:'1px solid var(--b-line)', paddingBottom:10}}>{p.email}</a>
              <a href={`tel:${p.phone}`} style={{color:'var(--b-text)', fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:20, textDecoration:'none', borderBottom:'1px solid var(--b-line)', paddingBottom:10}}>{p.phone}</a>
            </div>
          </div>
          <div style={{display:'grid', gap:1, background:'var(--b-line)', border:'1px solid var(--b-line)'}}>
            {[
              ['PREPHOOPS', 'Player profile and rankings'],
              ['NCSA SPORTS', 'Complete recruiting profile'],
              ['SPORTS PASSPORTS', 'Tournament history and stats'],
              ['INSTAGRAM', '@kfranzjr2028'],
            ].map(([n, d]) => (
              <a key={n} href="#" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 28px', background:'var(--b-bg)', color:'var(--b-text)', textDecoration:'none'}}>
                <div>
                  <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:18, textTransform:'uppercase', letterSpacing:'0.02em'}}>{n}</div>
                  <div style={{fontSize:13, color:'var(--b-mute)', marginTop:4}}>{d}</div>
                </div>
                <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', color:'var(--b-green-bright)'}}>VIEW →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  );
}

window.BHomePage = BHomePage;
window.BBasketballPage = BBasketballPage;
