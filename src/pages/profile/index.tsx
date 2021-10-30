import { gql } from 'graphql-request';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { Layout } from '@/common/components';
import { fetcher } from '@/common/lib/fetcher';
import { PageContainer } from '@/features/_pages/profile';

const Component = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="PROFILE">
      <PageContainer {...props} />
    </Layout>
  );
};

export default Component;

export const getStaticProps = async () => {
  const res = await fetcher<any>(GET_PAGE);
  const raw = res.pageBy;
  const paragraph = raw.blocks.map(
    (item: any) => item.originalContent as string
  );

  return {
    props: {
      html: paragraph,
    },
  };
};

const GET_PAGE = gql`
  query MyQuery {
    pageBy(uri: "profile") {
      blocks {
        ... on CoreParagraphBlock {
          name
          originalContent
        }
      }
    }
  }
`;
