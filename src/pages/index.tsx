import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/components/projects';
import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_POSTS } from '@/domain/home/home.gql';
import { HomeContainer } from '@/components/pages/home';
import { useRequest } from '@/components/projects';

interface IProps {
  data: IRawWorksList;
}

const Component: NextPage<IProps> = props => {
  const initialData = props.data;
  const [result] = useRequest<IRawWorksList>(GET_POSTS, {
    initialData
  });
  const newProps = {
    posts: result.posts.nodes.map(node => {
      return {
        title: node.title,
        slug: node.slug,
        category: node.acf.category.name,
        eyecatch: {
          src: node.acf.eyecatch.sourceUrl,
          srcSet: node.acf.eyecatch.srcSet,
          mobile: node.acf.eyecatchMobile.sourceUrl
        }
      }
    }),
    totalPosts: result.posts.pageInfo.offsetPagination.total
  }

  return (
    <Layout title="NAGISA KUBO">
      <HomeContainer {...newProps} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher<IRawWorksList>(GET_POSTS);

  return {
    data,
  };
};
