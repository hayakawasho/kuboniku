// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const axios = require('axios')

const WP_API_BASE = 'http://localhost:8888/wp-json/'
const WP_API = process.env.WP_API_BASE || WP_API_BASE

const PC_IMG_SIZE_MAP = {
  medium: '750w',
  medium_large: '1080w',
  large: '1280w',
  '1536x1536': '1680w',
  '2048x2048': '2048w',
}

const SP_IMG_SIZE_MAP = {
  medium: '750w',
  medium_large: '1080w',
}

const createImgSrcSet = (sizes, map) => {
  if (!sizes) {
    return
  }

  const result = Object.entries(sizes).reduce((acc, [key, value]) => {
    if (map[key]) {
      acc.push(`${value} ${map[key]}`)
    }
    return acc
  }, [])

  return String(result)
}

class Img {
  constructor(value, sizeMap) {
    this.width = value.width
    this.height = value.height
    this.src = value.url
    this.srcset = createImgSrcSet(value.sizes, sizeMap)
  }
}

class Works {
  constructor(raw) {
    this.id = raw.id
    this.title = raw.title.rendered
    this.slug = raw.slug
    this.createAt = raw.date
    this.category = raw.acf.category.name

    this.eyecatch = new Img(raw.acf.eyecatch, PC_IMG_SIZE_MAP)
    this.eyecatchMobile = new Img(raw.acf.eyecatch_mobile, SP_IMG_SIZE_MAP)

    const createGallery = images => images.map(img => new Img(img, PC_IMG_SIZE_MAP))
    this.gallery = createGallery(raw.acf.gallery || [])

    this.color = raw.acf.theme_color
    this.siteUrl = raw.acf.url
    this.role = raw.acf.role.map(j => j.name)
  }
}

module.exports = async () => {
  // const [responseWorks, responseProfile] = await Promise.all([
  //   fetch(
  //     `${WP_API}wp/v2/posts?${new URLSearchParams({
  //       per_page: 99,
  //       order: 'desc',
  //     })}`
  //   ),
  //   fetch(WP_API + 'wp/v2/pages/490'),
  // ])
  //
  // const totalResultWorks = responseWorks.headers.get('x-wp-total')
  //
  // const rawWorks = await responseWorks.json()
  // const rawProfile = await responseProfile.json()

  const [rawWorks, rawProfile] = await Promise.all([
    axios.get(WP_API + 'wp/v2/posts', {
      params: {
        per_page: 99,
        order: 'desc',
      },
    }),
    axios.get(WP_API + 'wp/v2/pages/490'),
  ])

  const totalResultWorks = rawWorks.headers['x-wp-total']

  return {
    works: {
      total: totalResultWorks,
      items: rawWorks.data.map((raw, _index) => new Works(raw)),
    },

    profile: {
      title: rawProfile.data.title.rendered,
      html: rawProfile.data.content.rendered,
    },
  }
}
