// @ts-nocheck
const WP_API_BASE = 'https://hykwsho.sub.jp/kuboniku/wp-json/'
const axios = require('axios')
const format = require('date-fns').format
const parseISO = require('date-fns').parseISO

module.exports = async () => {
  const rawWorks = await axios.get(WP_API_BASE + 'wp/v2/posts', {
    params: {
      per_page: 99,
      order: 'desc'
    }
  })

  const metaWorks = rawWorks.data.map(i => {
    const eyecatch = i.acf.eyecatch
    const eyecatchMobile = i.acf.eyecatch_mobile

    return {
      id: i.id,
      h1: i.title.rendered,
      slug: i.slug,
      createAt: {
        date: i.date,
        format: format(parseISO(i.date), "MMMM d, yyyy")
      },
      category: i.acf.category.name,
      eyecatch: {
        pc: {
          w: eyecatch.width,
          h: eyecatch.height,
          aspect: eyecatch.height / eyecatch.width,
          src: eyecatch.url
        },
        sp: {
          w: eyecatchMobile.width,
          h: eyecatchMobile.height,
          aspect: eyecatchMobile.height / eyecatchMobile.width,
          src: eyecatchMobile.url
        }
      },
      color: i.acf.theme_color,
      gallery: i.acf.gallery,
      siteUrl: i.acf.url,
      role: i.acf.role.map(j => j.name),
    }
  })

  const rawProfile = await axios.get(WP_API_BASE + 'wp/v2/pages/490')

  return {
    works: {
      total: rawWorks.headers['x-wp-total'],
      items: metaWorks
    },
    profile: {
      h1: rawProfile.data.title.rendered,
      html:rawProfile.data.content.rendered
    }
  }
}
