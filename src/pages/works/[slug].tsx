import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '@/foundation/components';
import {
  TRawWorksId,
  useWorkUsecase,
  worksRepository,
  WorksDetailPresenter,
} from '@/domain/works';

interface IProps {
  data: TRawWorksId;
  path: string | string[];
}

const Component = (props: IProps) => {
  const [newProps, status] = useWorkUsecase(props.data, props.path as string);

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

export const getStaticProps: GetStaticProps = async ctx => {
  const slug = (ctx.params?.slug as string) ?? '';
  const data = await worksRepository().findById(slug);

  return {
    props: {
      data,
      path: ctx.params?.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await worksRepository().findAll();
  const paths = data.posts.nodes.map(post => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    fallback: true,
    paths,
  };
};
