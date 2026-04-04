import path from "node:path";
import Image from "@11ty/eleventy-img";
import { rssPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import postcss from "postcss";
import postcssImport from "postcss-import";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default (eleventyConfig) => {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Transform Markdown images through eleventy-img
  eleventyConfig.addTransform("eleventy-img", async (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    const imgRegex = /<img([^>]*)src="([^"]+)"([^>]*)>/g;
    const replacements = [];

    for (const match of content.matchAll(imgRegex)) {
      const [full, before, src, after] = match;

      if (src.startsWith("data:") || src.startsWith("http")) continue;

      const altMatch = (before + after).match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : "";

      try {
        const inputSrc = src.startsWith("/")
          ? path.join("src", src)
          : path.join(path.dirname(outputPath.replace("_site", "src")), src);

        const metadata = await Image(inputSrc, {
          widths: [400, 800, 1200],
          formats: ["webp", "jpeg"],
          outputDir: path.join("_site", path.dirname(src)),
          urlPath: path.dirname(src),
        });

        const generated = Image.generateHTML(metadata, {
          alt,
          sizes: "(min-width: 70ch) 70ch, 100vw",
          loading: "lazy",
          decoding: "async",
        });

        replacements.push({ full, generated });
      } catch {
        // Leave the original img tag if processing fails
      }
    }

    let result = content;
    for (const { full, generated } of replacements) {
      result = result.replace(full, generated);
    }
    return result;
  });

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
