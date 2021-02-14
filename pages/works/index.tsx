import React, { useRef, useCallback, useEffect } from 'react';
import SEO from '~/foundation/seo';
import client from '~/client/apollo';
import { gql } from '@apollo/client';
import { useInView } from 'react-intersection-observer';
import Utils from '~/foundation/utils/Utils';

import styles from './index.module.scss';
import Entry from '~/components/_works/entry';

const Component = ({ data }) => {
  const { posts } = data;
  const { total } = posts.pageInfo.offsetPagination;
  const [ref, inView] = useInView({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    const { data } = await client.query({
      query: gql`
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
                hasMore
              }
            }
          }
        }
      `,
    });

    console.log(data);
  };

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
          {posts.edges.map((item, i) => (
            <article className="o-grid__item" data-smooth-item key={i}>
              <Entry data={item} index={Utils.zeroPadding(total - i, 2)} />
            </article>
          ))}
        </div>
        <div className={styles.loader} ref={ref} />
      </div>
    </>
  );
};

export default Component;

export const GET_INITIAL_POSTS = gql`
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
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_INITIAL_POSTS,
  });

  return {
    props: {
      data,
    },
  };
}
