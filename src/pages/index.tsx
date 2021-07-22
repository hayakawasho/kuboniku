import { GetServerSideProps } from 'next';
import { Layout } from '@/app/components/layout';
import { TRawWorksList, worksRepository } from '@/domain/works';
import { useHomeUsecase, HomePresenter } from '@/domain/home';
import { useMount, useUnmount } from '@/app/hooks';

interface IProps {
  posts: TRawWorksList;
}

const Component = (props: IProps) => {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await worksRepository().findArray(4);

  return {
    props: {
      posts: data,
      totalPosts: data.posts.pageInfo.offsetPagination.total,
    },
  };
}
