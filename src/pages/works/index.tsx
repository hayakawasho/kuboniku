import { GetServerSideProps, GetStaticProps } from 'next';
import { Layout } from '@/foundation/components';
import {
  TRawWorksList,
  useWorksUsecase,
  WorksIndexPresenter,
  worksRepository,
} from '@/domain/works';

interface IProps {
  data: TRawWorksList;
  totalPosts: number;
}

const Component = (props: IProps) => {
  const [data, status, { handleLoadMoreWorksInfo }] = useWorksUsecase(
    props.data,
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

export const getStaticProps: GetStaticProps = async () => {
  const data = await worksRepository().findArray(10);

  return {
    props: {
      data,
      totalPosts: data.posts.pageInfo.offsetPagination.total,
    },
  };
};
