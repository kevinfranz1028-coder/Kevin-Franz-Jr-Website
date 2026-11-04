#!/usr/bin/env node
/**
 * Build-time guard for the 2025-26 BVSW JV season data.
 *
 * Recomputes every total and average from the per-game rows in
 * src/_data/jv-2025-26.json and fails the build if the stored
 * totals/averages drift, or if they stop matching the known-good
 * GameChanger season line for team 1cWWz3Uq6qaT.
 *
 * Run directly:  node scripts/verify-jv-stats.js
 * Runs automatically as the `prebuild` step of `npm run build`.
 */

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'src', '_data', 'jv-2025-26.json');

// Season line as published on the GameChanger season-stats page for the
// primary Winter 2025-26 BVSW JV team (teamId 1cWWz3Uq6qaT).
const EXPECTED = {
  record: '7-14',
  gamesTotal: 21,
  totals: {
    gp: 19, gs: 17,
    pts: 107, reb: 76, ast: 48, stl: 28, blk: 6, to: 22, pf: 49,
    fgm: 35, fga: 89, tpm: 12, tpa: 38, ftm: 25, fta: 37
  },
  averages: {
    ppg: 5.6, rpg: 4.0, apg: 2.5, spg: 1.5, bpg: 0.3, topg: 1.2, pfpg: 2.6,
    fgPct: 39, tpPct: 32, ftPct: 68, astTo: 2.18
  }
};

const errors = [];
const fail = (msg) => errors.push(msg);

const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const games = data.games || [];
const played = games.filter((g) => g.hasStats);

// ---- recompute from the per-game rows -------------------------------------
const sum = (key) => played.reduce((acc, g) => acc + Number(g[key]), 0);
const splitPart = (key, i) =>
  played.reduce((acc, g) => acc + Number(String(g[key]).split('-')[i]), 0);

const gp = played.length;
const round1 = (n) => Number(n.toFixed(1));

const computedTotals = {
  gp,
  gs: data.totals ? data.totals.gs : undefined, // GS comes from the season row, not per-game
  pts: sum('pts'), reb: sum('reb'), ast: sum('ast'), stl: sum('stl'),
  blk: sum('blk'), to: sum('to'), pf: sum('pf'),
  fgm: splitPart('fg', 0), fga: splitPart('fg', 1),
  tpm: splitPart('tp', 0), tpa: splitPart('tp', 1),
  ftm: splitPart('ft', 0), fta: splitPart('ft', 1)
};

const computedAverages = {
  ppg: round1(computedTotals.pts / gp),
  rpg: round1(computedTotals.reb / gp),
  apg: round1(computedTotals.ast / gp),
  spg: round1(computedTotals.stl / gp),
  bpg: round1(computedTotals.blk / gp),
  topg: round1(computedTotals.to / gp),
  pfpg: round1(computedTotals.pf / gp),
  fgPct: Math.round((100 * computedTotals.fgm) / computedTotals.fga),
  tpPct: Math.round((100 * computedTotals.tpm) / computedTotals.tpa),
  ftPct: Math.round((100 * computedTotals.ftm) / computedTotals.fta),
  astTo: Number((computedTotals.ast / computedTotals.to).toFixed(2))
};

// ---- 1. stored totals/averages must match the per-game rows ---------------
for (const [key, want] of Object.entries(computedTotals)) {
  const got = data.totals ? data.totals[key] : undefined;
  if (Number(got) !== Number(want)) {
    fail(`totals.${key}: file says ${got}, per-game rows compute ${want}`);
  }
}
for (const [key, want] of Object.entries(computedAverages)) {
  const got = data.averages ? data.averages[key] : undefined;
  if (Number(got) !== Number(want)) {
    fail(`averages.${key}: file says ${got}, per-game rows compute ${want}`);
  }
}

// ---- 2. computed values must match the published season line --------------
for (const [key, want] of Object.entries(EXPECTED.totals)) {
  if (Number(computedTotals[key]) !== want) {
    fail(`totals.${key}: computed ${computedTotals[key]}, GameChanger season line says ${want}`);
  }
}
for (const [key, want] of Object.entries(EXPECTED.averages)) {
  if (Number(computedAverages[key]) !== want) {
    fail(`averages.${key}: computed ${computedAverages[key]}, GameChanger season line says ${want}`);
  }
}

// ---- 3. structural checks -------------------------------------------------
if (games.length !== EXPECTED.gamesTotal) {
  fail(`games: ${games.length} rows, expected ${EXPECTED.gamesTotal}`);
}
if (data.gamesTotal !== games.length) {
  fail(`gamesTotal: file says ${data.gamesTotal}, found ${games.length} game rows`);
}

const wins = games.filter((g) => g.result === 'W').length;
const losses = games.filter((g) => g.result === 'L').length;
if (`${wins}-${losses}` !== EXPECTED.record) {
  fail(`record: game results compute ${wins}-${losses}, expected ${EXPECTED.record}`);
}
if (data.record !== EXPECTED.record) {
  fail(`record: file says ${data.record}, expected ${EXPECTED.record}`);
}
if (data.teamId !== '1cWWz3Uq6qaT') {
  fail(`teamId: file says ${data.teamId}, expected 1cWWz3Uq6qaT (the duplicate Winter team must not be used)`);
}

// Points must reconcile with the shooting splits: 2*(FG-3PT) + 3*3PT + FT.
const derivedPts =
  2 * (computedTotals.fgm - computedTotals.tpm) + 3 * computedTotals.tpm + computedTotals.ftm;
if (derivedPts !== computedTotals.pts) {
  fail(`points do not reconcile with shooting splits: FG/3PT/FT imply ${derivedPts}, PTS column sums to ${computedTotals.pts}`);
}

// Per-game sanity: every row needs a score, a result and a date.
games.forEach((g, i) => {
  if (!/^\d+-\d+$/.test(String(g.score))) fail(`games[${i}] (${g.date}): bad score "${g.score}"`);
  if (!['W', 'L', 'T'].includes(g.result)) fail(`games[${i}] (${g.date}): bad result "${g.result}"`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(g.date))) fail(`games[${i}]: bad date "${g.date}"`);
  if (g.hasStats) {
    ['fg', 'tp', 'ft'].forEach((k) => {
      if (!/^\d+-\d+$/.test(String(g[k]))) fail(`games[${i}] (${g.date}): bad ${k} "${g[k]}"`);
    });
  }
});

// Rows without stats must not carry a box-score line.
games
  .filter((g) => !g.hasStats)
  .forEach((g) => {
    ['pts', 'reb', 'ast', 'stl', 'blk', 'to', 'pf', 'fg', 'tp', 'ft'].forEach((k) => {
      if (g[k] !== undefined) {
        fail(`games (${g.date}): marked hasStats:false but carries a "${k}" value — do not publish zeros for a DNP`);
      }
    });
  });

// ---- report --------------------------------------------------------------
if (errors.length) {
  console.error('\n✗ verify-jv-stats: 2025-26 JV season data is inconsistent\n');
  errors.forEach((e) => console.error('  - ' + e));
  console.error('');
  process.exit(1);
}

const a = computedAverages;
console.log(
  `✓ verify-jv-stats: ${data.teamShort} ${data.season} — ${data.record} (${games.length} G) · ` +
    `${computedTotals.gp} GP / ${computedTotals.gs} GS · ` +
    `${a.ppg} PPG · ${a.rpg} RPG · ${a.apg} APG · ` +
    `FG ${computedTotals.fgm}-${computedTotals.fga} (${a.fgPct}%) · ` +
    `3PT ${computedTotals.tpm}-${computedTotals.tpa} (${a.tpPct}%) · ` +
    `FT ${computedTotals.ftm}-${computedTotals.fta} (${a.ftPct}%) · ` +
    `AST/TO ${a.astTo}`
);
