import React, { useRef, useState, useEffect } from 'react';
import Layout from '~/components/layout';
import Seo from '~/components/seo';
import Link from 'next/link';
import styles from './index.module.scss';
import Utils from '~/foundation/utils/Utils';
import { qsa, qs } from '~/foundation/utils/dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { request, gql } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

interface IProps {
  data;
}

const Component: React.FC<IProps> = props => {
  const { data } = useSWR(WP_API_END_POINT, fetcher, {
    initialData: props.data,
  });
  const { edges, pageInfo } = data;
  const { total } = pageInfo.offsetPagination;
  const now = 1;
  const max = edges.length;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(total - now);
  const progressRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const body = document.body;
    body.classList.add('is-home');

    return () => {
      body.classList.remove('is-home');
    };
  }, []);

  return (
    <Layout>
      <Seo title="NAGISA KUBO" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.18, 0.06, 0.23, 1],
        }}
      >
        <canvas className="gl" ref={canvasRef}></canvas>
        <div className={styles.screen}>
          <ul className={styles.worksList}>
            {edges.map((item, i) => (
              <li className="u-in" key={i}>
                <div className={styles.entry}>
                  <Link href={`/works/${item.node.slug}`}>
                    <a
                      className="u-abs u-fit u-z-10"
                      data-gl-texture={item.node.acf.eyecatch.sourceUrl}
                      data-gl-id={item.node.slug}
                    ></a>
                  </Link>
                  <div className={styles.g}>
                    <p className={styles.num}>
                      {Utils.zeroPadding(total - i, 2)}
                      <span>Project</span>
                    </p>
                    <h2 className={styles.heading}>{item.node.title}</h2>
                    <p>
                      {item.node.acf.category.name}
                      <i className="icon-arrow-right" />
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className={styles.btm}>
            <div className="u-in u-ovh">
              <div className={styles.btm__label}>
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
                  {edges.map((item, i) => (
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

// Latest works
export const GET_POSTS = gql`
  query {
    posts(first: 5) {
      edges {
        node {
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
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
`;

const fetcher = query => request(WP_API_END_POINT, query);

export async function getServerSideProps() {
  const { posts } = await fetcher(GET_POSTS);
  return {
    props: {
      data: posts,
    },
  };
}
