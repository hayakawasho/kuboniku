import { GetServerSideProps } from 'next';
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

const Component = (props: IProps) => {
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const slug = (ctx.params?.slug as string) ?? '';
  const data = await worksRepository().findById(slug);

  return {
    props: {
      post: data,
      path: ctx.params?.slug,
    },
  };
};
