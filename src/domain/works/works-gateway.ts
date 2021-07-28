import { fetcher } from '@/foundation/lib/fetcher';
import { gql } from 'graphql-request';
import { TRawWorksList, TRawWorksId } from './works-entity';
import { Either, left, right } from '@/foundation/utils';

const GET_POSTS = (offset: number, size: number) => {
  const graphql = gql`
    query {
      posts(
        where: {
          offsetPagination: {offset: ${offset}, size: ${size}}
        }
      ) {
        nodes {
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
        slug
      }
    }
  }
`;

const worksGateway = () => {
  const findOne = async (slug: string): Promise<Either<Error, TRawWorksId>> => {
    const result = await fetcher<TRawWorksId>(GET_POST, { slug })
      .then(res => {
        return right(res);
      })
      .catch(error => {
        return left(error as Error);
      });

    return result;
  };

  const findSome = async (size: number, offset = 0) => {
    const result = await fetcher<TRawWorksList>(GET_POSTS(offset, size))
      .then(res => {
        return right(res);
      })
      .catch(error => {
        return left(error as Error);
      });

    return result;
  };

  const findAllSlug = async () => {
    const result = await fetcher<TRawWorksList>(GET_POST_SLUGS)
      .then(res => {
        return right(res);
      })
      .catch(error => {
        return left(error as Error);
      });

    return result;
  };

  return { findOne, findSome, findAllSlug };
};

export { worksGateway };
