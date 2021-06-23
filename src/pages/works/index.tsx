import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { useSWRInfinite } from 'swr';
import { gql } from 'graphql-request';
import { fetcher } from '~/foundation/fetcher';
import { Layout } from '~/components/layouts';
import { WorksContainer } from '~/components/pages/works';

const PER_PAGE = 10;

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

const Component: NextPage = props => {
  return (
    <Layout title="WORKS">
      <WorksContainer data={{}} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {};
/*
interface IData {
  posts: {
    nodes: TEntryData[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}

interface IProps {
  data: IData;
  total: number;
}

const PER_PAGE = 10;

const Component: NextPage<IProps> = props => {
  const initialData = props.data;
  const totalPost = props.total;
  const totalPage = totalPost / PER_PAGE;
  const loadCount = useRef(1);
  // const [result, status, {  }] = useRequestWorks()
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    index => getQuery(index * PER_PAGE),
    fetcher,
    {
      revalidateOnFocus: false,
      initialData: [initialData],
    }
  );
  const chunkedPostData = data ? [].concat(...data) : [];
  const [entryLoaderRef, inView] = useInView({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView && !isValidating && loadCount.current < totalPage) {
      setSize(size + 1).then(() => loadCount.current++);
    }
  }, [inView]);

  return (
    <Layout title="WORKS">
      <WorksContainer />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {

};


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
*/
