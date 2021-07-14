import { gql } from 'graphql-request';
import { fetcher } from '@/foundation/lib/fetcher';
import { TRawWorksList } from '@/domain/model/entity/works';

const GET_POSTS = gql`
  query {
    posts(first: 4) {
      nodes {
        title
        slug
        acf {
          eyecatch {
            sourceUrl
          }
          eyecatchMobile {
            sourceUrl
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

const homeRepository = () => {
  const findAll = async () => {
    return fetcher<TRawWorksList>(GET_POSTS);
  };

  return { findAll };
};

export { homeRepository };
