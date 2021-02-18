import React from 'react';
import Seo from '~/components/seo';
import { motion } from 'framer-motion';
import Layout from '~/components/layout';
import Heading from '~/components/works/heading';
import EntryList from '~/components/works/entryList';
import useSWR from 'swr';
import { request, gql } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

interface IProps {
  data;
}

const Component: React.FC<IProps> = props => {
  const { data } = useSWR(WP_API_END_POINT, fetcher, {
    initialData: props.data,
  });
  const { edges, pageInfo } = data;
  const { total } = pageInfo.offsetPagination;

  return (
    <Layout>
      <Seo title="WORKS" />
      <motion.div
        data-controller="skew"
        data-skew-options='{ "val": 1.6 }'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.18, 0.06, 0.23, 1],
        }}
      >
        <Heading total={total} />
        <EntryList posts={edges} total={total} />
      </motion.div>
    </Layout>
  );
};

export default Component;

export const GET_INITIAL_POSTS = gql`
  query {
    posts(where: { orderby: { field: DATE, order: DESC } }) {
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

const fetcher = query => request(WP_API_END_POINT, query);

export async function getStaticProps() {
  const { posts } = await fetcher(GET_INITIAL_POSTS);
  return {
    props: {
      data: posts,
    },
  };
}
