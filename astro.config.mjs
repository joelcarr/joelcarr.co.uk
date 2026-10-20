import { satteri } from "@astrojs/markdown-satteri";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://joelcarr.co.uk",
  markdown: {
    // Keep straight quotes and dashes exactly as written in the Markdown
    processor: satteri({ features: { smartPunctuation: false } }),
  },
});
