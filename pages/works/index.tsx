import styles from './index.module.scss'
import client from '~/apollo/client'
import { gql } from '@apollo/client'
import Entry from '~/components/_works/entry'

const Component = ({ data }) => {

  const { posts } = data
  const { total } = posts.pageInfo.offsetPagination

  return (
    <>
      <div data-controller="skew" data-skew-options='{ "val": 1.6 }'>

        <h1 className={styles.heading}>
          Works<sup>{total}</sup>
        </h1>

        <div className={`${styles.entryList} o-grid`} data-target="skew.item">
          { data.posts.edges.map((item, index) => <Entry data={item} index={total - (index)} key={index} />) }
        </div>
        <div className={styles.loader} />
      </div>
    </>
  )
}

export default Component

export const GET_POSTS = gql`
 query {
  posts {
    edges {
      node {
        title
        slug
        acf {
          url
          themeColor
          eyecatch {
            sourceUrl
          }
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
 }
`

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_POSTS
  })

  return {
    props: {
      data
    }
  }
}
