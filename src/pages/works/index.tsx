import { GetServerSideProps } from 'next';
import { Layout } from '@/foundation/components';
import {
  TRawWorksList,
  useWorksUsecase,
  WorksIndexPresenter,
  worksGateway,
} from '@/domain/works';
import { basicAuthGateway } from '@/context/user-auth';

interface IProps {
  data: TRawWorksList;
  totalPosts: number;
}

const Component = (props: IProps) => {
  const [viewData, status, { handleLoadMoreWorksInfo }] = useWorksUsecase(
    props.data,
    props.totalPosts
  );

  return (
    <Layout title="WORKS">
      <WorksIndexPresenter
        posts={viewData}
        totalPosts={props.totalPosts}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && status[1]}
        onLoadMore={handleLoadMoreWorksInfo}
      />
    </Layout>
  );
};

export default Component;

export const getServerSideProps: GetServerSideProps = async ctx => {
  await basicAuthGateway().doAuth(ctx.req, ctx.res);

  const res = await worksGateway().findSome(10);

  if (res.isLeft()) {
    throw new Error(res.value.message);
  }

  return {
    props: {
      data: res.value,
      totalPosts: res.value.posts.pageInfo.offsetPagination.total,
    },
  };
};

/*
export const getStaticProps: GetStaticProps = async () => {
  const data = await worksGateway().findSome(10);

  return {
    props: {
      data,
      totalPosts: data.posts.pageInfo.offsetPagination.total,
    },
  };
};
*/
