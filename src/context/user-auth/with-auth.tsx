import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { basicAuthGateway } from './basic-auth-gateway';

type InnerGetServerSideProps<P extends { [key: string]: unknown }> = (
  context: GetServerSidePropsContext
) => Promise<{ props: P }>;

const withAuth = <P extends { [key: string]: unknown }>(
  inner?: InnerGetServerSideProps<P>
): GetServerSideProps => {
  return async ctx => {
    await basicAuthGateway().doAuth(ctx.req, ctx.res);

    return inner ? inner(ctx) : { props: {} };
  };
};

export { withAuth };
