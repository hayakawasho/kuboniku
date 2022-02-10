// @ts-nocheck
const WP_API_BASE = 'https://hykwsho.sub.jp/kuboniku/wp-json/'
const axios = require('axios')
const format = require('date-fns').format
const parseISO = require('date-fns').parseISO

const pcImgSizeMap = {
  medium: '750w',
  medium_large: '1080w',
  large: '1280w',
  '1536x1536': '1536w',
  '2048x2048': '2048w',
}

const mobileImgSizeMap = {
  medium: '750w',
  medium_large: '1080w',
}

const imgSrcetPath = (sizes, map) => {
  if(!sizes) {
    return
  }

  return Object.entries(sizes).reduce((acc, [key, value]) => {
    if(map[key]) {
      acc.push(`${value} ${map[key]}`)
    }
    return acc
  }, [])
};

const imgObj = (value, map) => {
  return {
    width: value.width,
    height: value.height,
    src: value.url,
    srcset: imgSrcetPath(value.sizes, map)
  }
}

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
      items: rawWorks.data.map((i, index) => {
        const gallery = i.acf.gallery === false
          ? false
          : i.acf.gallery.map(j => imgObj(j, pcImgSizeMap))

        return {
          id: i.id,
          title: i.title.rendered,
          slug: i.slug,
          createAt: i.date,
          category: i.acf.category.name,
          eyecatch: {
            pc: imgObj(i.acf.eyecatch, pcImgSizeMap),
            sp: imgObj(i.acf.eyecatch_mobile, mobileImgSizeMap)
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
