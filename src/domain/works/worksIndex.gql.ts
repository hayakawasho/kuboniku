import { gql } from 'graphql-request';

const PER_PAGE = 10;

const GET_INITIAL_POSTS = gql`
  query {
    posts(
      where: {
        offsetPagination: { size: ${PER_PAGE} }
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

const GET_OFFSET_POSTS = (offset: number) => {
  const graphql = gql`
    query {
      posts(
        where: {
          offsetPagination: {offset: ${offset},
          size: ${PER_PAGE}}
        }
      ) {
        nodes {
          title
          slug
          acf {
            url
            themeColor
            eyecatch {
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  `;

  return graphql;
};

export { GET_INITIAL_POSTS, GET_POSTS, GET_OFFSET_POSTS };
