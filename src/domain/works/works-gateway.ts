import { fetcher } from '@/foundation/lib/fetcher';
import { gql } from 'graphql-request';
import { TRawWorksList, TRawWorksId } from './works-entity';
import { Result, ok, err } from 'neverthrow';

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
  const findOne = async (slug: string): Promise<Result<TRawWorksId, Error>> => {
    try {
      const res = await fetcher<TRawWorksId>(GET_POST, { slug });
      return ok(res);
    } catch (error) {
      return err(error);
    }
  };

  const findSome = async (
    size: number,
    offset = 0
  ): Promise<Result<TRawWorksList, Error>> => {
    try {
      const res = await fetcher<TRawWorksList>(GET_POSTS(offset, size));
      return ok(res);
    } catch (error) {
      return err(error);
    }
  };

  const findAllSlug = async (): Promise<Result<TRawWorksList, Error>> => {
    try {
      const res = await fetcher<TRawWorksList>(GET_POST_SLUGS);
      return ok(res);
    } catch (error) {
      return err(error);
    }
  };

  return { findOne, findSome, findAllSlug };
};

export { worksGateway };
