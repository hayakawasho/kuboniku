import type { Work as _WorkType } from './type'

/*
const createSrcset = (sizes, map) => {
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
    this.srcset = createSrcset(value.sizes, sizeMap)
  }
}

const Work = (): WorkType => {
  return {

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
*/
