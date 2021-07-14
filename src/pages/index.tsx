import { NextPage } from 'next';
import { Layout } from '@/components/site-parts/layout';
import { TRawWorksList } from '@/domain/model/entity/works';
import { GET_POSTS, useHomeUsecase, HomeContainer } from '@/domain/home';
import { fetcher } from '@/foundation/lib/fetcher';
import { useMount, useUnmount } from '@/foundation/hooks';
interface IProps {
  posts: TRawWorksList;
}

const Component: NextPage<IProps> = props => {
  const [newProps, status] = useHomeUsecase(props.posts);

  useMount(() => {
    document.body.classList.add('is-home');
  });

  useUnmount(() => {
    document.body.classList.remove('is-home');
  });

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
