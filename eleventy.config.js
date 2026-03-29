const collections = require("./_config/collections");
const filters = require("./_config/filters");
const plugins = require("./_config/plugins");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
  // Modules
  collections(eleventyConfig);
  filters(eleventyConfig);
  plugins(eleventyConfig);

  // Pass through static assets (CSS is handled by the PostCSS extension in plugins.js)
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" }, { filter: (p) => !p.endsWith(".css") });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
