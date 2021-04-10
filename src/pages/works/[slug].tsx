import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Layout from '~/layouts/Layout';
import Seo from '~/components/Seo';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';
import { scrollBufferSelector } from '~/state/app';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { transition } from '~/foundation/animations';
import { fetcher } from '~/foundation/fetcher';

import styles from './[slug].module.scss';
import Kv from '~/components/pages/single-works/kv';
import Intro from '~/components/pages/single-works/intro';
import CaptchaList from '~/components/pages/single-works/captchaList';
import NextProject from '~/components/pages/single-works/nextProject';

type Data = {
  post: {
    date: string;
    title: string;
    acf: any;
    previous: {
      title: string;
      slug: string;
      acf: any;
    };
  };
};

type Props = {
  data: Data;
  path: string;
};

const Component = props => {
  const initialData = props.data;
  const variables = { slug: props.path };
  const { data } = useSWR<Data>([GET_POST, variables], fetcher, {
    initialData,
  });
  const { title, acf, date, previous } = data.post;
  const dispatch = useDispatch();
  const scrollBuffer = useSelector(scrollBufferSelector);
  const { scrollYProgress } = useViewportScroll();
  const inputRange = [0, 1];
  const outputRange = [scrollBuffer, 1];
  const progressVal = useTransform(scrollYProgress, inputRange, outputRange);

  return (
    <Layout>
      <Seo title={title} />
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <div data-controller="skew">
          <Kv
            title={title}
            src={acf.eyecatch.sourceUrl}
            srcSet={acf.eyecatch.srcSet}
            mobile={acf.eyecatchMobile}
            category={acf.category.name}
          />
          <div className={styles.content} data-target="skew.item">
            <Intro
              date={date}
              role={acf.role}
              description={acf.description}
              url={acf.url}
            />
            {acf.gallery && (
              <CaptchaList gallery={acf.gallery} color={acf.themeColor} />
            )}
            {previous && (
              <NextProject
                title={previous.title}
                src={previous.acf.eyecatch.sourceUrl}
                srcSet={previous.acf.eyecatch.srcSet}
                mobile={previous.acf.eyecatchMobile}
                slug={previous.slug}
              />
            )}
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
      </motion.div>
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async ({ query }) => {
  const variables = { slug: query?.slug ?? '' };
  const data = await fetcher(GET_POST, variables);

  return {
    data,
    path: query?.slug,
  };
};

// export async function getServerSideProps({ params }) {
//   const variables = { slug: params?.slug ?? '' };
//   const data = await fetcher(GET_POST, variables);
//
//   return {
//     props: {
//       data,
//       path: params?.slug,
//     },
//   };
// }

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
            srcSet
          }
          eyecatchMobile {
            srcSet
          }
        }
      }
      acf {
        eyecatch {
          sourceUrl
          srcSet
        }
        eyecatchMobile {
          srcSet
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
          srcSet
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;
