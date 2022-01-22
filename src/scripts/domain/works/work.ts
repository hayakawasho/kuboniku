// import { Post, Post_Acf } from "@/__generated__/graphql"

interface IRawWork {
  post: {
    // acf: Post_Acf
    acf: any
  } & any
}

class Work {
  readonly id
  readonly slug
  readonly title
  readonly category
  readonly eyecatch
  readonly createAt
  readonly role
  readonly viewWebsite
  readonly gallery

  constructor({
    id,
    slug,
    title,
    category,
    eyecatch,
    createAt,
    role,
    viewWebsite,
    gallery,
  }: any) {
    this.id = id
    this.slug = slug
    this.title = title
    this.category = category
    this.eyecatch = eyecatch
    this.createAt = createAt
    this.role = role
    this.viewWebsite = viewWebsite
    this.gallery = gallery
  }

  static fromRaw = (raw: IRawWork['post']) => {
    const id = raw.id
    const slug = raw.slug
    const title = raw.title
    const category = raw.acf?.category?.name
    const eyecatch = {
      src: raw.acf?.eyecatch?.sourceUrl,
      mobile: raw.acf?.eyecatchMobile?.sourceUrl,
    }
    const createAt = raw.date && new Date(raw.date)
    const role = raw.acf.role?.map(item => item?.name)
    const viewWebsite = raw.acf?.url
    const gallery = raw.acf.gallery?.map(item => {
      return {
        width: item?.mediaDetails?.width,
        height: item?.mediaDetails?.height,
        src: item?.sourceUrl,
        srcSet: item?.srcSet,
      }
    })

    return new Work({
      id,
      slug,
      title,
      category,
      eyecatch,
      createAt,
      role,
      viewWebsite,
      gallery,
    })
  }
}

export { Work }
