/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default (eleventyConfig) => {
  eleventyConfig.addCollection("allPosts", (api) =>
    api
      .getAll()
      .filter((p) => p.data.type && ["post", "note", "til"].includes(p.data.type))
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("blogPosts", (api) =>
    api.getFilteredByTag("post").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("notes", (api) =>
    api.getFilteredByTag("note").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("tilPosts", (api) =>
    api.getFilteredByTag("til").sort((a, b) => b.date - a.date)
  );

  // Tags from blog posts and TIL only (not notes)
  eleventyConfig.addCollection("tagList", (api) => {
    const tags = new Set();
    api.getAll().forEach((item) => {
      if (!["post", "til"].includes(item.data.type)) return;
      (item.data.tags || []).forEach((tag) => {
        if (!["post", "til"].includes(tag)) {
          tags.add(tag);
        }
      });
    });
    return [...tags].sort();
  });
};
