import React from 'react';
import SEO from '~/foundation/seo';
import Link from 'next/link';

import client from '~/client/apollo';
import { gql } from '@apollo/client';

const Component = ({ data }) => {
  const { posts } = data;

  return (
    <>
      <SEO title="NAGISA KUBO" />
      <div data-smooth-item />
    </>
  );
};

export default Component;

export const GET_POSTS = gql`
  query {
    posts(first: 5) {
      edges {
        node {
          title
          slug
          acf {
            eyecatch {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      data,
    },
  };
}
