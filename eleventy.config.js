/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/site.css");
  eleventyConfig.setBrowserSyncConfig({
    files: "assets/"
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
