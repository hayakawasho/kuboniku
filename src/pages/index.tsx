import { NextPage } from 'next';
import { Layout } from '@/app/components/layout';
import { TRawWorksList } from '@/domain/model/entity/works';
import { useHomeUsecase, HomePresenter, homeRepository } from '@/domain/home';
import { useMount, useUnmount } from '@/app/hooks';

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
      <HomePresenter
        {...newProps}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && status[1]}
      />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await homeRepository().findAll();

  return {
    posts: data,
  };
};
