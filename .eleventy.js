module.exports = function(eleventyConfig) {
    // Copy these folders directly to the output
    eleventyConfig.addPassthroughCopy("src/styles.css");
    eleventyConfig.addPassthroughCopy("src/script.js");
    eleventyConfig.addPassthroughCopy("src/images");
  
    // Tell Eleventy where your files are and where to put the final website
    return {
      dir: {
        input: "src",          // Where your source files are
        output: "_site",       // Where the final website will be created
        includes: "_includes"  // Where your reusable parts will be stored
      }
    };
  };