/* global React */
const { useState: useStateBP } = React;

/* =====================================================
   PLAYER CARD — flippable trading card
   The centerpiece of the basketball page.
   ===================================================== */

function PlayerCard() {
  const p = window.KFJR.PLAYER;
  const stats = window.KFJR.STATS_2526;
  const [flipped, setFlipped] = useStateBP(false);

  return (
    <div className="b-pcard-wrap" onClick={() => setFlipped(f => !f)}>
      <div className={`b-pcard ${flipped ? 'is-flipped' : ''}`}>
        {/* FRONT */}
        <div className="b-pcard-face b-pcard-front">
          <div className="b-pcard-bg-num">30</div>

          {/* Holographic shimmer */}
          <div className="b-pcard-shimmer"></div>

          {/* Top bar */}
          <div className="b-pcard-topbar">
            <div className="b-pcard-team">
              <span className="b-pcard-mark">BVSW</span>
              <span>BLUE VALLEY SOUTHWEST</span>
            </div>
            <div className="b-pcard-jersey">#30</div>
          </div>

          {/* Photo */}
          <div className="b-pcard-photo">
            <img src="src/images/player/medium_Copy_of_618_A3075_2_Enhanced_NR_0a0a68195a.jpg" alt={p.name} />
            <div className="b-pcard-photo-grad"></div>
          </div>

          {/* Nameplate */}
          <div className="b-pcard-nameplate">
            <div className="b-pcard-pos-tag">COMBO GUARD · CLASS OF '28</div>
            <h2 className="b-pcard-name">
              <span className="b-pcard-name-first">KEVIN FRANZ</span>
              <span className="b-pcard-name-last">JUNIOR.</span>
            </h2>
          </div>

          {/* Quick stats strip */}
          <div className="b-pcard-quickstats">
            {[['HT', "6'1\""], ['WT', '185'], ['HAND', 'R'], ['AGE', '15']].map(([l, v]) => (
              <div key={l} className="b-pcard-qs">
                <div className="b-pcard-qs-l">{l}</div>
                <div className="b-pcard-qs-v">{v}</div>
              </div>
            ))}
          </div>

          {/* Flip hint */}
          <div className="b-pcard-flip-hint">
            <span>● TAP TO FLIP</span>
            <span>↻</span>
          </div>
        </div>

        {/* BACK */}
        <div className="b-pcard-face b-pcard-back">
          <div className="b-pcard-back-header">
            <div>
              <div className="b-pcard-back-tag">2025–26 SEASON · BVSW JV</div>
              <div className="b-pcard-back-name">KEVIN FRANZ JR.</div>
            </div>
            <div className="b-pcard-jersey-lg">30</div>
          </div>

          {/* Stat grid */}
          <div className="b-pcard-stat-grid">
            {stats.slice(0, 9).map(s => (
              <div key={s.label} className="b-pcard-stat-cell">
                <div className="b-pcard-stat-label">{s.label}</div>
                <div className="b-pcard-stat-value">{s.value}</div>
                <div className="b-pcard-stat-rank">{s.rank}</div>
              </div>
            ))}
          </div>

          {/* Bio block */}
          <div className="b-pcard-bio">
            <div className="b-pcard-bio-row">
              <span>POSITION</span><span>Combo Guard</span>
            </div>
            <div className="b-pcard-bio-row">
              <span>SCHOOL</span><span>Blue Valley Southwest</span>
            </div>
            <div className="b-pcard-bio-row">
              <span>AAU / CLUB</span><span>YouHoop 3SSB Gold</span>
            </div>
            <div className="b-pcard-bio-row">
              <span>HOMETOWN</span><span>Overland Park, KS</span>
            </div>
            <div className="b-pcard-bio-row">
              <span>GPA</span><span>3.85</span>
            </div>
          </div>

          <div className="b-pcard-quote">
            "High Energy · High Impact · High IQ"
          </div>

          <div className="b-pcard-flip-hint">
            <span>● TAP TO FLIP BACK</span>
            <span>↺</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PlayerCard = PlayerCard;
