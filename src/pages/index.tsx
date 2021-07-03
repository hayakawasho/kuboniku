import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/components/projects';
import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_POSTS } from '@/domain/home/home.gql';
import { HomeContainer, useHome } from '@/components/pages/home';

interface IProps {
  posts: IRawWorksList;
}

const Component: NextPage<IProps> = props => {
  const [newProps] = useHome(props.posts);

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
    posts: data,
  };
};
