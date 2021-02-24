import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Seo from '~/components/seo';
import { motion } from 'framer-motion';
import Layout from '~/components/layout';
import Heading from '~/components/works/heading';
import Entry from '~/components/works/entry';

import { useSWRInfinite } from 'swr';
import { gql } from 'graphql-request';
import { fetcher } from '~/foundation/fetcher';
import { useInView } from 'react-intersection-observer';
import { transition } from '~/foundation/animations';
import Utils from '~/foundation/utils/Utils';

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

type Props = {
  data: Data;
  total: number;
};

const PER_PAGE = 10;
let loadCount = 1;

const Component: NextPage<Props> = props => {
  const initialData = props.data;
  const totalPost = props.total;
  const totalPage = totalPost / PER_PAGE;
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    index => getQuery(index * PER_PAGE),
    fetcher,
    {
      revalidateOnFocus: false,
      initialData: [initialData],
    }
  );

  const chunkedPostData = data ? [].concat(...data) : [];

  const [entryLoaderRef, inView] = useInView({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView && !isValidating && loadCount < totalPage) {
      setSize(size + 1).then(() => loadCount++);
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
        className="worksIndexBody"
      >
        <Heading total={totalPost} />
        <div className="worksIndexEntryListGroup">
          {chunkedPostData.map((postData, i) => (
            <div
              className={`worksIndexEntryList o-grid`}
              data-target="skew.item"
              key={i}
            >
              {postData.posts.nodes.map((item, j) => {
                const projectIndex = Utils.zeroPadding(
                  totalPost - (j + (i + i * (PER_PAGE - 1))),
                  2
                );
                return (
                  <article className="o-grid__item" data-smooth-item key={j}>
                    <Entry data={item} index={projectIndex} />
                  </article>
                );
              })}
            </div>
          ))}

          <div ref={entryLoaderRef} className="worksIndexEntryLoader">
            {isValidating && <div className="worksIndexLoadingSpin" />}
          </div>
        </div>
        {error ? <div>Try to reload.</div> : null}
      </motion.div>
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher(GET_INITIAL_POSTS);
  return {
    data,
    total: data.posts.pageInfo.offsetPagination.total,
  };
};

const getQuery = (offset: number) => {
  const graphql = gql`
    query {
      posts(where: { offsetPagination: {offset: ${offset}, size: ${PER_PAGE}} }) {
        nodes {
          title
          slug
          acf {
            url
            themeColor
            eyecatch {
              sourceUrl
              srcSet
            }
          }
        }
      }
    }
  `;
  return graphql;
};

const GET_INITIAL_POSTS = gql`
  query {
    posts(
      where: { offsetPagination: { size: ${PER_PAGE} } }) {
      nodes {
        title
        slug
        acf {
          eyecatch {
            sourceUrl
            srcSet
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
