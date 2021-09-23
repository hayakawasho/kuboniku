import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/common/components';
import { useWorksUsecase, WorksIndexContainer } from '@/features/pages/works';
import { withAuth } from '@/features/user-auth';
import { repositoryFactory } from '~/infra/repository-factory';

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [viewData, status, { handleLoadMoreWorksInfo }] = useWorksUsecase(
    props.data,
    props.totalPosts,
    repositoryFactory.get('works')
  );

  return (
    <Layout title="WORKS">
      <WorksIndexContainer
        posts={viewData}
        totalPosts={props.totalPosts}
        onLoadMore={handleLoadMoreWorksInfo}
      />
    </Layout>
  );
};

export default Component;

export const getServerSideProps = withAuth(async () => {
  const res = await repositoryFactory.get('works').findSome({ size: 10 });

  if (res.isErr()) {
    return Promise.reject(res.error);
  }

  return {
    props: {
      data: res.value,
      totalPosts: res.value.posts.pageInfo.offsetPagination.total,
    },
  };
});
