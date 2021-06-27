import { NextPage } from 'next';
import { Layout } from '~/components/layouts';
import { HomeContainer } from '~/components/pages/home';
import { fetcher } from '~/components/projects';
import { GET_POSTS } from '~/domain/queries/home';

interface IProps {
  data: any;
}

const Component: NextPage<IProps> = props => {
  const initialData = props.data;

  const data = {
    slug: '',
    title: '',
    eyecatch: {},
  };

  return (
    <Layout title="NAGISA KUBO">
      <HomeContainer data={initialData} />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher(GET_POSTS);
  return {
    data,
  };
};
