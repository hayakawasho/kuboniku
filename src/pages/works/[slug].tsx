import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Layout } from '@/foundation/components';
import {
  useWorkUsecase,
  worksRepository,
  WorksDetailPresenter,
} from '@/domain/works';
import { withAuth } from '@/context/user-auth';

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
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

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const slug = (ctx.params?.slug as string) ?? '';
    const result = await worksRepository().findOne(slug);

    if (result.isErr()) {
      return Promise.reject(result.error);
    }

    return {
      props: {
        data: result.value,
        path: ctx.params?.slug,
      },
    };
  }
);

/*
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
*/
