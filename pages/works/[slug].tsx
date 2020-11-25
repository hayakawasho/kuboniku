import Link from 'next/link'
import styles from './detail.module.scss'
import Image from 'next/image'
import client from '~/apollo/client'
import { gql } from '@apollo/client'
import sanitize from 'sanitize-html'
import loadable from '@loadable/component'
const DayJS = loadable(() => import('react-dayjs'))

const Component = ({ data }) => {

  const { post } = data

  return (
    <>
      <div data-controller="skew">
        <div className={styles.kv} data-smooth-item>
          <div className={styles.kv__cont} data-target="skew.item">
            <p className="num">01<span>Project</span></p>
            <h1 className={styles.heading}>{post.title}</h1>
            <p>Official website</p>
          </div>
          <div className={styles.kv__img} data-target="skew.item">
            <Image
              src={post.acf.eyecatch.sourceUrl}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              priority
            />
          </div>
          <div className={styles.kv__foot}>
            <span>scroll</span>
          </div>
        </div>

        <div className={styles.content} data-target="skew.item">

          <div className={styles.intro} data-smooth-item>
            <div className={styles.intro__info}>
              <dl className={styles.dl}>
                <dt>Year</dt>
                <DayJS element="dd" format="MMMM, DD, YYYY">{post.acf.launch}</DayJS>
              </dl>
              <dl className={styles.dl}>
                <dt>Role</dt>
                {
                  post.acf.role.map((i, index) => <dd className="u-uppercase" key={index}>{i.name}</dd>)
                }
              </dl>
            </div>
            <div className={styles.intro__p}>
              {
                post.acf.description ? (
                  <div dangerouslySetInnerHTML={{__html: sanitize(post.acf.description)}}/>
                ) : null
              }
              {
                post.acf.url ? (
                  <a className="c-link" href={post.acf.url} target="_blank" rel="noopener">View website
                    <div className="c-link__hr"></div>
                  </a>
                ) : null
              }
            </div>
          </div>

          <div className={styles.captcha} data-smooth-item>
            <ul className="blocks-gallery-grid">
              {
                post.acf.gallery.map((i, index) => {
                  return (
                    <li key={index}>
                      <Image
                        src={i.sourceUrl}
                        alt=""
                        width={i.mediaDetails.width}
                        height={i.mediaDetails.height}
                        priority
                      />
                    </li>
                  )
                })
              }
            </ul>
          </div>

          <aside className={`${styles.kv} is-next`} data-smooth-item>
            <div className={styles.kv__cont}>
              <h2 className={styles.heading}>Next Project</h2>
              <p>PONCOTAN</p>
            </div>
            <div className={styles.kv__img}>
              <Image
                src={"/img/works2/kv1.jpg"}
                alt=""
                width={2535}
                height={1538}
              />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default Component

export const GET_POST = gql`
  query GET_POST( $slug: String ) {
    post: postBy(slug: $slug) {
      title
      acf {
        eyecatch {
          sourceUrl
        }
        eyecatchMobile {
          sourceUrl
        }
        role {
          name
        }
        launch
        themeColor
        description
        url
        gallery {
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`

export const GET_POST_SLUGS = gql`
  query GET_POST_SLUGS {
  posts: posts {
    edges {
      node {
        slug
      }
    }
   }
  }
`

export async function getStaticProps({ params }) {
	const { data } = await client.query({
    query: GET_POST,
    variables: {
			slug: params?.slug ?? ''
		}
  })

  return {
    props: {
      data: {
        post: data?.post ?? {},
				path: params?.slug
			}
    }
  }
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_POST_SLUGS,
  })

  const pathsData = []

  console.warn('pathsData', pathsData)

  data.posts.edges.map(post => {
    pathsData.push({
      params: {
        slug: post.node.slug
      }
    })
  })

  return {
    paths: pathsData,
    fallback: false
  };
}
