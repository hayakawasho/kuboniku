import { NextPage } from 'next';
import { Layout } from '@/components/site-parts/layout';
import { TRawWorksId } from '@/domain/model/entity/works';
import {
  useWorkUsecase,
  WorksDetailContainer,
  workResository,
} from '@/domain/works-slug';

interface IProps {
  post: TRawWorksId;
  path: string | string[];
}

const Component: NextPage<IProps> = props => {
  const [newProps, status] = useWorkUsecase(props.post, props.path as string);

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
  const slug = query?.slug ?? '';
  const data = await workResository().find(slug as string);

  return {
    post: data,
    path: query?.slug,
  };
};
