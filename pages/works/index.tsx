import React, { useState } from 'react';
import Seo from '~/components/seo';
import client from '~/client/apollo';
import { gql } from '@apollo/client';
import { motion } from 'framer-motion';
import Layout from '~/components/layout';
import Heading from '~/components/works/heading';
import EntryList from '~/components/works/entryList';

const Component = ({ data }) => {
  const { posts } = data;
  const { total } = posts.pageInfo.offsetPagination;

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
        <EntryList posts={posts.edges} total={total} />
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_INITIAL_POSTS,
  });

  return {
    props: {
      data,
    },
  };
}
