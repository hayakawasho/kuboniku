import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/components/projects';
import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_INITIAL_POSTS } from '@/domain/works/worksIndex.gql';
import { useWorksIndex, WorksIndexContainer } from '@/components/pages/works';

interface IProps {
  posts: IRawWorksList;
  totalPosts: number;
}

const Component: NextPage<IProps> = props => {
  const [data, status, { onLoadMore }] = useWorksIndex(props.posts, props.totalPosts);

  return (
    <Layout title="WORKS">
      <WorksIndexContainer
        posts={data}
        totalPosts={props.totalPosts}
        loading={status[0] === "loading"}
        errorMessage={status[0] === "error" && "" + status[1]}
        onLoadMore={onLoadMore}
      />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher<IRawWorksList>(GET_INITIAL_POSTS);

  return {
    posts: data,
    totalPosts: data.posts.pageInfo.offsetPagination.total
  };
};
