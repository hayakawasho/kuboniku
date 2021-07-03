import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { IRawWorksId } from '@/domain/works/worksEntity';
import { GET_POST } from '@/domain/works/worksDetail.gql';
import { WorksDetailContainer, useWorksDetail } from '@/components/pages/works';
import { request } from 'graphql-request';
import { WP_API_END_POINT } from '@/foundation/constants/const';

interface IProps {
  post: IRawWorksId;
  path: any;
}

const Component: NextPage<IProps> = (props) => {
  const [newProps] = useWorksDetail(props.post, props.path);

  return (
    <Layout title="WORKS">
      <WorksDetailContainer {...newProps} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async ({ query }) => {
  const data = await request<IRawWorksId>(WP_API_END_POINT, GET_POST, {
    slug: query?.slug ?? ''
  });

  return {
    post: data,
    path: query?.slug,
  };
};
