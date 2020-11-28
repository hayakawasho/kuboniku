import Link from 'next/link'
import styles from './index.module.scss'
import Image from 'next/image'
import client from '~/apollo/client'
import { gql } from '@apollo/client'

const Component = ({ data }) => {

  const { posts } = data
  const { total } = posts.pageInfo.offsetPagination

  return (
    <>
      <div data-controller="skew" data-skew-options='{ "val": 1.6 }'>

        <h1 id="js-headingWorks" className={styles.heading}>
          Works<sup>{total}</sup>
        </h1>

        <div className={`${styles.entryList} o-grid`} data-target="skew.item">
          {
            data.posts.edges.map((item, index) => {
              return (
                <article className="o-grid__item || js-entryWorks" data-smooth-item key={index}>
                  <Link href={'/works/' + item.node.slug}>
                    <a className={styles.entry}>
                      <div className="c-aspect" style={{
                        backgroundColor: `${item.node.acf.themeColor}`,
                      }} />
                      <div className="u-abs u-pos-tl u-fit">
                        <div className={styles.eyecatch}>
                          <Image
                            src={item.node.acf.eyecatch.sourceUrl}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            objectPosition="50% 50%"
                            priority
                          />
                        </div>
                        <div className={styles.entry__hgroup}>
                          <p>{index}<span>Project</span></p>
                          <h2>{item.node.title}</h2>
                        </div>
                      </div>
                    </a>
                  </Link>
                </article>
              )
            })
          }
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
