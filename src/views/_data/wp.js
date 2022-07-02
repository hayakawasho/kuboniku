// @ts-nocheck
const WP_API_BASE = 'https://hykwsho.sub.jp/kuboniku/wp-json/'
const axios = require('axios')
const format = require('date-fns').format
const parseISO = require('date-fns').parseISO

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

const srcsetpath = (sizes, map) => {
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
    this.srcset = srcsetpath(value.sizes, sizeMap)
  }
}

class WorksGallery {
  constructor(raw) {
    this.value = raw.acf.gallery.map(img => new Img(img, PC_IMG_SIZE_MAP)) || false
  }
}

class Works {
  constructor(raw) {
    this.id = raw.id
    this.title = raw.title.rendered
    this.slug = raw.slug
    this.createAt = raw.date
    this.category = raw.acf.category.name

    this.eyecatch = {
      pc: new Img(raw.acf.eyecatch, PC_IMG_SIZE_MAP),
      sp: new Img(raw.acf.eyecatch_mobile, SP_IMG_SIZE_MAP),
    }

    this.gallery = new WorksGallery(raw).value

    this.color = raw.acf.theme_color
    this.siteUrl = raw.acf.url
    this.role = raw.acf.role.map(j => j.name)
  }
}

module.exports = async () => {
  const postsParam = {
    per_page: 99,
    order: 'desc',
  }

  const [rawWorks, rawProfile] = await Promise.all([
    axios.get(WP_API_BASE + 'wp/v2/posts', { params: postsParam }),
    axios.get(WP_API_BASE + 'wp/v2/pages/490'),
  ])

  const works = {
    total: rawWorks.headers['x-wp-total'],
    items: rawWorks.data.map((raw, index) => new Works(raw)),
  }

  const profile = {
    title: rawProfile.data.title.rendered,
    html: rawProfile.data.content.rendered,
  }

  return {
    works,
    profile,
  }
}
