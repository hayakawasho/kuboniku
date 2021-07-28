import { GetServerSideProps } from 'next';
import { Layout } from '@/foundation/components';
import {
  TRawWorksId,
  useWorkUsecase,
  worksGateway,
  WorksDetailPresenter,
} from '@/domain/works';
import { withAuth } from '@/context/user-auth';

interface IProps {
  data: TRawWorksId;
  path: string | string[];
}

const Component = (props: IProps) => {
  const [newProps, status] = useWorkUsecase(props.data, props.path as string);

  return (
    <Layout title="WORKS">
      <WorksDetailPresenter
        {...newProps}
        loading={status[0] === 'loading'}
        errorMessage={status[0] === 'error' && '' + status[1]}
      />
    </Layout>
  );
};

export default Component;

export const getServerSideProps: GetServerSideProps = withAuth(async ctx => {
  const slug = (ctx.params?.slug as string) ?? '';
  const res = await worksGateway().findOne(slug);

  if (res.isLeft()) {
    throw new Error(res.value.message);
  }

  return {
    props: {
      data: res.value,
      path: ctx.params?.slug,
    },
  };
});

/*
export const getStaticProps: GetStaticProps = async ctx => {
  const slug = (ctx.params?.slug as string) ?? '';
  const data = await worksGateway().findById(slug);

  return {
    props: {
      data,
      path: ctx.params?.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await worksGateway().findAll();
  const paths = data.posts.nodes.map(post => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });

  return {
    fallback: true,
    paths,
  };
};
*/
