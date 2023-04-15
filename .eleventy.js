const Image = require('@11ty/eleventy-img')
const outdent = require('outdent')

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  eleventyConfig.addJavaScriptFunction('image', imageShortcode)

  return {
    dir: {
      input: 'transpiled',
      output: '_site',
      data: '_data',
    },
  }
}

//----------------------------------------------------------------

const createImageMetadata = (src, widths, formats) => {
  return Image(src, {
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: '_site/assets/img',
    urlPath: '/assets/img',
    sharpPngOptions: {
      quality: 80,
    },
    sharpJpegOptions: {
      mozjpeg: true,
    },
  })
}

const createImgHtmlString = (img, alt = '', className = '', ...attrs) => {
  return `<img src="${img.url}" width="${img.width}" height="${img.height}" decoding="async" alt="${alt}" class="${className}" ${attrs}>`
}

const createSourceHtmlString = (imageMetadata, sizes, media) => {
  return Object.values(imageMetadata)
    .map(images => {
      const { sourceType } = images[0]
      const { width, height } = images[images.length - 1]

      return `<source
        type="${sourceType}"
        width="${width}"
        height="${height}"
        srcset="${images.map(image => image.srcset).join(', ')}"
        sizes="${sizes}"
        media="${media}"
      >`
    })
    .join('\n')
}

const getLargestImage = (imageMetadata, format) => {
  const images = imageMetadata[format]
  return images[images.length - 1]
}

const imageShortcode = async (
  src,
  alt = '',
  className = '',
  widths = [400, 800, 1280],
  formats = ['webp', 'jpeg'],
  sizes = '100vw'
) => {
  const imageMetadata = await createImageMetadata(src, widths, formats)
  const largestUnoptimizedImg = getLargestImage(imageMetadata, formats[0])
  const sourceHtmlString = createSourceHtmlString(imageMetadata, sizes, '(min-width:640px)')
  const imgHtmlString = createImgHtmlString(largestUnoptimizedImg, alt, className)

  const picture = `<picture>
    ${sourceHtmlString}
    ${imgHtmlString}
  </picture>`

  return outdent`${picture}`
}
