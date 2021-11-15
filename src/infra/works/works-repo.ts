import { gql, request } from "graphql-request"
import { ok, err } from "neverthrow"
import { WP_API_END_POINT } from "@/common/constants/const"
import { handleHttpError } from "@/common/errors"
import { IWorksRepo, Work } from "@/domain/works"

class WorksRepo extends IWorksRepo {
  constructor() {
    super()
  }

  async findOne(slug: string): ReturnType<IWorksRepo["findOne"]> {
    try {
      const res = await request<any>(WP_API_END_POINT, GET_POST, { slug })
      const entity = {
        ...Work.fromRaw(res.post),
        prev: {
          ...Work.fromRaw(res.post.previous),
        },
      }
      return ok(entity)
    } catch (e) {
      return err(handleHttpError(e))
    }
  }

  async findSome({
    where,
  }: Parameters<IWorksRepo["findSome"]>[number]): ReturnType<
    IWorksRepo["findSome"]
  > {
    try {
      const res = await request<any>(WP_API_END_POINT, GET_POSTS, {
        offset: where.offset,
        size: where.size,
      })
      return ok(res)
    } catch (e) {
      return err(handleHttpError(e))
    }
  }

  async findAllSlug(): ReturnType<IWorksRepo["findAllSlug"]> {
    try {
      const res = await request<any>(WP_API_END_POINT, GET_POST_SLUGS)
      return ok(res)
    } catch (e) {
      return err(handleHttpError(e))
    }
  }
}

export { WorksRepo }

const GET_POSTS = gql`
  query GET_POSTS($offset: Number, $size: Number) {
    posts(where: { offsetPagination: { offset: $offset, size: $size } }) {
      nodes {
        id
        title
        slug
        acf {
          eyecatch {
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
          category {
            name
          }
          themeColor
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`

const GET_POST = gql`
  query GET_POST($slug: String) {
    post: postBy(slug: $slug) {
      id
      title
      date
      slug
      previous {
        id
        title
        slug
        date
        acf {
          eyecatch {
            sourceUrl
            srcSet
          }
          eyecatchMobile {
            sourceUrl
            srcSet
          }
        }
      }
      acf {
        eyecatch {
          sourceUrl
          srcSet
        }
        eyecatchMobile {
          sourceUrl
          srcSet
        }
        category {
          name
        }
        role {
          name
        }
        themeColor
        url
        gallery {
          sourceUrl
          srcSet
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`

const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts(where: { offsetPagination: { size: 99 } }) {
      nodes {
        id
        slug
      }
    }
  }
`
