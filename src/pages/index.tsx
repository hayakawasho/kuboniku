import { GetServerSideProps } from 'next';
import { Layout } from '@/foundation/components';
import { TRawWorksList, worksGateway } from '@/domain/works';
import { useHomeUsecase, HomePresenter } from '@/domain/home';
import { useMount, useUnmount } from '@/foundation/hooks';
import { withAuth } from '@/context/user-auth';

interface IProps {
  data: TRawWorksList;
}

const Component = (props: IProps) => {
  const [newProps, status] = useHomeUsecase(props.data);

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

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  const result = await worksGateway().findSome(4);

  if (result.isLeft()) {
    return Promise.reject(result.value);
  }

  return {
    props: {
      data: result.value,
    },
  };
});
