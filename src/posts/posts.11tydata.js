const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => {
      return isProduction && data.draft === true;
    },
    permalink: (data) => {
      if (isProduction && data.draft === true) {
        return false;
      }
      // Default permalink: let Eleventy use its own logic per subdirectory
      return data.permalink;
    },
  },
};
