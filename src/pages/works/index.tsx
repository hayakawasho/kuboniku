import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/foundation/lib/fetcher';
import { TRawWorksList } from '@/domain/works/worksEntity';
import { GET_INITIAL_POSTS } from '@/domain/query/worksIndex';
import { useWorksIndex, WorksIndexContainer } from '@/components/pages/works';

interface IProps {
  posts: TRawWorksList;
  totalPosts: number;
}

const Component: NextPage<IProps> = props => {
  const [data, status, { onLoadMoreWorksInfo }] = useWorksIndex(
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
