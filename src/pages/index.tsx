import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { fetcher } from '@/foundation/lib/fetcher';
import { TRawWorksList } from '@/domain/works/worksEntity';
import { GET_POSTS } from '@/domain/home/home.gql';
import { HomeContainer, useHome } from '@/components/pages/home';
import { useMount, useUnmount } from '@/components/projects';

interface IProps {
  posts: TRawWorksList;
}

const Component: NextPage<IProps> = props => {
  const [newProps, status] = useHome(props.posts);

  useMount(() => {
    document.body.classList.add('is-home')
  })

  useUnmount(() => {
    document.body.classList.remove('is-home')
  })

  return (
    <Layout title="NAGISA KUBO">
      <HomeContainer
        {...newProps}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && status[1]}
      />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher<TRawWorksList>(GET_POSTS);

  return {
    posts: data,
  };
};
