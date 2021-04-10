import React, { useRef, useState, useEffect } from 'react';
import { NextPage } from 'next';
import Layout from '~/layouts/Layout';
import Seo from '~/components/Seo';
import Link from 'next/link';
import Utils from '~/foundation/utils/Utils';
import { qsa, qs } from '~/foundation/utils/dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { fetcher } from '~/foundation/fetcher';
import { transition } from '~/foundation/animations';

type Data = {
  posts: {
    nodes: {
      slug: string;
      title: string;
      acf: any;
    }[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
};

type Props = {
  data: Data;
};

const Component: NextPage<Props> = props => {
  const initialData = props.data;
  const { data } = useSWR<Data>(GET_POSTS, fetcher, { initialData });
  const posts = data.posts.nodes;
  const total = data.posts.pageInfo.offsetPagination.total;
  const now = 1;
  const max = posts.length;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(total - now);
  const progressRef = useRef(null);
  const canvasRef = useRef(null);
  return (
    <Layout>
      <Seo title="NAGISA KUBO" />
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <canvas className="gl" ref={canvasRef}></canvas>
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
          <div className="l-progress">
            <div className="u-in">
              <div className="c-progressCtrl">
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
              </div>
            </div>
          </div>
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
    posts(first: 5) {
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
