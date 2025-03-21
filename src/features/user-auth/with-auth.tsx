import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { basicAuthGateway } from "./basic-auth-gateway"

type IInnerGetServerSideProps<P extends { [key: string]: unknown }> = (
  context: GetServerSidePropsContext
) => Promise<{ props: P }>

const withAuth = <P extends { [key: string]: unknown }>(
  inner: IInnerGetServerSideProps<P>
): GetServerSideProps<P> => {
  return async ctx => {
    await basicAuthGateway().doAuth(ctx.req, ctx.res)
    return inner(ctx)
  }
}

export { withAuth }
