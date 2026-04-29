/* global React */
const { useState, useEffect, useRef } = React;

/* =====================================================
   SHARED DATA
   ===================================================== */
const TIMELINE = [
  {
    year: '2019–2020',
    grade: '4th–5th Grade',
    team: 'Youth Basketball League',
    season: 'Elementary',
    summary: 'Started organized basketball — fundamentals, footwork, and a love for the game.',
    image: 'src/images/banner/large_Kevin_Jr_Layup_Black_and_White_Game_be9d381555.JPG',
    bullets: ['Basic dribbling and shooting form', 'Understanding team concepts', 'Learning defensive fundamentals', 'Building basketball IQ'],
  },
  {
    year: '2023–2024',
    grade: '8th Grade',
    team: 'Middle School',
    season: 'Middle School',
    summary: 'Breakout year — team captain, leading scorer, conference championship.',
    image: 'src/images/banner/large_Kevin_Jr_Blocked_Shot_Black_and_White_Game_0761755000.JPG',
    bullets: ['Conference All-Star Team', 'Team MVP', 'Led team to 12-4 record', 'Conference champions'],
    stats: { ppg: '14.2', apg: '4.1', rpg: '5.0' },
  },
  {
    year: '2024–2025',
    grade: 'Freshman • School Ball',
    team: 'BVSW Freshman A',
    season: 'High School',
    summary: 'Team captain on the freshman A squad — leadership and program foundation.',
    image: 'src/images/banner/large_Copy_of_618_A3237_2_Enhanced_NR_8707ac32b4.jpg',
    bullets: ['Named team captain', 'Made varsity debut late season', 'Improved 3-point consistency', 'JV all-tournament team'],
  },
  {
    year: '2025 Summer',
    grade: 'Rising 10th',
    team: 'You Hoop 3SSB Gold',
    season: 'AAU',
    summary: 'Summer circuit with 3SSB Gold — high-level competition, national exposure.',
    image: 'src/images/banner/large_Copy_of_655_A7902_Enhanced_NR_742d9cd3fb.jpg',
    bullets: ['3SSB Gold circuit', 'Mixed roles: lead guard + off-ball', 'Defensive versatility', 'College-coach exposure events'],
  },
  {
    year: '2025–2026',
    grade: 'Sophomore • Current',
    team: 'BVSW JV',
    season: 'High School',
    summary: 'Current season — leading the JV roster in rebounds and assist-to-turnover ratio.',
    image: 'src/images/banner/large_Copy_of_618_A3075_2_Enhanced_NR_0a0a68195a.jpg',
    bullets: ['Team-leading 4.1 RPG (1st)', 'Top assist-to-turnover ratio', '14 starts in 16 games', 'Captain candidacy'],
    stats: { ppg: '5.4', apg: '2.6', rpg: '4.1' },
    current: true,
  },
];

const STATS_2526 = [
  { label: 'PPG', value: '5.4', rank: '5th' },
  { label: 'RPG', value: '4.1', rank: '1st' },
  { label: 'APG', value: '2.6', rank: '2nd' },
  { label: 'SPG', value: '1.4', rank: 'T-3rd' },
  { label: 'BPG', value: '0.4', rank: 'T-3rd' },
  { label: 'FG%', value: '37.5', rank: '8th' },
  { label: '3PT%', value: '31.0', rank: '5th' },
  { label: 'FT%', value: '65.7', rank: '4th' },
  { label: 'AST/TO', value: '2.05', rank: '2nd' },
  { label: 'TOPG', value: '1.25', rank: '7th' },
];

const SCHEDULE = [
  { date: 'Dec 5',  opp: 'Washburn Rural',         loc: 'Away', result: 'L 38-52' },
  { date: 'Dec 9',  opp: 'Wyandotte',              loc: 'Home', result: 'W 64-31' },
  { date: 'Dec 16', opp: 'Gardner-Edgerton',       loc: 'Home', result: 'W 51-44' },
  { date: 'Jan 6',  opp: 'Shawnee Mission North',  loc: 'Away', result: 'W 58-46' },
  { date: 'Jan 8',  opp: 'Basehor-Linwood',        loc: 'Home', result: 'L 42-49' },
  { date: 'Jan 13', opp: 'Louisburg',              loc: 'Away', result: 'W 55-40' },
  { date: 'Jan 16', opp: 'Blue Valley West',       loc: 'Home', result: 'W 60-52' },
  { date: 'Jan 21', opp: 'Olathe Northwest',       loc: 'Home', result: '—', upcoming: true },
  { date: 'Jan 27', opp: 'Olathe East',            loc: 'Away', result: '—', upcoming: true },
  { date: 'Jan 30', opp: 'Shawnee Mission West',   loc: 'Home', result: '—', upcoming: true },
  { date: 'Feb 3',  opp: 'Saint Thomas Aquinas',   loc: 'Away', result: '—', upcoming: true },
  { date: 'Feb 6',  opp: 'Blue Valley Northwest',  loc: 'Home', result: '—', upcoming: true },
  { date: 'Feb 13', opp: 'Blue Valley',            loc: 'Away', result: '—', upcoming: true },
  { date: 'Feb 17', opp: 'Bishop Miege',           loc: 'Home', result: '—', upcoming: true },
  { date: 'Feb 20', opp: 'St. James Academy',      loc: 'Away', result: '—', upcoming: true },
];

const HIGHLIGHTS = [
  { title: 'Summer 2023 Phenom Camp Mix', description: 'Los Angeles, CA — competing on the national stage', videoId: 'D99uLbwXy7s' },
  { title: 'Summer 2022 Phenom Camp Mix', description: 'San Diego, CA — first national circuit appearance',  videoId: 'rSJUcL_66c0' },
];

const PLAYER = {
  name: 'Kevin Franz Jr.',
  height: '6\'1"',
  weight: '185',
  position: 'Combo Guard',
  jersey: '30',
  class: '2028',
  school: 'Blue Valley Southwest',
  aau: 'YouHoop 3SSB',
  hand: 'Right',
  gpa: '3.85',
  location: 'Overland Park, KS',
  email: 'Kevinfranz1028@gmail.com',
  phone: '913-396-3717',
};

window.KFJR = { TIMELINE, STATS_2526, SCHEDULE, HIGHLIGHTS, PLAYER };
