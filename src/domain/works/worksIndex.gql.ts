import { gql } from 'graphql-request';

const GET_INITIAL_POSTS = gql`
  query {
    posts(
      where: {
        offsetPagination: { size: 10 }
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
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

const GET_OFFSET_POSTS = (offset: number, size: number) => {
  const graphql = gql`
    query {
      posts(
        where: {
          offsetPagination: {offset: ${offset},
          size: ${size}}
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

export { GET_INITIAL_POSTS, GET_OFFSET_POSTS };
