import { gql, request } from "graphql-request"
import { InferGetStaticPropsType } from "next"
import * as React from "react"
import { Layout } from "@/common/components"
import { WP_API_END_POINT } from "@/common/constants/const"
import { PageContainer } from "@/features/_pages/profile"

const Component = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="PROFILE">
      <PageContainer {...props} />
    </Layout>
  )
}

export default Component

export const getStaticProps = async () => {
  const res = await request<any>(WP_API_END_POINT, GET_PAGE)
  const raw = res.pageBy
  const paragraph = raw.blocks.map(
    (item: any) => item.originalContent as string
  )

  return {
    props: {
      html: paragraph,
    },
  }
}

const GET_PAGE = gql`
  query MyQuery {
    pageBy(uri: "profile") {
      blocks {
        ... on CoreParagraphBlock {
          name
          originalContent
        }
      }
    }
  }
`
