// const { readFile, writeFile } = require('fs/promises')
// const Image = require('@11ty/eleventy-img')
// const { createElement } = require('react')
// const { renderToStaticMarkup } = require('react-dom/server')

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  return {
    dir: {
      input: 'transpiled',
      output: '_site',
      // includes: '_includes',
      data: '_data',
    },
  }
}
