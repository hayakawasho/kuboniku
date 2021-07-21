import { NextPage } from 'next';
import { Layout } from '@/app/components/layout';
import {
  TRawWorksId,
  useWorkUsecase,
  worksRepository,
  WorksDetailPresenter,
} from '@/domain/works';

interface IProps {
  post: TRawWorksId;
  path: string | string[];
}

const Component: NextPage<IProps> = props => {
  const [newProps, status] = useWorkUsecase(props.post, props.path as string);

  return (
    <Layout title="WORKS">
      <WorksDetailPresenter
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
  const data = await worksRepository().findById(slug as string);

  return {
    post: data,
    path: query?.slug,
  };
};
