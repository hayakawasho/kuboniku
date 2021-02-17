import React, { useEffect, useState } from 'react';
import Layout from '~/components/layout';
import Seo from '~/components/seo';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import client from '~/client/apollo';
import { gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';
import { scrollBufferSelector } from '~/state/app';

import styles from './[slug].module.scss';
import Kv from '~/components/single-works/kv';
import Intro from '~/components/single-works/intro';
import CaptchaList from '~/components/single-works/captchaList';
import NextProject from '~/components/single-works/nextProject';

const Component = ({ data }) => {
  const { post } = data;
  const { title, acf, date, previous } = post;
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

  useEffect(() => {
    dispatch(SET_UI_COLOR(themeColor));
  }, []);

  return (
    <Layout>
      <Seo title={title} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.18, 0.06, 0.23, 1],
        }}
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
  const { data } = await client.query({
    query: GET_POST,
    variables: {
      slug: params?.slug ?? '',
    },
  });

  return {
    props: {
      data: {
        post: data?.post ?? {},
        path: params?.slug,
      },
    },
  };
}
