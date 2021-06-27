import { gql } from 'graphql-request';

export const GET_POSTS = gql`
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
