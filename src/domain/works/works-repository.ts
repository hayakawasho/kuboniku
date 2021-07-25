import { fetcher } from '@/foundation/lib/fetcher';
import { gql } from 'graphql-request';
import { TRawWorksList, TRawWorksId } from './works-entity';

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

const worksRepository = () => {
  const findById = async (slug: string) => {
    return fetcher<TRawWorksId>(GET_POST, { slug });
  };

  const findArray = async (size: number, offset = 0) => {
    return fetcher<TRawWorksList>(GET_POSTS(offset, size));
  };

  return { findById, findArray };
};

export { worksRepository };
