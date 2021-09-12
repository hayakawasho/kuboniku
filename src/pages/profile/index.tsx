import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Layout } from '@/foundation/components';
import { ProfilePresenter } from '@/domain/profile';
import { gql } from 'graphql-request';
import { fetcher } from '@/foundation/lib/fetcher';

const Component = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="PROFILE">
      <ProfilePresenter data={props.data} />
    </Layout>
  );
};

export default Component;

export const getStaticProps = async () => {
  const res = await fetcher<any>(GET_PAGE);
  const raw = res.pageBy;
  const paragraph = raw.blocks.map(item => item.originalContent as string);

  console.log(paragraph[0]);

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
