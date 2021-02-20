import React, { useEffect, useState } from 'react';
import Layout from '~/components/layout';
import Seo from '~/components/seo';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';
import { scrollBufferSelector } from '~/state/app';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { transition } from '~/animations/index';
import { fetcher } from '~/lib/fetcher';

import styles from './[slug].module.scss';
import Kv from '~/components/single-works/kv';
import Intro from '~/components/single-works/intro';
import CaptchaList from '~/components/single-works/captchaList';
import NextProject from '~/components/single-works/nextProject';

interface IProps {
  data: {
    post;
    path;
  };
}

const Component: React.FC<IProps> = props => {
  const variables = { slug: props.data.path };
  const { data } = useSWR([GET_POST, variables], fetcher, {
    initialData: props.data.post,
  });
  const { title, acf, date, previous } = data;
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
          <Kv title={title} img={eyecatch.sourceUrl} category={category.name} />
          <div className={styles.content} data-target="skew.item">
            <Intro
              date={date}
              role={role}
              description={description}
              url={url}
            />
            <CaptchaList gallery={gallery} color={themeColor} />
            {previous !== null && (
              <NextProject
                title={previous.title}
                img={previous.acf.eyecatch.sourceUrl}
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
  const variables = { slug: params?.slug ?? '' };
  const { post } = await fetcher(GET_POST, variables);

  return {
    props: {
      data: {
        post: post ?? {},
        path: params?.slug,
      },
    },
  };
}
