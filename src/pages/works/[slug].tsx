import { NextPage } from 'next';
import { Layout } from '@/components/site-parts/layout';
import { TRawWorksId } from '@/domain/model/entity/works';
import {
  useWorksDetailUsecase,
  GET_POST,
  WorksDetailContainer,
} from '@/domain/works-slug';
import { fetcher } from '@/foundation/lib/fetcher';

interface IProps {
  post: TRawWorksId;
  path: string | string[];
}

const Component: NextPage<IProps> = props => {
  const [newProps, status] = useWorksDetailUsecase(
    props.post,
    props.path as string
  );

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
