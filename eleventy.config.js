import collections from "./_config/collections.js";
import filters from "./_config/filters.js";
import plugins from "./_config/plugins.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default (eleventyConfig) => {
  collections(eleventyConfig);
  filters(eleventyConfig);
  plugins(eleventyConfig);

  // Pass through static assets (CSS is handled by the PostCSS extension in plugins.js)
  eleventyConfig.addPassthroughCopy(
    { "src/assets": "assets" },
    { filter: (p) => !p.endsWith(".css") },
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
