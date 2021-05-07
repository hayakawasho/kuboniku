import React, { useRef, useState, useMemo } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import Utils from '~/foundation/utils/Utils';
import { fetcher } from '~/foundation/fetcher';
import { transition } from '~/foundation/animations';
import Layout from '~/layouts/Layout';
import ProgressBar from '~/components/ProgressBar';
import Seo from '~/foundation/components/Seo';
import { IWorks, ICustomField } from '~/domain/works';
const Canvas = dynamic(
  () => import('~/foundation/containers/home').then(modules => modules.Canvas),
  {
    ssr: false,
  }
);
import tw, { css } from 'twin.macro';

interface IData {
  posts: {
    nodes: {
      slug: string;
      title: string;
      acf: ICustomField;
    }[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}

interface IProps {
  data: IData;
}

const Component: NextPage<IProps> = props => {
  const initialData = props.data;
  const { data } = useSWR<IData>(GET_POSTS, fetcher, { initialData });
  const posts = data.posts.nodes;
  const total = data.posts.pageInfo.offsetPagination.total;
  const now = 1;
  const max = posts.length;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(total - now);
  const progressRef = useRef(null);

  const images = useMemo(() => {
    return data.posts.nodes.map((item, i) => item.acf.eyecatchMobile.sourceUrl);
  }, [data]);

  return (
    <Layout>
      <Seo title="NAGISA KUBO" />
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <Canvas images={images} />
        <div className="homeScreen">
          <ul className="homeWorksList">
            {posts.map((item, i) => (
              <li key={i}>
                <div className="homeEntry">
                  <Link scroll={false} href={`/works/${item.slug}`}>
                    <a
                      className="homeGroup u-z-10"
                      data-gl-texture={item.acf.eyecatch.sourceUrl}
                      data-gl-id={item.slug}
                    >
                      <p className="homeNum">
                        {Utils.zeroPadding(total - i, 2)}
                        <span>Project</span>
                      </p>
                      <h2 className="homeHeading">{item.title}</h2>
                      <p>
                        {item.acf.category.name}
                        <i className="icon-arrow-right" />
                      </p>
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="homeBtm">
            <div className="u-in u-ovh">
              <div className="homeBtm__label">
                {currentProjectIndex}
                <span>Project</span>
              </div>
            </div>
            <i className="icon-arrow-down" />
          </button>
          <ProgressBar>
            <ol>
              {posts.map((item, i) => (
                <li key={i}>
                  <span>{Utils.zeroPadding(i + 1, 2)}</span>
                </li>
              ))}
            </ol>
            <div className="c-progressBar">
              <span className="c-progressBar__l" ref={progressRef} />
            </div>
            <div className="u-abs">
              <span>{Utils.zeroPadding(max, 2)}</span>
            </div>
          </ProgressBar>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {
  const data = await fetcher(GET_POSTS);
  return {
    data,
  };
};

export const GET_POSTS = gql`
  query {
    posts(first: 4) {
      nodes {
        title
        slug
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

const kv = css`
  ${tw`relative w-full overflow-hidden block`}
  height: calc(var(--vh) * 100);
  perspective: 1000px;

  @media (min-width: 640px) {
    ${tw`h-screen`}
  }
`;

const kvNext = css`
  ${tw`h-screen`}

  a {
    ${tw`absolute top-0 left-0 w-full h-full`}
    z-index: 3;
  }

  img {
    filter: grayscale(1);
  }
`;

const kv__cont = css`
  ${tw`absolute top-1/2 left-0 w-full`}
  z-index: 2;
  padding-left: var(--grid);
  color: #fff;
`;

const heading = css`
  ${tw`font-semibold`}
  padding-left: 1.2rem;
  font-family: var(--font-roboto);
  font-size: 3.9rem;
  line-height: 1;
  color: #fff;

  @media (min-width: 640px) {
    font-size: 7rem;
  }
`;

const sub = css`
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  padding-left: 1.2rem;
  margin-top: 1rem;

  .icon-arrow-right {
    font-size: 0.7rem;
    margin-left: 0.8rem;
  }
`;

const kv__scrollDown = css`
  ${tw`absolute left-1/2 overflow-hidden transform -translate-x-1/2 font-bold`}
  bottom: 5rem;
  font-family: var(--font-en);
  font-size: 1rem;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.02em;
  z-index: 2;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }

  .icon-arrow-down {
    ${tw`block text-center`}
    margin-top: 1.2rem;
  }
`;

const kv__scrollLabel = css`
  ${tw`inline-block`}
  animation: front 6s cubic-bezier(0.77, 0, 0.175, 1) infinite;

  &::before {
    ${tw`absolute block origin-left`}
    bottom: -30px;
    content: 'scroll';
    animation: back 6s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
`;
