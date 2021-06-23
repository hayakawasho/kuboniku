import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { SET_UI_COLOR } from '~/state/ui';
import { scrollBufferSelector } from '~/state/app';
import { transition } from '~/foundation/animations';
import { fetcher } from '~/foundation/fetcher';
import { Layout } from '~/components/layouts';
import { IWorks } from '~/domain/works.model';
import { WorksDetailContainer } from '~/components/pages/works';

const Component: NextPage = props => {
  return (
    <Layout title="WORKS">
      <WorksDetailContainer />
    </Layout>
  );
};

export default Component;

Component.getInitialProps = async () => {};

/*
interface IProps {
  data: IWorks;
  path: string;
}

const Component = props => {
  const initialData = props.data;
  const variables = { slug: props.path };
  const { data } = useSWR<IWorks>([GET_POST, variables], fetcher, {
    initialData,
  });
  const { title, acf, date, previous } = data.post;
  const dispatch = useDispatch();
  const scrollBuffer = useSelector(scrollBufferSelector);
  const { scrollYProgress } = useViewportScroll();
  const inputRange = [0, 1];
  const outputRange = [scrollBuffer, 1];
  const progressVal = useTransform(scrollYProgress, inputRange, outputRange);
  const { val, onScroll } = useSkewScroll(scrollYProgress.get());

  // const [,] = useWorksValue(variables);

  return (
    <Layout title={title}>
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={transition}
      >
        <div data-controller="skew">
          <div css={kv} data-smooth-item>
            <div css={kv__cont} data-target="skew.item">
              <h1 css={heading}>
                <div tw="inline-block overflow-hidden">
                  <span tw="inline-block origin-right">{data.post.title}</span>
                </div>
              </h1>
              <p css={sub} tw="overflow-hidden">
                <span tw="inline-block origin-right">
                  {data.post.acf.category.name}
                  <i className="icon-arrow-right" />
                </span>
              </p>
            </div>
            <Picture
              src={data.post.acf.eyecatch.sourceUrl}
              srcSet={data.post.acf.eyecatch.srcSet}
              mobile={data.post.acf.eyecatchMobile.sourceUrl ?? null}
            />
            <div css={kv__scrollDown}>
              <div tw="relative w-full h-full overflow-hidden">
                <div css={kv__scrollLabel}>scroll</div>
              </div>
              <i className="icon-arrow-down" />
            </div>
          </div>
          <div css={worksContent} data-target="skew.item">
            <div css={intro} data-smooth-item>
              <div css={intro__info}>
                <dl css={dl}>
                  <dt css={dt}>Year :</dt>
                  <dd css={dd}>
                    {format(parseISO(data.post.date), 'MMMM d, yyyy')}
                  </dd>
                </dl>
                <dl css={dl}>
                  <dt css={dt}>Role :</dt>
                  <dd css={dd}>
                    <ul>
                      {data.post.acf.role.map((item, i) => (
                        <li key={i}>{item.name}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
              </div>
              {data.post.acf.url && (
                <a
                  css={intro__viewLink}
                  href={data.post.acf.url}
                  target="_blank"
                  rel="noopener"
                >
                  View website
                  <div css={intro__viewLink__hr} />
                </a>
              )}
            </div>
            {acf.gallery && (
              <CaptchaList gallery={acf.gallery} color={acf.themeColor} />
            )}
            {previous && (
              <aside css={[kv, kvNext]} className="is-next" data-smooth-item>
                <Link scroll={false} href={'/works/' + previous.slug}>
                  <a tw="absolute w-full h-full z-10" />
                </Link>
                <div css={kv__cont}>
                  <h2 css={heading}>Next Project</h2>
                  <p css={sub}>
                    {previous.title}
                    <i className="icon-arrow-right" />
                  </p>
                </div>
                <Picture
                  src={previous.acf.eyecatch.sourceUrl}
                  srcSet={previous.acf.eyecatch.srcSet}
                  mobile={previous.acf.eyecatchMobile.sourceUrl ?? null}
                />
              </aside>
            )}
          </div>
        </div>
        <ProgressBar>
          <div className="c-progressBar">
            <motion.span
              className="c-progressBar__l"
              style={{ scaleY: progressVal }}
            />
          </div>
        </ProgressBar>
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
            sourceUrl
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
          sourceUrl
          srcSet
        }
        category {
          name
        }
        role {
          name
        }
        themeColor
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

*/
