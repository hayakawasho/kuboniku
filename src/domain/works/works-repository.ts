import { fetcher } from '@/foundation/lib/fetcher';
import { gql } from 'graphql-request';
import { TRawWorksList } from '@/domain/model/entity/works';

const GET_INITIAL_POSTS = gql`
  query {
    posts(where: { offsetPagination: { size: 10 } }) {
      nodes {
        title
        slug
        acf {
          eyecatch {
            sourceUrl
            srcSet
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

const GET_OFFSET_POSTS = (offset: number) => {
  const graphql = gql`
    query {
      posts(
        where: {
          offsetPagination: {offset: ${offset}, size: 10}
        }
      ) {
        nodes {
          title
          slug
          acf {
            eyecatch {
              sourceUrl
              srcSet
            }
            category {
              name
            }
            themeColor
          }
        }
      }
    }
  `;

  return graphql;
};

const worksRepository = () => {
  const findInitial = async () => {
    return fetcher<TRawWorksList>(GET_INITIAL_POSTS);
  };

  const findOffset = async (offset: number) => {
    return fetcher<TRawWorksList>(GET_OFFSET_POSTS(offset));
  };

  return { findOffset, findInitial };
};

export { worksRepository };
