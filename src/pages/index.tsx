import React, { useRef, useState } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { fetcher } from '~/foundation/fetcher';
import { Layout } from '~/components/layouts';
import { IData } from '~/domain/home.model';
import { HomeContainer } from '~/components/pages/home';
interface IProps {
  data: IData;
}

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

const Component: NextPage<IProps> = props => {
  const initialData = props.data;

  return (
    <Layout title="NAGISA KUBO">
      <HomeContainer initialData={initialData} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher(GET_POSTS);
  return {
    data,
  };
};
