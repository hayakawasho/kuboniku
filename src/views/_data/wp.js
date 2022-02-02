// @ts-nocheck
const WP_API_BASE = 'https://hykwsho.sub.jp/kuboniku/wp-json/'
const axios = require('axios')
const format = require('date-fns').format
const parseISO = require('date-fns').parseISO

module.exports = async () => {
  const [rawWorks, rawProfile] = await Promise.all(
    [
      axios.get(WP_API_BASE + 'wp/v2/posts', {
        params: {
          per_page: 99,
          order: 'desc'
        }
      }),
      axios.get(WP_API_BASE + 'wp/v2/pages/490'),
    ]
  )

  return {
    works: {
      total: rawWorks.headers['x-wp-total'],
      items: rawWorks.data.map(i => {
        const acf = i.acf

        const img = (value) => {
          return {
            w: value.width,
            h: value.height,
            src: value.url
          }
        }

        const gallery = acf.gallery === false
          ? false
          : acf.gallery.map(j => img(j))

        return {
          id: i.id,
          title: i.title.rendered,
          slug: i.slug,
          createAt: i.date,
          category: acf.category.name,
          eyecatch: {
            pc: img(acf.eyecatch),
            sp: img(acf.eyecatch_mobile)
          },
          color: acf.theme_color,
          gallery,
          siteUrl: acf.url,
          role: acf.role.map(j => j.name),
        }
      })
    },
    profile: {
      title: rawProfile.data.title.rendered,
      html: rawProfile.data.content.rendered
    }
  }
}
