import { GetServerSideProps } from 'next';
import { Layout } from '@/app/components/layout';
import {
  TRawWorksList,
  useWorksUsecase,
  WorksIndexPresenter,
  worksRepository,
} from '@/domain/works';

interface IProps {
  posts: TRawWorksList;
  totalPosts: number;
}

const Component = (props: IProps) => {
  const [data, status, { handleLoadMoreWorksInfo }] = useWorksUsecase(
    props.posts,
    props.totalPosts
  );

  return (
    <Layout title="WORKS">
      <WorksIndexPresenter
        posts={data}
        totalPosts={props.totalPosts}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && status[1]}
        onLoadMore={handleLoadMoreWorksInfo}
      />
    </Layout>
  );
};

export default Component;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await worksRepository().findArray(10);

  return {
    props: {
      posts: data,
      totalPosts: data.posts.pageInfo.offsetPagination.total,
    },
  };
};
