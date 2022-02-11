// @ts-nocheck
const WP_API_BASE = 'https://hykwsho.sub.jp/kuboniku/wp-json/'
const axios = require('axios')
const format = require('date-fns').format
const parseISO = require('date-fns').parseISO

const pcImgSizeMap = {
  medium: '750w',
  medium_large: '1080w',
  large: '1280w',
  '1536x1536': '1680w',
  '2048x2048': '2048w',
}

const spImgSizeMap = {
  medium: '750w',
  medium_large: '1080w',
}

const srcetPath = (sizes, map) => {
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

const imgVO = (value, map) => {
  return {
    width: value.width,
    height: value.height,
    src: value.url,
    srcset: srcetPath(value.sizes, map)
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
          : i.acf.gallery.map(j => imgVO(j, pcImgSizeMap))

        return {
          id: i.id,
          title: i.title.rendered,
          slug: i.slug,
          createAt: i.date,
          category: i.acf.category.name,
          eyecatch: {
            pc: imgVO(i.acf.eyecatch, pcImgSizeMap),
            sp: imgVO(i.acf.eyecatch_mobile, spImgSizeMap)
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
