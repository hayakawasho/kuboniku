import React, { useEffect, useRef } from 'react'
import SEO from '~/foundation/seo'

import styles from './[slug].module.scss'

import Link from 'next/link'
import Image from 'next/image'
import client from '~/client/apollo'
import { gql } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { SET_THEME_COLOR } from '~/state/ui'

// let dayjs

const Component = ({ data }) => {
  const { post } = data

  const dispatch = useDispatch()

  dispatch(SET_THEME_COLOR(post.acf.themeColor))

  // const launch = dayjs(post.date).format('MMMM, D, YYYY')
  const launch = post.date

  return (
    <>
      <SEO title={post.title} />
      <div data-controller="skew">
        <div className={styles.kv} data-smooth-item>
          <div className={styles.kv__cont} data-target="skew.item">
            <h1 className={styles.heading}>{post.title}</h1>
            <p>
              {post.acf.category.name}
              <i className="icon-arrow-right" />
            </p>
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
          <div className={styles.kv__scroll}>
            <div className="u-in u-ovh">
              <span>scroll</span>
            </div>
            <i className="icon-arrow-down" />
          </div>
        </div>

        <div className={styles.content} data-target="skew.item">
          <div className={styles.intro} data-smooth-item>
            <div className={styles.intro__info}>
              <dl className={styles.dl}>
                <dt>Year</dt>
                <dd>{launch}</dd>
              </dl>
              <dl className={styles.dl}>
                <dt>Role</dt>
                {post.acf.role.map((i, index) => (
                  <dd className="u-uppercase" key={index}>
                    {i.name}
                  </dd>
                ))}
              </dl>
            </div>
            <div className={styles.intro__p}>
              {post.acf.description && (
                <div
                  className={styles.desc}
                  dangerouslySetInnerHTML={{
                    __html: post.acf.description,
                  }}
                />
              )}
              {post.acf.url && (
                <a
                  className="c-link"
                  href={post.acf.url}
                  target="_blank"
                  rel="noopener"
                >
                  View website
                  <div className="c-link__hr" />
                </a>
              )}
            </div>
          </div>

          <ul className={styles.captchaList} data-smooth-item>
            {post.acf.gallery.map((i, index) => {
              const aspect = Math.round(
                (i.mediaDetails.height / i.mediaDetails.width) * 100
              )
              return (
                <li className="u-rel" key={index}>
                  <div
                    className="c-aspect"
                    style={{
                      paddingTop: `${aspect}%`,
                      backgroundColor: `${post.acf.themeColor}`,
                    }}
                  />
                  <Image
                    src={i.sourceUrl}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                </li>
              )
            })}
          </ul>

          {post.previous !== null ? (
            <aside className={`${styles.kv} is-next`} data-smooth-item>
              <Link href={'/works/' + post.previous.slug}>
                <a className="u-abs u-fit u-z-10"></a>
              </Link>
              <div className={styles.kv__cont}>
                <h2 className={styles.heading}>Next Project</h2>
                <p>
                  {post.previous.title}
                  <i className="icon-arrow-right" />
                </p>
              </div>
              <div className={styles.kv__img}>
                <Image
                  src={post.previous.acf.eyecatch.sourceUrl}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Component

export const GET_POST = gql`
  query GET_POST($slug: String) {
    post: postBy(slug: $slug) {
      title
      date
      previous {
        title
        slug
        acf {
          eyecatch {
            sourceUrl
          }
        }
      }
      acf {
        eyecatch {
          sourceUrl
        }
        eyecatchMobile {
          sourceUrl
        }
        category {
          name
        }
        role {
          name
        }
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

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: GET_POST,
    variables: {
      slug: params?.slug ?? '',
    },
  })

  return {
    props: {
      data: {
        post: data?.post ?? {},
        path: params?.slug,
      },
    },
  }
}

// if (process.browser) {
//   dayjs = require('dayjs')
// }
