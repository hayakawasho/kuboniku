import React, { useEffect, useState, Suspense } from 'react';
import Seo from '~/components/seo';
import { motion } from 'framer-motion';
import Layout from '~/components/layout';
import Heading from '~/components/works/heading';
import Entry from '~/components/works/entry';

import { useSWRInfinite } from 'swr';
import { gql } from 'graphql-request';
import { fetcher } from '~/lib/fetcher';
import { useInView } from 'react-intersection-observer';
import { transition } from '~/animations/index';
import Utils from '~/foundation/utils/Utils';

import styles from './index.module.scss';

type EntryData = React.ComponentProps<typeof Entry>['data'];
type Data = {
  posts: {
    nodes: EntryData[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
};

interface IProps {
  data: Data;
  total: number;
}

const PER_PAGE = 10;
let loadCount = 1;

const Component: React.FC<IProps> = props => {
  const initialData = props.data;
  const totalPost = props.total;
  const totalPage = totalPost / PER_PAGE;
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    index => {
      return getQuery(index * PER_PAGE);
    },
    fetcher,
    {
      revalidateOnFocus: false,
      initialData: [initialData],
    }
  );
  const chunkedPostData = data ? [].concat(...data) : [];

  const [loaderRef, inView] = useInView({
    rootMargin: '100px 0px',
  });

  useEffect(() => {
    if (inView && loadCount < totalPage) {
      loadCount++;
      setSize(size + 1);
    }
  }, [inView]);

  return (
    <Layout>
      <Seo title="WORKS" />
      <motion.div
        data-controller="skew"
        data-skew-options='{ "val": 1.6 }'
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <Heading total={totalPost} />
        <div className={styles.entryListGroup}>
          {chunkedPostData.map((postData, i) => (
            <div
              className={`${styles.entryList} o-grid`}
              data-target="skew.item"
              key={i}
            >
              {postData.posts.nodes.map((item, j) => (
                <article className="o-grid__item" data-smooth-item key={j}>
                  <Entry
                    data={item}
                    index={Utils.zeroPadding(
                      totalPost - (j + (i + i * (PER_PAGE - 1))),
                      2
                    )}
                  />
                </article>
              ))}
            </div>
          ))}
        </div>
        <div ref={loaderRef} />
        {isValidating ? <div>Loading...</div> : null}
        {error ? <div>Try to reload.</div> : null}
      </motion.div>
    </Layout>
  );
};

export default Component;

const getQuery = (offset: number) => {
  const graphql = gql`
    query {
      posts(where: {
        orderby: {field: DATE, order: DESC},
        offsetPagination: {offset: ${offset}, size: ${PER_PAGE}}}
      ) {
        nodes {
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
    }
  `;
  return graphql;
};

export const GET_INITIAL_POSTS = gql`
  query {
    posts(
      where: {
        orderby: { field: DATE, order: DESC }
        offsetPagination: { size: ${PER_PAGE} }
      }
    ) {
      nodes {
        title
        slug
        acf {
          eyecatch {
            sourceUrl
          }
          category {
            name
          }
          themeColor
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
  const data = await fetcher(GET_INITIAL_POSTS);
  return {
    props: {
      data,
      total: data.posts.pageInfo.offsetPagination.total,
    },
  };
}
