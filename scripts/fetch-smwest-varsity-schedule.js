#!/usr/bin/env node
/**
 * Pull Shawnee Mission West varsity boys basketball from the school's
 * Bound ICS feed and write src/_data/smWestVarsitySchedule.json.
 *
 * A failed or empty fetch leaves the last good file in place.
 * This script does not invent games.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const SOURCE_URL = process.env.SCHEDULE_ICS_URL || "https://www.gobound.com/ks/schools/shawneemissionwesths/calendar/ical";
const CALENDAR_PAGE = "https://www.gobound.com/ks/schools/shawneemissionwesths/calendar";
const OUT = path.join(__dirname, "..", "src/_data/smWestVarsitySchedule.json");
const OVERRIDES = path.join(__dirname, "..", "src/_data/scheduleOverrides.json");
const SEASON_START = "20261101";
const SEASON_END = "20270331";
const SCHOOL = /shawnee mission west/i;

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        "User-Agent": "KevinFranzJrWebsite/schedule-fetch",
        Accept: "text/calendar, text/plain, */*"
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        resolve(fetchText(new URL(res.headers.location, url).href));
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error("HTTP " + res.statusCode + " from " + url));
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
    req.setTimeout(30000, () => req.destroy(new Error("Timed out fetching " + url)));
    req.on("error", reject);
  });
}

function unfold(ics) {
  return ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
}

function unescapeText(value) {
  return value
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .replace(/\s+/g, " ")
    .trim();
}

function parseEvents(ics) {
  const events = [];
  const chunks = unfold(ics).split("BEGIN:VEVENT").slice(1);
  chunks.forEach((chunk) => {
    const body = chunk.split("END:VEVENT")[0];
    const fields = {};
    body.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).split(";")[0].toUpperCase();
      if (!fields[key]) fields[key] = unescapeText(line.slice(idx + 1));
    });
    if (fields.SUMMARY && fields.DTSTART) events.push(fields);
  });
  return events;
}

function isVarsityBoys(summary) {
  if (!/Boys Basketball:/i.test(summary)) return false;
  if (/Junior Varsity/i.test(summary)) return false;
  if (/Girls/i.test(summary)) return false;
  return /\(Varsity\)\s*$/i.test(summary);
}

function formatDate(stamp) {
  const year = Number(stamp.slice(0, 4));
  const month = Number(stamp.slice(4, 6));
  const day = Number(stamp.slice(6, 8));
  const dt = new Date(Date.UTC(year, month - 1, day));
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    date: stamp.slice(0, 4) + "-" + stamp.slice(4, 6) + "-" + stamp.slice(6, 8),
    displayDate: days[dt.getUTCDay()] + ", " + months[month - 1] + " " + day + ", " + year
  };
}

function formatClock(stamp) {
  if (!/T\d{6}$/.test(stamp)) return "";
  const hour = Number(stamp.slice(9, 11));
  const minute = stamp.slice(11, 13);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return hour12 + ":" + minute + " " + suffix;
}

function durationMinutes(start, end) {
  if (!/T\d{6}$/.test(start) || !/T\d{6}$/.test(end)) return null;
  const toMinutes = (stamp) => {
    const day = Number(stamp.slice(6, 8));
    const hour = Number(stamp.slice(9, 11));
    const minute = Number(stamp.slice(11, 13));
    return day * 1440 + hour * 60 + minute;
  };
  return toMinutes(end) - toMinutes(start);
}

function opponentFromSummary(summary) {
  const match = summary.match(/Boys Basketball:\s*(.*?)\s*\(Varsity\)\s*$/i);
  const body = match ? match[1].trim() : "";
  if (!body) return { opponent: "", tournamentBlock: false };
  const sides = body.split(/\s+vs\s+/i);
  if (sides.length === 1) {
    return { opponent: body, tournamentBlock: true };
  }
  if (sides.length !== 2) return { opponent: "", tournamentBlock: false };
  const left = sides[0].trim();
  const right = sides[1].trim();
  const leftSchool = SCHOOL.test(left);
  const rightSchool = SCHOOL.test(right);
  if (leftSchool === rightSchool) return { opponent: "", tournamentBlock: false };
  return { opponent: leftSchool ? right : left, tournamentBlock: false };
}

function gamesFromEvents(events) {
  const games = [];
  events.forEach((event) => {
    const summary = event.SUMMARY || "";
    const stamp = (event.DTSTART || "").replace(/Z$/, "");
    const day = stamp.slice(0, 8);
    if (!isVarsityBoys(summary)) return;
    if (day < SEASON_START || day > SEASON_END) return;
    const parsed = opponentFromSummary(summary);
    if (!parsed.opponent) {
      throw new Error("Could not read an opponent from: " + summary);
    }
    const location = event.LOCATION || "";
    const when = formatDate(stamp);
    const startTime = formatClock(stamp);
    const endTime = formatClock((event.DTEND || "").replace(/Z$/, ""));
    const minutes = durationMinutes(stamp, (event.DTEND || "").replace(/Z$/, ""));
    const time = minutes !== null && minutes >= 180 && endTime
      ? startTime + "–" + endTime
      : (startTime || "Time not listed");
    const homeAway = location
      ? (SCHOOL.test(location) ? "Home" : "Away")
      : "";
    const game = {
      date: when.date,
      displayDate: when.displayDate,
      time: time,
      opponent: parsed.opponent,
      homeAway: homeAway,
      location: location,
      summary: summary
    };
    if (parsed.tournamentBlock) {
      game.note = "The feed lists this as a tournament block. Individual opponents and tip times are not in the feed.";
    }
    games.push(game);
  });
  games.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time) || a.summary.localeCompare(b.summary));
  return games;
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUT, "utf8"));
  } catch (error) {
    return null;
  }
}

function keepLastGood(reason) {
  const existing = readExisting();
  if (existing && Array.isArray(existing.games) && existing.games.length) {
    console.warn("Schedule fetch kept the last good file (" + existing.games.length + " games). " + reason);
    process.exit(0);
  }
  console.error("Schedule fetch failed and there is no saved schedule. " + reason);
  process.exit(1);
}

function sameGames(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function loadOverrides() {
  const data = JSON.parse(fs.readFileSync(OVERRIDES, "utf8"));
  if (!data || !Array.isArray(data.overrides)) {
    throw new Error("scheduleOverrides.json has no overrides array.");
  }
  return data.overrides;
}

function applyOverrides(games, overrides) {
  const used = new Set();
  const next = games.map((game) => {
    const index = overrides.findIndex((item, itemIndex) => {
      if (used.has(itemIndex)) return false;
      if (item.date !== game.date) return false;
      const needle = String(item.matchOpponent || "").toLowerCase();
      return needle && String(game.opponent || "").toLowerCase().includes(needle);
    });
    if (index === -1) return game;
    used.add(index);
    const item = overrides[index];
    const updated = Object.assign({}, game);
    ["time", "opponent", "homeAway", "location"].forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(item, key)) updated[key] = item[key];
    });
    if (item.note) updated.note = item.note;
    return updated;
  });
  const missed = overrides.filter((item, index) => !used.has(index));
  if (missed.length) {
    throw new Error("Unmatched schedule override: " + missed.map((item) => item.date + " " + item.matchOpponent).join("; "));
  }
  return next;
}

async function main() {
  let ics;
  try {
    ics = await fetchText(SOURCE_URL);
  } catch (error) {
    keepLastGood(error.message);
    return;
  }
  if (!/BEGIN:VCALENDAR/.test(ics) || !/BEGIN:VEVENT/.test(ics)) {
    keepLastGood("Response was not an ICS calendar.");
    return;
  }
  let games;
  try {
    games = gamesFromEvents(parseEvents(ics));
  } catch (error) {
    keepLastGood(error.message);
    return;
  }
  if (!games.length) {
    keepLastGood("The feed had no 2026-27 varsity boys basketball events.");
    return;
  }
  try {
    games = applyOverrides(games, loadOverrides());
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  const existing = readExisting();
  if (existing && Array.isArray(existing.games) && existing.games.length >= 10 && games.length * 2 < existing.games.length) {
    keepLastGood("The new feed listed " + games.length + " games, fewer than half of the saved " + existing.games.length + ".");
    return;
  }
  const payload = {
    sourceUrl: SOURCE_URL,
    calendarPage: CALENDAR_PAGE,
    sourceName: "Shawnee Mission West Bound athletics calendar",
    season: "2026-27",
    team: "Varsity Boys Basketball",
    school: "Shawnee Mission West",
    fetchedAt: new Date().toISOString(),
    games: games
  };
  if (existing && sameGames(existing.games, games)) {
    console.log("Schedule unchanged (" + games.length + " games). Left " + path.relative(process.cwd(), OUT) + " as-is.");
    return;
  }
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + "\n");
  console.log("Wrote " + games.length + " varsity games to " + path.relative(process.cwd(), OUT));
}

main();
