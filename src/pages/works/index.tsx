import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/common/components';
import { useWorksUsecase, WorksIndexContainer } from '@/features/pages/works';
import { withAuth } from '@/features/user-auth';
import { repositoryFactory } from '@/infra/repository-factory';

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
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && status[1]}
        onLoadMore={handleLoadMoreWorksInfo}
      />
    </Layout>
  );
};

export default Component;

export const getServerSideProps = withAuth(async () => {
  const result = await repositoryFactory.get('works').findSome({ size: 10 });

  if (result.isErr()) {
    return Promise.reject(result.error);
  }

  return {
    props: {
      data: result.value,
      totalPosts: result.value.posts.pageInfo.offsetPagination.total,
    },
  };
});
