import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useSWRInfinite } from 'swr';
import { gql } from 'graphql-request';
import { useInView } from 'react-intersection-observer';
import { fetcher } from '~/foundation/fetcher';
import { transition } from '~/foundation/animations';
import Utils from '~/foundation/utils/Utils';
import Layout from '~/layouts/Layout';
import Seo from '~/foundation/components/Seo';
import Entry from '~/foundation/containers/works/Entry';
import { useSkewScroll } from '~/hooks/useSkewScroll';
import tw, { css } from 'twin.macro';
// import { useRequestWorks } from '~/hooks/pages/works';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

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
  // const [result, status, {  }] = useRequestWorks()
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

  return (
    <Layout>
      <Seo title="WORKS" />
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
        css={container}
      >
        <h1 css={heading}>
          <div data-smooth-item>
            Works<sup css={heading__total}>{totalPost}</sup>
          </div>
        </h1>
        {chunkedPostData.map((postData, i) => (
          <div className="o-grid" css={entryList} key={i}>
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
        <div ref={entryLoaderRef} css={entryLoader}>
          {isValidating && <div className="worksIndexLoadingSpin" />}
        </div>
        {error ? <div>Try to reload.</div> : null}
      </motion.div>
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const queryClient = new QueryClient();

  const data = await fetcher(GET_INITIAL_POSTS);
  return {
    data,
    total: data.posts.pageInfo.offsetPagination.total,
  };
};

/*
Component.getInitialProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('works', fetcher)

  return {
    dehydratedState: dehydrate(queryClient),
  };
};
*/

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

const container = css`
  padding-top: 10rem;

    @media (min-width: 640px) {
      padding-top: 15rem;
    }
  }
`;

const heading = css`
  ${tw`relative font-bold`}
  padding: 0 calc(var(--gap) * 2);
  margin: 0 0 6rem;
  font-family: var(--font-roboto);
  font-size: 5.3rem;
  line-height: 1;

  @media (min-width: 640px) {
    ${tw`mt-0 mx-auto`}
    left: 2rem;
    width: calc(var(--grid) * 10);
    padding: 0 0 0 calc(var(--grid) * 0.5 + var(--gutter));
    margin-bottom: 3.6rem;
    font-size: 7.6rem;
  }
`;

const heading__total = css`
  ${tw`absolute`}
  top: 0.5em;
  margin-left: 0.5em;
  font-family: var(--font-en);
  font-size: calc(26.6 / 106.4 * 100%);
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: 0.41em;
`;

const entryList = css`
  padding: 0 calc(var(--gap) * 2);

  @media (min-width: 640px) {
    ${tw`flex flex-wrap justify-between my-0 mx-auto p-0`}
    width: calc(var(--grid) * 10);
  }

  .o-grid__item {
    margin-bottom: 4rem;

    @media (min-width: 640px) {
      width: calc(var(--grid) * 4);
      margin-bottom: 6.4rem;

      &:nth-of-type(2n - 1) {
        margin-top: 9.6rem;
        margin-left: 3.4rem;
      }
    }
  }
`;

const entryLoader = css`
  ${tw`text-center`}
  padding: 3.2rem 0;
`;
