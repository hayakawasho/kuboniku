import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import * as React from "react"
import { Layout } from "@/common/components"
import { useWorkUsecase, PageContainer } from "@/features/_pages/works_slug"
import { withAuth } from "@/features/user-auth"
import { repositoryFactory } from "@/infra/repository-factory"

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return <Layout title="WORKS"></Layout>
}

export default Component

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext) => {
    const slug = (ctx.params?.slug as string) ?? ""
    const res = await repositoryFactory.get("works").findOne(slug)

    if (res.isErr()) {
      return Promise.reject(res.error)
    }

    return {
      props: {
        data: {},
        path: ctx.params?.slug,
      },
    }
  }
)

// export const getStaticProps: GetStaticProps = async ctx => {
//   const slug = (ctx.params?.slug as string) ?? '';
//   const data = await worksRepository().findById(slug);
//
//   return {
//     props: {
//       data,
//       path: ctx.params?.slug,
//     },
//   };
// };
//
// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await worksRepository().findAll();
//   const paths = data.posts.nodes.map(post => {
//     return {
//       params: {
//         slug: post.slug,
//       },
//     };
//   });
//
//   return {
//     fallback: true,
//     paths,
//   };
// };
