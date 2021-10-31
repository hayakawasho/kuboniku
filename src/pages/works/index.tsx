import { InferGetServerSidePropsType } from "next"
import * as React from "react"
import { Layout } from "@/common/components"
import { IWorksRepo } from "@/domain/works"
import { useWorksUsecase, PageContainer } from "@/features/_pages/works"
import { withAuth } from "@/features/user-auth"
import { repositoryFactory } from "@/infra/repository-factory"

const Component = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [viewData, status, { handleLoadMoreWorksInfo }] = useWorksUsecase({
    initial: props.data,
    totalPosts: props.totalPosts,
    repository: repositoryFactory.get("works"),
  })

  return (
    <Layout title="WORKS">
      <PageContainer
        posts={viewData}
        totalPosts={props.totalPosts}
        onLoadMore={handleLoadMoreWorksInfo}
      />
    </Layout>
  )
}

export default Component

export const getServerSideProps = withAuth(async () => {
  const res = await repositoryFactory.get("works").findSome({ size: 10 })

  if (res.isErr()) {
    return Promise.reject(res.error)
  }

  return {
    props: {
      data: res.value,
      totalPosts: res.value.posts.pageInfo.offsetPagination.total,
    },
  }
})
