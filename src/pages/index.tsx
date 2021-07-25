import { GetServerSideProps } from 'next';
import { Layout } from '@/foundation/components';
import { TRawWorksList, worksGateway } from '@/domain/works';
import { useHomeUsecase, HomePresenter } from '@/domain/home';
import { useMount, useUnmount } from '@/foundation/hooks';
import { basicAuthGateway } from '@/context/user-auth';

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  await basicAuthGateway().authenticate(ctx.req, ctx.res);

  const data = await worksGateway().findArray(4);

  return {
    props: {
      data,
    },
  };
};
