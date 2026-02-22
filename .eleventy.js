const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy({"public": "/"});

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).setLocale('fr').toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("dateToISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd-MM-yyyy");
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = content ? content.split(/\s+/).length : 0;
    const minutes = Math.ceil(words / 200);
    return minutes;
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
