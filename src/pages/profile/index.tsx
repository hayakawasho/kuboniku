import { InferGetStaticPropsType } from 'next';
import { Layout } from '@/common/components';
import { ProfileContainer } from '@/features/pages/profile';
import { gql } from 'graphql-request';
import { fetcher } from '@/common/lib/fetcher';

const Component = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="PROFILE">
      <ProfileContainer data={props.data} />
    </Layout>
  );
};

export default Component;

export const getStaticProps = async () => {
  const res = await fetcher<any>(GET_PAGE);
  const raw = res.pageBy;
  const paragraph = raw.blocks.map(item => item.originalContent as string);

  return {
    props: {
      data: {
        paragraph: paragraph,
      },
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
