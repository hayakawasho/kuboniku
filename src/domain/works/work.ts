import { Post, Post_Acf } from "@/__generated__/graphql"

interface IRawWork {
  post: {
    acf: Post_Acf
  } & Post
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

  static fromRaw = (raw: IRawWork) => {
    const id = raw.post.id
    const slug = raw.post.slug
    const title = raw.post.title
    const category = raw.post.acf.category?.name
    const eyecatch = {
      src: raw.post.acf.eyecatch?.sourceUrl,
      mobile: raw.post.acf.eyecatchMobile?.sourceUrl,
    }
    const createAt = raw.post.date && new Date(raw.post.date)
    const role = raw.post.acf.role?.map(item => item?.name)
    const viewWebsite = raw.post.acf.url
    const gallery = raw.post.acf.gallery?.map(item => {
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
