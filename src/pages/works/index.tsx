import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/foundation/components';
import {
  useWorksUsecase,
  WorksIndexPresenter,
  worksRepository,
} from '@/domain/works';
import { withAuth } from '@/context/user-auth';

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [viewData, status, { handleLoadMoreWorksInfo }] = useWorksUsecase(
    props.data,
    props.totalPosts
  );

  return (
    <Layout title="WORKS">
      <WorksIndexPresenter
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
  const result = await worksRepository().findSome(10);

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

/*
export const getStaticProps: GetStaticProps = async () => {
  const data = await worksRepository().findSome(10);

  return {
    props: {
      data,
      totalPosts: data.posts.pageInfo.offsetPagination.total,
    },
  };
};
*/
