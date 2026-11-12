const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/files");

  // Cloudflare Pages configuration
  eleventyConfig.addPassthroughCopy("src/_routes.json");
  eleventyConfig.addPassthroughCopy("src/_headers");

  // Date filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("MMMM dd, yyyy");
  });

  eleventyConfig.addFilter("shortDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("MMM dd");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Limit filter for arrays
  eleventyConfig.addFilter("limit", function(array, n) {
    if (!Array.isArray(array)) return array;
    const limit = parseInt(n, 10);
    if (isNaN(limit)) return array;
    return array.slice(0, limit);
  });

  // Split filter for strings
  eleventyConfig.addFilter("split", function(value, separator = ",") {
    if (value === null || value === undefined) return value;
    if (typeof value !== "string") return value;
    return value.split(separator);
  });

  // One scannable line for a timeline team. Omits any field that was not provided.
  function cardInitials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .filter(function(word) { return word && !/\d/.test(word); })
      .map(function(word) { return word.replace(/[^A-Za-z]/g, ""); })
      .filter(Boolean)
      .map(function(word) { return word[0]; })
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }

  function seasonRank(when) {
    const match = String(when || "").match(/^(Summer|Fall|Winter|Spring)\s+(\d{4})/);
    if (!match) return null;
    const fraction = { Spring: 0, Summer: 0.25, Fall: 0.5, Winter: 0.75 };
    return parseInt(match[2], 10) + fraction[match[1]];
  }

  // One chronological card list for the journey rail. School and AAU teams
  // that share a season stay next to each other, school ball first.
  eleventyConfig.addFilter("journeyCards", function(collection) {
    if (!Array.isArray(collection)) return [];
    const cards = [];
    collection.forEach(function(item) {
      if (!item || !item.data || item.data.listed === false) return;
      const season = item.data.season || "";
      const stage = season === "Elementary" ? "Elementary"
        : (season === "Middle School" || season === "Middle School AAU") ? "Middle School"
        : (season === "High School" || season === "AAU") ? "High School"
        : "Other";
      const kind = (season === "Middle School AAU" || season === "AAU") ? "AAU" : "School";
      const teams = Array.isArray(item.data.teams) && item.data.teams.length ? item.data.teams : [null];
      teams.forEach(function(team) {
        const when = team && team.when ? team.when : "";
        let rank = seasonRank(when);
        if (rank === null) {
          const year = parseInt(String(item.data.year || "").slice(0, 4), 10);
          rank = year ? (year < 2022 ? year : year + 0.6) : (item.data.order || 0);
        }
        const gallery = item.data.gallery && item.data.gallery[0] && item.data.gallery[0].image;
        const image = (team && team.cardImage) || (!team && item.data.cardImage) || (teams.length === 1 && gallery) || "";
        const name = team ? team.name : item.data.team;
        const jersey = team ? team.jersey : item.data.jersey;
        const stats = item.data.stats || {};
        cards.push({
          href: team && team.id ? item.url + "#" + team.id : item.url,
          year: item.data.year || "",
          when: when || item.data.grade || "",
          name: name || "",
          jersey: jersey || "",
          record: team && team.record ? team.record : "",
          ppg: (team && team.ppg) || (!team && stats.ppg) || "",
          rpg: (team && team.rpg) || (!team && stats.rpg) || "",
          apg: (team && team.apg) || (!team && stats.apg) || "",
          honor: team && team.honor ? "Team Captain" : "",
          image: image,
          mark: jersey ? "#" + jersey : cardInitials(name),
          stage: stage,
          kind: kind,
          rank: rank,
          seq: cards.length
        });
      });
    });
    cards.sort(function(a, b) {
      if (a.rank !== b.rank) return a.rank - b.rank;
      if (a.kind !== b.kind) return a.kind === "School" ? -1 : 1;
      return a.seq - b.seq;
    });
    let previous = "";
    cards.forEach(function(card) {
      card.stageLabel = card.stage !== previous ? card.stage : "";
      previous = card.stage;
    });
    return cards;
  });

  // Jersey number when we have one, otherwise up to three initials for the placeholder.
  eleventyConfig.addFilter("cardMark", function(team) {
    if (!team || typeof team !== "object") return "";
    if (team.jersey) return "#" + team.jersey;
    const name = String(team.name || team.team || "").trim();
    if (!name) return "";
    return name
      .split(/\s+/)
      .filter(function(word) { return !/\d/.test(word); })
      .map(function(word) { return word.replace(/[^A-Za-z]/g, ""); })
      .filter(Boolean)
      .map(function(word) { return word[0]; })
      .join("")
      .slice(0, 3)
      .toUpperCase();
  });

  eleventyConfig.addFilter("teamLine", function(team) {
    if (!team || typeof team !== "object") return "";
    const parts = [];
    if (team.record) parts.push(String(team.record));
    if (team.games) parts.push(String(team.games) + " GP");
    if (team.ppg) parts.push(String(team.ppg) + " PPG");
    if (team.rpg) parts.push(String(team.rpg) + " RPG");
    if (team.apg) parts.push(String(team.apg) + " APG");
    if (team.spg) parts.push(String(team.spg) + " SPG");
    return parts.join(" · ");
  });

  // Collections
  eleventyConfig.addCollection("updates", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/updates/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("games", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/games/*.md").sort((a, b) => {
      return a.date - b.date;
    });
  });

  eleventyConfig.addCollection("timeline", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/timeline/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  eleventyConfig.addCollection("footballTimeline", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/football-timeline/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
