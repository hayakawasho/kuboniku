import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/common/components';
// import { repositoryFactory } from '@/infra/repository-factory';
// import { useMount, useUnmount } from 'react-use';
// import { useHomeUsecase, HomePresenter } from '@/features/pages/home';
// import { withAuth } from '@/features/user-auth';

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  // const [newProps, status] = useHomeUsecase(props.data, repositoryFactory.get('works'));

  // useMount(() => {
  //   document.body.classList.add('is-home');
  // });
  //
  // useUnmount(() => {
  //   document.body.classList.remove('is-home');
  // });

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
  return {
    redirect: {
      permanent: false,
      destination: '/works', // リダイレクト先
    },
  };
};

// export const getServerSideProps = () => {
//   const result = await repositoryFactory.get('works').findSome({ size: 4 });
//
//   if (result.isErr()) {
//     return Promise.reject(result.error);
//   }
//
//   return {
//     props: {
//       data: result.value,
//     },
//   };
// };
