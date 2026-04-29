/* global React */
const { useState: useStateBPages } = React;

/* =====================================================
   DIRECTION B — ADDITIONAL PAGES
   Academics · Projects · Character · Media · Contact
   ===================================================== */

/* ---------------- ACADEMICS ---------------- */
function BAcademicsPage() {
  const courses = [
    { course: 'AP Environmental Science', grade: 'A', teacher: 'Mr. Davies', notes: 'Atmospheric systems, climate dynamics, severe-weather case studies. Independent research project on Plains tornado outbreaks.' },
    { course: 'Honors Algebra II', grade: 'A', teacher: 'Mrs. Liu', notes: 'Trigonometry, complex numbers, conic sections. Strong foundation for college-level calculus.' },
    { course: 'Honors English 10', grade: 'A−', teacher: 'Ms. Patel', notes: 'Rhetorical analysis, argumentative writing, American literature. Capstone essay on athlete-scholar narratives.' },
    { course: 'Physics', grade: 'A', teacher: 'Mr. Reeves', notes: 'Mechanics, waves, thermodynamics. Lab partner for tornado-pressure simulation project.' },
    { course: 'Spanish III', grade: 'B+', teacher: 'Sra. Martínez', notes: 'Conversational fluency, cultural literature. Working toward AP Spanish next year.' },
    { course: 'World History', grade: 'A', teacher: 'Mr. Gallagher', notes: 'Comparative history, geopolitics, primary-source analysis.' },
  ];

  return (
    <div className="b-root">
      <BNav active="academics" />

      {/* Hero — split with overlay GPA dial */}
      <section style={{position:'relative', minHeight:600, background:'var(--b-bg)', overflow:'hidden'}}>
        <div style={{position:'absolute', inset:0, opacity:0.25}}>
          <img src="src/images/banner/large_Copy_of_618_A3237_2_Enhanced_NR_8707ac32b4.jpg" alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />
          <div style={{position:'absolute', inset:0, background:'linear-gradient(90deg, var(--b-bg) 0%, rgba(11,13,16,0.6) 50%, var(--b-bg) 100%)'}} />
        </div>
        <div style={{position:'relative', zIndex:2, padding:'80px 56px', display:'grid', gridTemplateColumns:'1fr auto', gap:64, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:10, fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:24}}>
              <span>●</span> ACADEMICS · 2025–26
            </div>
            <h1 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:140, lineHeight:0.85, letterSpacing:'-0.045em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
              Student.<br/>
              <span style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>First.</span>
            </h1>
            <p style={{fontFamily:'JetBrains Mono, monospace', fontSize:13, letterSpacing:'0.06em', color:'var(--b-mute)', marginTop:32, maxWidth:420, lineHeight:1.6, textTransform:'uppercase'}}>
              3.85 GPA · Honor roll every semester · Targeting meteorology / atmospheric science in college.
            </p>
          </div>
          {/* GPA dial */}
          <GPADial gpa={3.85} max={4.0} />
        </div>
      </section>

      {/* Quick stats reveal panels */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 SNAPSHOT</span>
          <h2 className="b-section-title">By the<br/>numbers.</h2>
        </div>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        <RevealPanel label="GPA" value="3.85" hint="See trajectory">
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:14}}>BY SEMESTER</div>
          <div style={{display:'flex', alignItems:'flex-end', gap:8, height:120, marginBottom:14}}>
            {[3.6, 3.7, 3.8, 3.85, 3.85, 3.9].map((g, i) => (
              <div key={i} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4}}>
                <div style={{height:`${(g-3.4)*180}px`, width:'100%', background: i === 5 ? 'var(--b-green-bright)' : 'var(--b-bg-3)', minHeight:8}} />
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:9, color:'var(--b-mute)'}}>S{i+1}</div>
              </div>
            ))}
          </div>
        </RevealPanel>
        <RevealPanel label="HONOR ROLL" value="6/6" hint="See semesters">
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:12}}>EVERY SEMESTER</div>
          <ul style={{listStyle:'none', padding:0, margin:0, fontSize:13, color:'var(--b-text)', lineHeight:2}}>
            <li>● Fall 2022 (8th)</li>
            <li>● Spring 2023 (8th)</li>
            <li>● Fall 2023 (Fr)</li>
            <li>● Spring 2024 (Fr)</li>
            <li>● Fall 2024 (So)</li>
            <li>● Spring 2025 (So)</li>
          </ul>
        </RevealPanel>
        <RevealPanel label="HONORS / AP" value="5" hint="See list">
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:12}}>ADVANCED COURSEWORK</div>
          <ul style={{listStyle:'none', padding:0, margin:0, fontSize:13, color:'var(--b-text)', lineHeight:1.9}}>
            <li>AP Environmental Science</li>
            <li>Honors Algebra II</li>
            <li>Honors English 10</li>
            <li>Physics</li>
            <li>Honors Chemistry (next yr)</li>
          </ul>
        </RevealPanel>
        <RevealPanel label="TARGET" value="MET" hint="See plan">
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:12}}>METEOROLOGY MAJOR</div>
          <p style={{fontSize:13, color:'var(--b-text)', lineHeight:1.6, margin:0}}>
            Atmospheric science — analyzing weather patterns, forecasting, and storm research. D1 schools with strong meteorology programs are the dream.
          </p>
        </RevealPanel>
      </section>

      {/* Coursework — click to expand */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/02 COURSEWORK</span>
          <h2 className="b-section-title">2025–26.</h2>
        </div>
        <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>
          CLICK COURSE TO EXPAND
        </span>
      </div>
      <section style={{borderBottom:'1px solid var(--b-line)'}}>
        {courses.map(c => <CourseRow key={c.course} {...c} />)}
      </section>

      {/* Why Meteorology — full bleed split */}
      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid var(--b-line)', background:'var(--b-bg-2)'}}>
        <div style={{padding:'80px 56px'}}>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>/03 WHY METEOROLOGY</div>
          <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:80, lineHeight:0.9, letterSpacing:'-0.04em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>
            Storms<br/>are <span style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>real-time</span><br/>data.
          </h2>
          <p style={{fontSize:16, lineHeight:1.7, color:'var(--b-mute)', marginTop:32, maxWidth:440}}>
            Growing up in Tornado Alley, I learned to track radar before I could drive. Reading a sounding chart, watching a supercell organize, calling a tornado warning before the sirens — that's the rush. Atmospheric science is engineering plus chaos plus consequences. I want to study it for real.
          </p>
        </div>
        <WeatherWidget />
      </section>

      {/* Awards strip */}
      <section style={{padding:'56px 56px 80px', background:'var(--b-bg)'}}>
        <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:24}}>/04 AWARDS & RECOGNITION</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--b-line)', border:'1px solid var(--b-line)'}}>
          {[
            ['HONOR ROLL', 'All semesters since 6th grade'],
            ['ACADEMIC EXCELLENCE', 'BVSW · 2024–25'],
            ['NATIONAL HONOR SOCIETY', 'Inducted 2025 (sophomore)'],
          ].map(([t, d]) => (
            <div key={t} style={{background:'var(--b-bg-2)', padding:'32px 28px'}}>
              <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:24, color:'var(--b-text)', textTransform:'uppercase', letterSpacing:'-0.02em', lineHeight:1.1}}>{t}</div>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:12, color:'var(--b-mute)', letterSpacing:'0.06em', marginTop:8}}>{d}</div>
            </div>
          ))}
        </div>
      </section>

      <BFooter />
    </div>
  );
}

/* GPA Dial */
function GPADial({ gpa, max }) {
  const pct = (gpa / max);
  const circumference = 2 * Math.PI * 90;
  const offset = circumference * (1 - pct);
  return (
    <div style={{position:'relative', width:280, height:280}}>
      <svg width="280" height="280" viewBox="0 0 240 240">
        <circle cx="120" cy="120" r="90" fill="none" stroke="var(--b-line)" strokeWidth="14" />
        <circle cx="120" cy="120" r="90" fill="none" stroke="var(--b-green-bright)" strokeWidth="14"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 120 120)" strokeLinecap="square" />
      </svg>
      <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase'}}>GPA</div>
        <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:80, lineHeight:1, color:'var(--b-text)', letterSpacing:'-0.04em', marginTop:4}}>{gpa}</div>
        <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'var(--b-mute)', marginTop:4}}>/ {max.toFixed(1)}</div>
      </div>
    </div>
  );
}

/* ---------------- PROJECTS ---------------- */
function BProjectsPage() {
  const [activeStorm, setActiveStorm] = useStateBPages(0);
  const storms = [
    { date: 'May 4, 2024', name: 'Sulphur EF-3', wind: '165 mph', dur: '32 min', region: 'OK', notes: 'Tracked organization on radar in real time. Logged hook echo development.' },
    { date: 'Apr 26, 2024', name: 'Lincoln EF-4', wind: '170 mph', dur: '54 min', region: 'NE', notes: 'Followed eastward path through Omaha metro. Documented power flashes.' },
    { date: 'Mar 14, 2024', name: 'Winchester EF-3', wind: '155 mph', dur: '20 min', region: 'IN', notes: 'Late-season outbreak. Watched storm-relative velocity couplet form.' },
    { date: 'Dec 10, 2024', name: 'Greenfield EF-2', wind: '125 mph', dur: '15 min', region: 'IA', notes: 'December tornado — rare. Studied the pre-event environment.' },
  ];

  return (
    <div className="b-root">
      <BNav active="projects" />

      {/* Hero */}
      <section style={{padding:'80px 56px 60px', background:'var(--b-bg)', borderBottom:'1px solid var(--b-line)'}}>
        <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:24}}>● PROJECTS & PASSIONS</div>
        <h1 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:160, lineHeight:0.85, letterSpacing:'-0.045em', textTransform:'uppercase', margin:0, color:'var(--b-text)', maxWidth:'90%'}}>
          What I'm<br/><span style={{WebkitTextStroke:'2px var(--b-green-bright)', WebkitTextFillColor:'transparent'}}>obsessed</span> with.
        </h1>
        <p style={{fontFamily:'Inter, sans-serif', fontSize:18, lineHeight:1.6, color:'var(--b-mute)', marginTop:32, maxWidth:600}}>
          Off the floor I'm chasing storms, breaking down film, and teaching the game to younger kids. Three threads that run through everything.
        </p>
      </section>

      {/* Storm tracker — interactive */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 STORM LOG</span>
          <h2 className="b-section-title">Tornado<br/>tracker.</h2>
        </div>
        <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>
          CLICK A STORM
        </span>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', borderBottom:'1px solid var(--b-line)', minHeight:520}}>
        {/* Storm list */}
        <div style={{borderRight:'1px solid var(--b-line)', background:'var(--b-bg-2)'}}>
          {storms.map((s, i) => (
            <div key={i} onClick={() => setActiveStorm(i)} style={{
              padding:'20px 28px', borderBottom:'1px solid var(--b-line)',
              cursor:'pointer', display:'grid', gridTemplateColumns:'80px 1fr 50px',
              alignItems:'center', gap:16,
              background: activeStorm === i ? 'var(--b-bg)' : 'transparent',
              borderLeft: activeStorm === i ? '3px solid var(--b-green-bright)' : '3px solid transparent',
            }}>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'var(--b-mute)'}}>{s.date}</div>
              <div>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:18, color:'var(--b-text)', textTransform:'uppercase', letterSpacing:'-0.01em'}}>{s.name}</div>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, color:activeStorm===i?'var(--b-green-bright)':'var(--b-mute)', marginTop:4, letterSpacing:'0.08em'}}>{s.region} · {s.wind}</div>
              </div>
              <div style={{textAlign:'right', fontFamily:'JetBrains Mono, monospace', fontSize:14, color:activeStorm===i?'var(--b-green-bright)':'var(--b-mute)'}}>→</div>
            </div>
          ))}
        </div>
        {/* Storm detail */}
        <div style={{padding:'56px 56px', background:'var(--b-bg)', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden'}}>
          {/* Radar bg */}
          <div style={{position:'absolute', top:'50%', right:-100, transform:'translateY(-50%)', width:500, height:500, opacity:0.15, pointerEvents:'none'}}>
            <svg viewBox="0 0 500 500" style={{width:'100%', height:'100%'}}>
              {[80, 160, 240].map(r => <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="var(--b-green-bright)" strokeWidth="1" />)}
              <line x1="250" y1="0" x2="250" y2="500" stroke="var(--b-green-bright)" strokeWidth="1" />
              <line x1="0" y1="250" x2="500" y2="250" stroke="var(--b-green-bright)" strokeWidth="1" />
              {/* Hook echo blob */}
              <path d="M 280 220 Q 320 200 340 240 Q 360 280 320 290 Q 290 295 270 270 Q 260 250 280 220" fill="var(--b-amber)" opacity="0.6" />
              <circle cx="305" cy="255" r="6" fill="var(--b-red)" />
            </svg>
          </div>
          <div style={{position:'relative', zIndex:2}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:12}}>● TRACKED EVENT</div>
            <h3 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:64, lineHeight:0.9, letterSpacing:'-0.03em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>{storms[activeStorm].name}</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:1, background:'var(--b-line)', border:'1px solid var(--b-line)', marginTop:32, maxWidth:500}}>
              {[['DATE', storms[activeStorm].date],['WIND', storms[activeStorm].wind],['DURATION', storms[activeStorm].dur],['REGION', storms[activeStorm].region]].map(([l, v]) => (
                <div key={l} style={{padding:'14px 16px', background:'var(--b-bg-2)'}}>
                  <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:9, letterSpacing:'0.14em', color:'var(--b-mute)', textTransform:'uppercase'}}>{l}</div>
                  <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:16, color:'var(--b-text)', marginTop:4}}>{v}</div>
                </div>
              ))}
            </div>
            <p style={{fontSize:15, lineHeight:1.6, color:'var(--b-mute)', marginTop:32, maxWidth:480}}>{storms[activeStorm].notes}</p>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/02 PASSIONS</span>
          <h2 className="b-section-title">Three<br/>threads.</h2>
        </div>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {[
          {tag:'/ WEATHER', title:'Forecasting & storm-chasing', body:'Weekly weather blog, severe-weather log, and a long-running fascination with how the atmosphere actually behaves. Spring 2026: storm-chase trip planned with my dad.', stat:'12K+', statLabel:'PAGE VIEWS · WEATHER BLOG'},
          {tag:'/ FILM', title:'Basketball IQ', body:'Hours of film every week — our games, our opponents, and college guards I want to emulate. Building a personal playbook of reads, counters, and decision-making frameworks.', stat:'350+', statLabel:'CLIPS LOGGED · 2025'},
          {tag:'/ MENTORSHIP', title:'Teaching the game', body:'Volunteer coach at youth camps. Helping younger players develop fundamentals, defensive rotations, and ball-handling. Teaching makes me a better player.', stat:'50+', statLabel:'KIDS COACHED'},
        ].map(p => (
          <div key={p.tag} style={{background:'var(--b-bg-2)', padding:'40px 32px', display:'flex', flexDirection:'column', minHeight:360}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:16}}>{p.tag}</div>
            <h3 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:28, lineHeight:1, letterSpacing:'-0.02em', textTransform:'uppercase', margin:0, color:'var(--b-text)'}}>{p.title}</h3>
            <p style={{fontSize:14, lineHeight:1.6, color:'var(--b-mute)', marginTop:16, flex:1}}>{p.body}</p>
            <div style={{borderTop:'1px solid var(--b-line)', paddingTop:16, marginTop:24}}>
              <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:48, lineHeight:1, color:'var(--b-green-bright)', letterSpacing:'-0.03em'}}>{p.stat}</div>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.12em', color:'var(--b-mute)', marginTop:6, textTransform:'uppercase'}}>{p.statLabel}</div>
            </div>
          </div>
        ))}
      </section>

      <BFooter />
    </div>
  );
}

/* ---------------- CHARACTER ---------------- */
function BCharacterPage() {
  const values = [
    { num: '/01', title: 'Team First', description: 'Success is measured by what we achieve together — every screen, every sprint back, every box-out.', detail: 'I\'d rather have an assist that wins us the game than a 30-burger that loses it. The best teammates I\'ve had taught me that the simple, unselfish play is almost always the right one. That\'s the standard I try to hold myself to.' },
    { num: '/02', title: 'Accountability', description: 'Hold myself to high standards on and off the court — first one in, last one out.', detail: 'My dad taught me to be the hardest worker in any room. If I miss a shot, that\'s on me. If I miss a class, that\'s on me. The only way to get better is to own every rep, every grade, every interaction.' },
    { num: '/03', title: 'Curiosity', description: 'Always learning, always asking questions — film, books, weather charts, you name it.', detail: 'I\'ve probably watched 1000+ hours of NBA film. I read about supercells and meteorology textbooks for fun. I think the people who get really good at things are the ones who stay curious about how things actually work.' },
    { num: '/04', title: 'Family', description: 'Everything starts with the people who support me — parents, coaches, teammates.', detail: 'My family drives me to practice, fills the bleachers, and tells me the truth when I\'m playing badly. None of this is possible without them. Every game is for the people who show up for me.' },
  ];

  return (
    <div className="b-root">
      <BNav active="character" />

      {/* Hero — quote-led */}
      <section style={{padding:'120px 56px', background:'var(--b-bg)', borderBottom:'1px solid var(--b-line)', position:'relative', overflow:'hidden'}}>
        <div style={{position:'absolute', top:40, right:56, fontFamily:'Archivo, sans-serif', fontSize:600, fontWeight:900, color:'var(--b-bg-2)', lineHeight:0.7, pointerEvents:'none', userSelect:'none', letterSpacing:'-0.05em'}}>"</div>
        <div style={{position:'relative', zIndex:2, maxWidth:1100}}>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:32}}>● CHARACTER & SERVICE</div>
          <h1 style={{fontFamily:'Fraunces, serif', fontWeight:500, fontStyle:'italic', fontSize:96, lineHeight:1.05, letterSpacing:'-0.03em', margin:0, color:'var(--b-text)'}}>
            Kevin leads by example. He's the first one in the gym and the last to leave. His work ethic is contagious.
          </h1>
          <div style={{marginTop:40, display:'flex', alignItems:'center', gap:20}}>
            <div style={{width:60, height:1, background:'var(--b-green-bright)'}} />
            <div>
              <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:18, color:'var(--b-text)', textTransform:'uppercase', letterSpacing:'0.02em'}}>Coach RJ Palmgren</div>
              <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:12, color:'var(--b-mute)', letterSpacing:'0.08em', marginTop:4}}>BVSW VARSITY HEAD COACH</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — flippable */}
      <div className="b-section-head">
        <div className="b-section-head-left">
          <span className="b-section-tag">/01 VALUES</span>
          <h2 className="b-section-title">What I<br/>stand for.</h2>
        </div>
        <span style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-mute)', textTransform:'uppercase'}}>
          CLICK A CARD TO FLIP
        </span>
      </div>
      <section style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:1, padding:'1px', background:'var(--b-line)', borderBottom:'1px solid var(--b-line)'}}>
        {values.map(v => <ValueCard key={v.title} {...v} />)}
      </section>

      {/* Service & Leadership */}
      <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', borderBottom:'1px solid var(--b-line)'}}>
        <div style={{padding:'72px 56px', borderRight:'1px solid var(--b-line)', background:'var(--b-bg-2)'}}>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:24}}>/02 SERVICE</div>
          <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:56, lineHeight:0.95, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'0 0 32px', color:'var(--b-text)'}}>
            Giving<br/>back.
          </h2>
          <div style={{display:'flex', flexDirection:'column', gap:24}}>
            {[
              ['YOUTH BASKETBALL CAMPS', 'Volunteer coach for elementary players, teaching fundamentals and helping young athletes develop a love for the game.'],
              ['FOOD DRIVE', 'Organized collection for local shelter, working with teammates to give back to our community.'],
              ['PEER TUTORING', 'Tutor freshmen in math and science. Believe strongly in athletes being students first.'],
            ].map(([t, b]) => (
              <div key={t} style={{borderLeft:'2px solid var(--b-green-bright)', paddingLeft:20}}>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:800, fontSize:18, color:'var(--b-text)', textTransform:'uppercase', letterSpacing:'-0.01em'}}>{t}</div>
                <p style={{fontSize:14, lineHeight:1.6, color:'var(--b-mute)', margin:'8px 0 0'}}>{b}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:'72px 56px', background:'var(--b-bg)'}}>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'var(--b-green-bright)', textTransform:'uppercase', marginBottom:24}}>/03 LEADERSHIP</div>
          <h2 style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:56, lineHeight:0.95, letterSpacing:'-0.03em', textTransform:'uppercase', margin:'0 0 32px', color:'var(--b-text)'}}>
            Captain<br/>energy.
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:1, background:'var(--b-line)', border:'1px solid var(--b-line)'}}>
            {[
              ['2023', 'JV TEAM CAPTAIN'],
              ['2024', 'FRESHMAN A CAPTAIN'],
              ['2025', 'AAU TEAM LEADER'],
              ['2025', 'NHS INDUCTEE'],
            ].map(([y, t], i) => (
              <div key={i} style={{background:'var(--b-bg-2)', padding:'24px 20px'}}>
                <div style={{fontFamily:'Archivo, sans-serif', fontWeight:900, fontSize:32, color:'var(--b-green-bright)', lineHeight:1, letterSpacing:'-0.02em'}}>{y}</div>
                <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.1em', color:'var(--b-text)', marginTop:6, textTransform:'uppercase'}}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BFooter />
    </div>
  );
}

window.BAcademicsPage = BAcademicsPage;
window.BProjectsPage = BProjectsPage;
window.BCharacterPage = BCharacterPage;
