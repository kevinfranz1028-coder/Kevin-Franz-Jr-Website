/* global React */
const { useState: useStateBPages2 } = React;

/* =====================================================
   DIRECTION B — MEDIA & CONTACT
   ===================================================== */

/* ---------------- MEDIA / PHOTOGRAPHY ---------------- */
function BMediaPage() {
  const [activeReel, setActiveReel] = useStateBPages2(0);
  const reels = [
    { tag: 'BVSW BASKETBALL', shots: 142, vid: 4, where: 'Sidelines · Game action · Locker room' },
    { tag: 'COLLEGE FOOTBALL', shots: 87, vid: 2, where: "Children's Mercy Park — Pitt State vs NWMSU" },
    { tag: 'YOUTH HOOPS', shots: 64, vid: 1, where: "Morse's Lady Sharpshooters" },
    { tag: 'RECRUITING SHOOTS', shots: 38, vid: 0, where: 'BVSW kicker Rhys Poggio' },
  ];

  const gallery = [
    { title: 'Game of the Year #1', description: 'SMS @ #2 Olathe N — won by 1 point. Sideline + game-action. Hypest game of the year.', src: 'src/images/banner/large_Copy_of_618_A3237_2_Enhanced_NR_8707ac32b4.jpg', link: 'https://www.instagram.com/p/DUUnO6KFcn4/' },
    { title: 'College Football Experience', description: "Pitt State vs Northwest Missouri State at Children's Mercy Park", src: 'src/images/banner/large_Copy_of_655_A7902_Enhanced_NR_742d9cd3fb.jpg', link: 'https://www.instagram.com/p/DRGhD85kX-D/' },
    { title: 'Recruiting Photos', description: 'BVSW standout kicker Rhys Poggio', src: 'src/images/banner/large_Kevin_Jr_Layup_Black_and_White_Game_be9d381555.JPG', link: 'https://www.instagram.com/p/DT1OV26kX_X/' },
    { title: 'Local Youth Basketball', description: "Morse's Lady Sharpshooters — future BVSW hoopers in action", src: 'src/images/banner/large_Copy_of_655_A7945_Enhanced_NR_38a7db1e08.jpg', link: 'https://www.instagram.com/p/DUOySXPEbC7/' },
    { title: 'Rivalry Post BVSW vs BVNW', description: 'January 2026 — full rivalry coverage', src: 'src/images/banner/large_Copy_of_618_A3075_2_Enhanced_NR_0a0a68195a.jpg', link: 'https://www.instagram.com/p/DUcWRSfFbue/' },
    { title: 'College Hoops · MNU', description: 'Snapped some great pics of an MNU game this season', src: 'src/images/banner/large_Kevin_Jr_Blocked_Shot_Black_and_White_Game_0761755000.JPG', link: 'https://www.instagram.com/p/DUMv8G0keqv/' },
  ];

  return (
    <div className="b-root">
      <BNav active="media" />

      {/* Hero — viewfinder */}
      <section style={{position:'relative', minHeight:640, background:'var(--b-bg)', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0}}>
          <img src="src/images/banner/large_Copy_of_655_A7945_Enhanced_NR_38a7db1e08.jpg" alt="" style={{width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(0.3) contrast(1.1)'}} />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(11,13,16,0.4) 0%, rgba(11,13,16,0.85) 70%, var(--b-bg) 100%)'}} />
        </div>
        {/* Viewfinder corners */}
        <div style={{position:'absolute', inset:'40px 56px', pointerEvents:'none', zIndex:3}}>
          {['top:0;left:0;border-top:2px solid var(--b-green-bright);border-left:2px solid var(--b-green-bright)',
            'top:0;right:0;border-top:2px solid var(--b-green-bright);border-right:2px solid var(--b-green-bright)',
            'bottom:0;left:0;border-bottom:2px solid var(--b-green-bright);border-left:2px solid var(--b-green-bright)',
            'bottom:0;right:0;border-bottom:2px solid var(--b-green-bright);border-right:2px solid var(--b-green-bright)']
            .map((s, i) => <div key={i} style={{position:'absolute', width:32, height:32, ...Object.fromEntries(s.split(';').map(p => p.split(':')).map(([k,v]) => [k.replace(/-([a-z])/g, (_,c)=>c.toUpperCase()), v]))}} />)}
        </div>
        {/* Top bar */}
        <div style={{position:'absolute', top:24, left:56, right:56, zIndex:4, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={{display:'flex', alignItems:'center', gap:16, fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase'}}>
            <span>● REC</span><span>1/250</span><span>F2.8</span><span>ISO 1600</span>
          </div>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-text)', textTransform:'uppercase'}}>
            WOLF BYTE MEDIA · BVSW
          </div>
        </div>
        {/* Center caption */}
        <div style={{position:'absolute', bottom:56, left:56, right:56, zIndex:4}}>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>● PHOTOGRAPHY & MEDIA</div>
          <h1 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:160, lineHeight:0.85, letterSpacing:'-0.045em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
            Through the<br/><span style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>lens.</span>
          </h1>
          <p style={{fontFamily:'Inter, sans-serif', fontSize:18, lineHeight:1.6, color:'var(--b-mute)', marginTop:24, maxWidth:520}}>
            Credentialed for Sporting KC. Sidelines for BVSW. @Shots_By_Franz on Instagram.
          </p>
        </div>
      </section>

      {/* Reel selector */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 REELS</span>
          <h2 className="b-section-title">Coverage.</h2>
        </div>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {reels.map((r, i) => (
          <div key={i} onClick={() => setActiveReel(i)} style={{
            background: activeReel === i ? 'var(--b-bg-2)' : 'var(--b-bg)',
            padding:'32px 28px', cursor:'pointer',
            borderTop: activeReel === i ? '2px solid var(--b-green-bright)' : '2px solid transparent',
            transition:'all 0.3s ease',
          }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20}}>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color: activeReel === i ? 'var(--b-green-bright)' : 'var(--b-mute)', textTransform:'uppercase'}}>{r.tag}</div>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, color:'var(--b-mute)'}}>{i === activeReel ? '●' : '○'}</div>
            </div>
            <div style={{display:'flex', alignItems:'baseline', gap:16}}>
              <div>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:48, lineHeight:1, color:'var(--b-text)', letterSpacing:'-0.03em'}}>{r.shots}</div>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:9, color:'var(--b-mute)', letterSpacing:'0.12em', marginTop:4}}>SHOTS</div>
              </div>
              <div>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:36, lineHeight:1, color:'var(--b-green-bright)', letterSpacing:'-0.03em'}}>{r.vid}</div>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:9, color:'var(--b-mute)', letterSpacing:'0.12em', marginTop:4}}>VIDEOS</div>
              </div>
            </div>
            <div style={{fontSize:12, color:'var(--b-mute)', marginTop:16, lineHeight:1.5}}>{r.where}</div>
          </div>
        ))}
      </section>

      {/* Featured Work — pannable grid */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/02 FEATURED WORK</span>
          <h2 className="b-section-title">Frame<br/>by frame.</h2>
        </div>
        <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>
          HOVER + MOVE TO PAN
        </span>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {gallery.map((g, i) => <PanGallery key={i} {...g} />)}
      </section>

      {/* Skills strip */}
      <section style={{padding:'72px 56px', background:'var(--b-bg-2)', borderBottom:'1px solid var(--b-line)'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:64}}>
          <div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>/03 SKILLS</div>
            <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:64, lineHeight:0.9, letterSpacing:'-0.03em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
              Behind<br/>the kit.
            </h2>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32}}>
            {[
              ['SPORTS PHOTOGRAPHY', 'Game action, sidelines, atmosphere. Game-day storytelling.'],
              ['VIDEOGRAPHY', 'Highlight-style content for social platforms. Quick-cut edits.'],
              ['EDITING / POST', 'Selecting highlights, color, simple edits. Lightroom + Premiere.'],
              ['SHOT PLANNING', 'Pre-event shot lists, storylines, coverage strategy.'],
              ['SIDELINE OPS', 'Working credentialed events. Pro-team workflow.'],
              ['CONTENT STRATEGY', 'Building IG-first content. Caption + carousel design.'],
            ].map(([t, b]) => (
              <div key={t}>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:15, color:'var(--b-green-bright)', textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:8}}>{t}</div>
                <div style={{fontSize:13, lineHeight:1.5, color:'var(--b-mute)'}}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section style={{padding:'56px', background:'var(--b-bg)', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:12}}>/04 BOOK A SHOOT</div>
          <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:48, lineHeight:1, letterSpacing:'-0.03em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
            @Shots_By_Franz
          </h2>
        </div>
        <a href="https://instagram.com/Shots_By_Franz" target="_blank" rel="noopener noreferrer" style={{
          display:'flex', alignItems:'center', gap:12, padding:'18px 28px',
          background:'var(--b-green-bright)', color:'var(--b-bg)',
          fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:14, letterSpacing:'0.08em',
          textTransform:'uppercase', textDecoration:'none',
          clipPath:'polygon(4% 0, 100% 0, 96% 100%, 0% 100%)'
        }}>
          FOLLOW ON INSTAGRAM →
        </a>
      </section>

      <BFooter />
    </div>
  );
}

/* ---------------- CONTACT ---------------- */
function BContactPage() {
  const p = window.KFJR.PLAYER;
  return (
    <div className="b-root">
      <BNav active="contact" />

      {/* Hero — direct contact card */}
      <section style={{padding:'80px 56px', background:'var(--b-bg)', borderBottom:'1px solid var(--b-line)'}}>
        <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:24}}>● CONTACT & RECRUITING</div>
        <h1 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:200, lineHeight:0.82, letterSpacing:'-0.05em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
          Get in<br/><span style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>touch.</span>
        </h1>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:20, lineHeight:1.5, color:'var(--b-mute)', marginTop:40, maxWidth:600}}>
          Coaches, scouts, and media — reach the family directly. Recruiting profiles and highlights live on the Basketball page.
        </p>
      </section>

      {/* Direct contacts — large cards */}
      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        <a href={`mailto:${p.email}`} style={{
          background:'var(--b-bg-2)', padding:'56px 48px', textDecoration:'none', color:'var(--b-text)',
          display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:280,
          transition:'all 0.3s ease', borderLeft:'3px solid var(--b-green-bright)',
        }}>
          <div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:14}}>● EMAIL · PRIMARY</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:36, lineHeight:1, color:'var(--b-text)', letterSpacing:'-0.02em', wordBreak:'break-all'}}>{p.email}</div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:32}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', color:'var(--b-mute)', textTransform:'uppercase'}}>RECRUITING / GENERAL</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:24, color:'var(--b-green-bright)'}}>→</div>
          </div>
        </a>
        <a href={`tel:${p.phone}`} style={{
          background:'var(--b-bg)', padding:'56px 48px', textDecoration:'none', color:'var(--b-text)',
          display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:280,
        }}>
          <div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:14}}>● PHONE</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:48, lineHeight:1, color:'var(--b-text)', letterSpacing:'-0.03em'}}>{p.phone}</div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:32}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', color:'var(--b-mute)', textTransform:'uppercase'}}>FAMILY · TEXT FRIENDLY</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:24, color:'var(--b-green-bright)'}}>→</div>
          </div>
        </a>
      </section>

      {/* Coaches */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 COACHING REFERENCES</span>
          <h2 className="b-section-title">Talk to<br/>my coaches.</h2>
        </div>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {[
          { role:'BVSW VARSITY HEAD COACH', name:'RJ Palmgren', email:'rpalmgren@bluevalleyk12.org', since:'2023' },
          { role:'YOUHOOP 3SSB · AAU COACH', name:'Aaron Henson', email:'a.henson@youhoop.com', since:'2024' },
        ].map((c, i) => (
          <div key={i} style={{background:'var(--b-bg)', padding:'40px 36px'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:8}}>{c.role}</div>
            <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:32, color:'var(--b-text)', letterSpacing:'-0.02em', textTransform:'uppercase', marginBottom:14}}>{c.name}</div>
            <a href={`mailto:${c.email}`} style={{display:'block', fontFamily:'Inter, sans-serif', fontSize:15, color:'var(--b-text)', textDecoration:'none', borderBottom:'1px solid var(--b-line)', paddingBottom:10, marginBottom:10}}>{c.email}</a>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>WORKING WITH KEVIN SINCE {c.since}</div>
          </div>
        ))}
      </section>

      {/* Quick links */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/02 QUICK LINKS</span>
          <h2 className="b-section-title">Send me<br/>everywhere.</h2>
        </div>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {[
          ['HIGHLIGHT REEL', 'Summer 2023 Phenom Camp Mix', 'YouTube', 'https://youtu.be/D99uLbwXy7s'],
          ['HUDL PROFILE', 'Game film + tagged plays', 'Hudl', '#'],
          ['ACADEMIC RESUME', 'GPA, courses, awards (PDF)', 'Download', '#'],
          ['INSTAGRAM', '@kfranzjr2028', 'Follow', 'https://instagram.com/kfranzjr2028'],
          ['PREPHOOPS', 'Player profile and rankings', 'View', '#'],
          ['NCSA SPORTS', 'Complete recruiting profile', 'View', '#'],
        ].map(([l, d, cta, url], i) => (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{
            background:'var(--b-bg)', padding:'28px 32px',
            textDecoration:'none', color:'var(--b-text)',
            display:'grid', gridTemplateColumns:'1fr auto', alignItems:'center', gap:24,
          }}>
            <div>
              <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:20, color:'var(--b-text)', textTransform:'uppercase', letterSpacing:'-0.01em'}}>{l}</div>
              <div style={{fontSize:13, color:'var(--b-mute)', marginTop:6}}>{d}</div>
            </div>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.12em', color:'var(--b-green-bright)', textTransform:'uppercase', display:'flex', alignItems:'center', gap:6}}>
              {cta} →
            </div>
          </a>
        ))}
      </section>

      <BFooter />
    </div>
  );
}

window.BMediaPage = BMediaPage;
window.BContactPage = BContactPage;
