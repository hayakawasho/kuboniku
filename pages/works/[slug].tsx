import React, { useEffect, useRef } from 'react';
import SEO from '~/foundation/seo';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import client from '~/client/apollo';
import { gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';
import { scrollBufferSelector } from '~/state/app';

import styles from './[slug].module.scss';

const Component = ({ data }) => {
  const { post } = data;
  const { title, acf, date, previous } = post;
  const {
    themeColor,
    category,
    eyecatch,
    role,
    description,
    url,
    gallery,
  } = acf;
  const dispatch = useDispatch();
  const scrollBuffer = useSelector(scrollBufferSelector);
  const { scrollYProgress } = useViewportScroll();
  const inputRange = [0, 1];
  const outputRange = [scrollBuffer, 1];
  const progressVal = useTransform(scrollYProgress, inputRange, outputRange);

  useEffect(() => {
    dispatch(SET_UI_COLOR(themeColor));
  }, []);

  return (
    <>
      <SEO title={title} />
      <div data-controller="skew">
        <div className={styles.kv} data-smooth-item>
          <div className={styles.kv__cont} data-target="skew.item">
            <h1 className={styles.heading}>
              <div className="u-ovh u-inline-block">
                <span className="u-inline-block u-origin-right">{title}</span>
              </div>
            </h1>
            <p className="u-ovh">
              <span className="u-inline-block u-origin-right">
                {category.name}
                <i className="icon-arrow-right" />
              </span>
            </p>
          </div>
          <div className={styles.kv__img} data-target="skew.item">
            <Image
              src={eyecatch.sourceUrl}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              priority
            />
          </div>
          <div className={styles.kv__scroll}>
            <div className="u-in u-ovh">
              <div className={styles.kv__scrollLabel}>scroll</div>
            </div>
            <i className="icon-arrow-down" />
          </div>
        </div>

        <div className={styles.content} data-target="skew.item">
          <div className={styles.intro} data-smooth-item>
            <div className={styles.intro__info}>
              <dl className={styles.dl}>
                <dt>Year</dt>
                <dd>{date}</dd>
              </dl>
              <dl className={styles.dl}>
                <dt>Role</dt>
                {role.map((item, i) => (
                  <dd className="u-uppercase" key={i}>
                    {item.name}
                  </dd>
                ))}
              </dl>
            </div>
            <div className={styles.intro__p}>
              {description && (
                <div
                  className={styles.desc}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )}
              {url && (
                <a className="c-link" href={url} target="_blank" rel="noopener">
                  View website
                  <div className="c-link__hr" />
                </a>
              )}
            </div>
          </div>

          <ul className={styles.captchaList} data-smooth-item>
            {gallery.map((item, i) => {
              const aspect = Math.round(
                (item.mediaDetails.height / item.mediaDetails.width) * 100
              );
              return (
                <li className="u-rel" key={i}>
                  <div
                    className="c-aspect"
                    style={{
                      paddingTop: `${aspect}%`,
                      backgroundColor: `${themeColor}`,
                    }}
                  />
                  <Image
                    src={item.sourceUrl}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                </li>
              );
            })}
          </ul>

          {previous !== null ? (
            <aside className={`${styles.kv} is-next`} data-smooth-item>
              <Link href={'/works/' + previous.slug}>
                <a className="u-abs u-fit u-z-10"></a>
              </Link>
              <div className={styles.kv__cont}>
                <h2 className={styles.heading}>Next Project</h2>
                <p>
                  {previous.title}
                  <i className="icon-arrow-right" />
                </p>
              </div>
              <div className={styles.kv__img}>
                <Image
                  src={previous.acf.eyecatch.sourceUrl}
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

      <div className="l-progress">
        <div className="u-in">
          <div className="c-progressCtrl">
            <div className="c-progressBar">
              <motion.span
                className="c-progressBar__l"
                style={{ scaleY: progressVal }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;

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
`;

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: GET_POST,
    variables: {
      slug: params?.slug ?? '',
    },
  });

  return {
    props: {
      data: {
        post: data?.post ?? {},
        path: params?.slug,
      },
    },
  };
}
