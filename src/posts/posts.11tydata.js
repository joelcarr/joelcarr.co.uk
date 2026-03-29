const isProduction = process.env.NODE_ENV === "production";

export default {
  eleventyComputed: {
    eleventyExcludeFromCollections: (data) => {
      return isProduction && data.draft === true;
    },
    permalink: (data) => {
      if (isProduction && data.draft === true) {
        return false;
      }
      return data.permalink;
    },
  },
};
