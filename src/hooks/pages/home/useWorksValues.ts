import { useCallback } from 'react';
import { useRequest } from '~/hooks/useRequest';
import { IWorks } from '~/domain/works';
import { request, gql } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

const useWorksValues = variables => {
  // const [data, status] = useRequest<IWorks>('works', ({ ok, error }) => {});

  return [status] as const;
};

export { useWorksValues };

const PER_PAGE = 10;

const getQuery = (offset: number) => {
  const graphql = gql`
    query {
      posts(where: { offsetPagination: {offset: ${offset}, size: ${PER_PAGE}} }) {
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

const GET_INITIAL_POSTS = gql`
  query {
    posts(
      where: { offsetPagination: { size: ${PER_PAGE} } }) {
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
