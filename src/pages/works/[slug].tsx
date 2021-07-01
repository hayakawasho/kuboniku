import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/components/projects';
import { IRawWorksId } from '@/domain/works/worksEntity';
import { GET_POST } from '@/domain/works/worksDetail.gql';
import { WorksDetailContainer, useWorksDetail } from '@/components/pages/works';

// interface IProps {
//   data: IRawWorksId;
//   url: string;
// }

const Component: NextPage = (props: any) => {
  const initialData = props.data;
  const [newProps] = useWorksDetail(initialData, props.path);

  return (
    <Layout title="WORKS">
      <WorksDetailContainer {...newProps} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async ({ query }) => {
  const variables = {
    slug: query?.slug ?? ''
  };
  const data = await fetcher<IRawWorksId>(GET_POST, variables);

  return {
    data,
    path: query?.slug,
  };
};
