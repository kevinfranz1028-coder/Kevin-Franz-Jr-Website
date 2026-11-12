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
