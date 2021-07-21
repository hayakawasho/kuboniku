import { NextPage } from 'next';
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

const Component: NextPage<IProps> = props => {
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

Component.getInitialProps = async () => {
  const data = await worksRepository().findArray(10);

  return {
    posts: data,
    totalPosts: data.posts.pageInfo.offsetPagination.total,
  };
};
