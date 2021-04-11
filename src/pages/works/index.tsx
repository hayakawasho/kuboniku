import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { useSWRInfinite } from 'swr';
import { gql } from 'graphql-request';
import { useInView } from 'react-intersection-observer';
import { fetcher } from '~/foundation/fetcher';
import { transition } from '~/foundation/animations';
import Utils from '~/foundation/utils/Utils';
// components
import Layout from '~/layouts/Layout';
import Seo from '~/components/Seo';
import Heading from '~/components/pages/works/Heading';
import Entry from '~/components/pages/works/Entry';
// hooks
import { useSkewScroll } from '~/hooks/useSkewScroll';

type TEntryData = React.ComponentProps<typeof Entry>['data'];

interface IData {
  posts: {
    nodes: TEntryData[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}

interface IProps {
  data: IData;
  total: number;
}

const PER_PAGE = 10;

const Component: NextPage<IProps> = props => {
  const initialData = props.data;
  const totalPost = props.total;
  const totalPage = totalPost / PER_PAGE;
  const loadCount = useRef(1);

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
    if (inView && !isValidating && loadCount.current < totalPage) {
      setSize(size + 1).then(() => loadCount.current++);
    }
  }, [inView]);

  const { onScroll } = useSkewScroll();

  return (
    <Layout>
      <Seo title="WORKS" />
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
        className="worksIndexBody"
      >
        <Heading total={totalPost} />
        <div className="worksIndexEntryListGroup">
          {chunkedPostData.map((postData, i) => (
            <div className={`worksIndexEntryList o-grid`} key={i}>
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
