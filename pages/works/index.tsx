import React, { useEffect, Suspense } from 'react';
import Seo from '~/components/seo';
import { motion } from 'framer-motion';
import Layout from '~/components/layout';
import Heading from '~/components/works/heading';
import EntryList from '~/components/works/entryList';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';
import { fetcher } from '~/lib/fetcher';
import { useInView } from 'react-intersection-observer';
import { transition } from '~/animations/index';

interface IProps {
  data;
}

const Component: React.FC<IProps> = props => {
  const { data, error } = useSWR(WP_API_END_POINT, fetcher, {
    initialData: props.data,
  });
  const { edges, pageInfo } = data;
  const { total } = pageInfo.offsetPagination;

  const [loaderRef, inView] = useInView({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {};

  return (
    <Layout>
      <Seo title="WORKS" />
      <motion.div
        data-controller="skew"
        data-skew-options='{ "val": 1.6 }'
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <Heading total={total} />
        <EntryList posts={edges} total={total} />
        {error ? <div>Load error</div> : <div ref={loaderRef} />}
      </motion.div>
    </Layout>
  );
};

export default Component;

const getQuery = (offset: number) => {
  const graphql = gql`
    query {
      posts(where: {
        orderby: {field: DATE, order: DESC},
        offsetPagination: {offset: ${offset}, size: 10}}
      ) {
        edges {
          node {
            title
            slug
            acf {
              url
              themeColor
              eyecatch {
                sourceUrl
              }
            }
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

export async function getServerSideProps() {
  const query = getQuery(0);
  const { posts } = await fetcher(query);
  return {
    props: {
      data: posts,
    },
  };
}
