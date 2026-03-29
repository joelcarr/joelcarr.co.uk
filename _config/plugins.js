const path = require("node:path");
const postcss = require("postcss");
const postcssImport = require("postcss-import");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss.rssPlugin);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // Process CSS entry points through PostCSS (partials prefixed with _ are ignored by Eleventy)
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async (inputContent, inputPath) => {
      if (path.basename(inputPath).startsWith("_")) return;
      return async () => {
        const result = await postcss([postcssImport]).process(inputContent, {
          from: inputPath,
        });
        return result.css;
      };
    },
  });
};
