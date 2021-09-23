import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Layout } from '@/common/components';
import {
  useWorkUsecase,
  WorksDetailContainer,
} from '@/features/pages/works_slug';
import { withAuth } from '@/features/user-auth';
import { repositoryFactory } from '~/infra/repository-factory';

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [newProps, status] = useWorkUsecase(
    props.data,
    props.path as string,
    repositoryFactory.get('works')
  );

  return (
    <Layout title="WORKS">
      <WorksDetailContainer
        {...newProps}
        // loading={status[0] === 'loading'}
        // errorMessage={status[0] === 'error' && '' + status[1]}
      />
    </Layout>
  );
};

export default Component;

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const slug = (ctx.params?.slug as string) ?? '';
    const res = await repositoryFactory.get('works').findOne(slug);

    if (res.isErr()) {
      return Promise.reject(res.error);
    }

    return {
      props: {
        data: res.value,
        path: ctx.params?.slug,
      },
    };
  }
);

// export const getStaticProps: GetStaticProps = async ctx => {
//   const slug = (ctx.params?.slug as string) ?? '';
//   const data = await worksRepository().findById(slug);
//
//   return {
//     props: {
//       data,
//       path: ctx.params?.slug,
//     },
//   };
// };
//
// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await worksRepository().findAll();
//   const paths = data.posts.nodes.map(post => {
//     return {
//       params: {
//         slug: post.slug,
//       },
//     };
//   });
//
//   return {
//     fallback: true,
//     paths,
//   };
// };
