import { NextPage } from 'next';
import { Layout } from '@/components/site-parts/layout';
import { TRawWorksList } from '@/domain/model/entity/works';
import {
  GET_INITIAL_POSTS,
  useWorksIndexUsecase,
  WorksIndexContainer,
} from '@/domain/works';
import { fetcher } from '@/foundation/lib/fetcher';

interface IProps {
  posts: TRawWorksList;
  totalPosts: number;
}

const Component: NextPage<IProps> = props => {
  const [data, status, { onLoadMoreWorksInfo }] = useWorksIndexUsecase(
    props.posts,
    props.totalPosts
  );

  return (
    <Layout title="WORKS">
      <WorksIndexContainer
        posts={data}
        totalPosts={props.totalPosts}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && status[1]}
        onLoadMore={onLoadMoreWorksInfo}
      />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher<TRawWorksList>(GET_INITIAL_POSTS);

  return {
    posts: data,
    totalPosts: data.posts.pageInfo.offsetPagination.total,
  };
};
