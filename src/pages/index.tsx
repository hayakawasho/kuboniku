import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/foundation/components';
import { worksRepository } from '@/domain/works';
import { useHomeUsecase, HomePresenter } from '@/domain/home';
import { useMount, useUnmount } from '@/foundation/hooks';
import { withAuth } from '@/context/user-auth';

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // const [newProps, status] = useHomeUsecase(props.data);

  useMount(() => {
    document.body.classList.add('is-home');
  });

  useUnmount(() => {
    document.body.classList.remove('is-home');
  });

  return (
    <Layout title="NAGISA KUBO">
      {/*
        <HomePresenter
          {...newProps}
          loading={status[0] === 'loading'}
          errorMessage={status[0] === 'error' && status[1]}
        /> */}
    </Layout>
  );
};

export default Component;

export const getServerSideProps = () => {
  // const result = await worksRepository().findSome(4);

  // if (result.isErr()) {
  //   return Promise.reject(result.error);
  // }

  return {
    redirect: {
      permanent: false,
      destination: '/works', // リダイレクト先
    },
    // props: {
    //   data: result.value,
    // },
  };
};
