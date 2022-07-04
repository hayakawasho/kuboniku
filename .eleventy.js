const Image = require('@11ty/eleventy-img')
const format = require('date-fns').format
const parseISO = require('date-fns').parseISO

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  eleventyConfig.addNunjucksFilter('day', dayFilter)
  eleventyConfig.addNunjucksFilter('zeroPadding', zeroPadding)

  // Configuration
  return {
    dir: {
      input: 'src/views',
      output: '_site',
      includes: '_inc',
      data: '_data',
    },
  }
}

//-----//
async function imageShortcode(
  src,
  cls,
  alt,
  originalFormat = 'jpeg',
  sizes = '100vw',
  widths = [null]
) {
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
  }

  const metadata = await Image(src, {
    widths: widths,
    formats: ['webp', originalFormat],
    urlPath: '/assets/img/',
    outputDir: './_site/assets/img/',
  })

  const originalSrc = metadata[`${originalFormat}`]
  const lowsrc = originalSrc[0]
  const highsrc = originalSrc[originalSrc.length - 1]

  return `<picture>
    ${Object.values(metadata)
      .map(imageFormat => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map(entry => entry.srcset)
          .join(', ')}" sizes="${sizes}">`
      })
      .join('\n')}
      <img
        class="${cls}"
        src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        decoding="async"
        loading="lazy"
      />
    </picture>`
}

function dayFilter(date, formatType = 'MMMM d, yyyy') {
  return format(parseISO(date), formatType)
}

function zeroPadding(num, length = 2) {
  return String(num).padStart(length, '0')
}
