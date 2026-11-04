const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/files");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Cloudflare Pages configuration
  eleventyConfig.addPassthroughCopy("src/_routes.json");
  eleventyConfig.addPassthroughCopy("src/_headers");

  // The 2025-26 JV season file is named with dashes (jv-2025-26.json), which is
  // not a usable identifier in Nunjucks — expose it under a clean alias.
  eleventyConfig.addGlobalData("jvSeason", () =>
    require("./src/_data/jv-2025-26.json")
  );

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

  // Always show one decimal place (4 -> "4.0") for per-game averages
  eleventyConfig.addFilter("oneDp", function(value) {
    const n = parseFloat(value);
    return isNaN(n) ? value : n.toFixed(1);
  });

  // Drop empty/falsy entries from an array (used to hide profile links with no URL yet)
  eleventyConfig.addFilter("compact", function(array) {
    if (!Array.isArray(array)) return array;
    return array.filter(Boolean);
  });

  // Keep only list entries whose given key has a truthy value
  eleventyConfig.addFilter("hasValue", function(array, key) {
    if (!Array.isArray(array)) return array;
    return array.filter((item) => item && item[key]);
  });

  // Absolute URL for canonical / OG tags
  eleventyConfig.addFilter("absoluteUrl", function(url, base) {
    try {
      return new URL(url, base || "https://kevinfranzjr.com").href;
    } catch (e) {
      return url;
    }
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
      return (b.data.order || 0) - (a.data.order || 0);
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
