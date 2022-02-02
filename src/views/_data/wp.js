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
        const img = (value) => {
          return {
            width: value.width,
            height: value.height,
            src: value.url
          }
        }

        const gallery = i.acf.gallery === false
          ? false
          : i.acf.gallery.map(j => img(j))

        return {
          id: i.id,
          title: i.title.rendered,
          slug: i.slug,
          createAt: i.date,
          category: i.acf.category.name,
          eyecatch: {
            pc: img(i.acf.eyecatch),
            sp: img(i.acf.eyecatch_mobile)
          },
          color: i.acf.theme_color,
          gallery,
          siteUrl: i.acf.url,
          role: i.acf.role.map(j => j.name),
        }
      })
    },
    profile: {
      title: rawProfile.data.title.rendered,
      html: rawProfile.data.content.rendered
    }
  }
}
