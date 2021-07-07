import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { TRawWorksId } from '@/domain/works/worksEntity';
import { GET_POST } from '@/domain/single-works/worksDetail.gql';
import {
  WorksDetailContainer,
  useWorksDetail,
} from '@/components/pages/single-works';
import { fetcher } from '@/foundation/lib/fetcher';

interface IProps {
  post: TRawWorksId;
  path: string | string[];
}

const Component: NextPage<IProps> = props => {
  const [newProps, status] = useWorksDetail(props.post, props.path as string);

  return (
    <Layout title="WORKS">
      <WorksDetailContainer
        {...newProps}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && '' + status[1]}
      />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async ({ query }) => {
  const data = await fetcher<TRawWorksId>(GET_POST, {
    slug: query?.slug ?? '',
  });

  return {
    post: data,
    path: query?.slug,
  };
};
