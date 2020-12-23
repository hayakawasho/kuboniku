import React from 'react'
import SEO from '~/foundation/seo'
import client from '~/client/apollo'
import { gql } from '@apollo/client'

import styles from './index.module.scss'

import Entry from '~/foundation/components/_works/entry'

const Component = ({ data }) => {
  const { posts } = data
  const { total } = posts.pageInfo.offsetPagination

  return (
    <>
      <SEO title="WORKS" />
      <div data-controller="skew" data-skew-options='{ "val": 1.6 }'>
        <h1 className={styles.heading} data-target="skew.item">
          <div data-smooth-item>
            Works<sup className={styles.heading__total}>{total}</sup>
          </div>
        </h1>

        <div className={`${styles.entryList} o-grid`} data-target="skew.item">
          {data.posts.edges.map((item, index) => (
            <article className="o-grid__item" data-smooth-item>
              <Entry data={item} index={total - index} key={index} />
            </article>
          ))}
        </div>
        <div className={styles.loader} />
      </div>
    </>
  )
}

export default Component

export const GET_POSTS = gql`
  query {
    posts(where: { orderby: { field: DATE, order: DESC } }) {
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POSTS,
  })

  return {
    props: {
      data,
    },
  }
}
