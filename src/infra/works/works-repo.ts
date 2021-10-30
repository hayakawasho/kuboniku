import { gql } from 'graphql-request';
import { Result, ok, err } from 'neverthrow';
import { Post } from '@/__generated__/graphql';
import { fetcher } from '@/common/lib/fetcher';
import { IMetaWork, IRawWork, IWorksRepo } from '@/domain/works';

class WorksRepo extends IWorksRepo {
  constructor() {
    super();
  }

  async findOne(slug: string): Promise<Result<IMetaWork, Error>> {
    try {
      const res = await fetcher<IRawWork>(GET_POST, { slug });
      return ok({
        ...new Work(res.post),
        prev: {
          ...new Work(res.post),
        },
      });
    } catch (error) {
      return err(error);
    }
  }

  async findSome({
    size = 10,
    offset = 0,
  }): Promise<Result<TRawWorksList, Error>> {
    try {
      const res = await fetcher<TRawWorksList>(GET_POSTS(offset, size));
      return ok(res);
    } catch (error) {
      return err(error);
    }
  }

  async findAllSlug(): Promise<Result<TRawWorksList, Error>> {
    try {
      const res = await fetcher<TRawWorksList>(GET_POST_SLUGS);
      return ok(res);
    } catch (error) {
      return err(error);
    }
  }
}

export { WorksRepo };

const GET_POSTS = (offset: number, size: number) => {
  const graphql = gql`
    query {
      posts(
        where: {
          offsetPagination: {offset: ${offset}, size: ${size}}
        }
      ) {
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
  `;

  return graphql;
};

const GET_POST = gql`
  query GET_POST($slug: String) {
    post: postBy(slug: $slug) {
      id
      title
      date
      previous {
        title
        slug
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
`;

const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
    posts(where: { offsetPagination: { size: 99 } }) {
      nodes {
        id
        slug
      }
    }
  }
`;
