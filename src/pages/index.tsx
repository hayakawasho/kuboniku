import React, { useRef, useState, useEffect } from 'react';
import SEO from '~/foundation/seo';
import Slider from 'react-slick';
import Entry from '~/foundation/components/_home/entry';
import styles from './index.module.scss';
import Utils from '~/foundation/utils/Utils';
import { qsa, qs } from '~/foundation/utils/dom';
import { gsap } from 'gsap';

import client from '~/client/apollo';
import { gql } from '@apollo/client';

const Component = ({ data }) => {
  const { posts } = data;
  const { total } = posts.pageInfo.offsetPagination;
  const slickRef = useRef(null);
  const nextRef = useRef(null);
  const progressRef = useRef(null);
  const [slickAnimating, setSlickAnimating] = useState(false);

  const slickSetting = {
    fade: true,
    dots: false,
    arrows: false,
    infinite: false,
    speed: 700,
    draggable: false,
    useCSS: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          speed: 1000,
          vertical: true,
          infinite: true,
          verticalSwiping: true,
          beforeChange: (oldIndex, newIndex) => {
            // const mount = qs('.js-slides');
            // const slides = qsa('.slick-slide', mount);
            // const direction = 1;

            setSlickAnimating(true);

            //gsap.set([slides[oldIndex], slides[newIndex]], {
            //  autoAlpha: 1,
            //});

            /*
            gsap.fromTo(
              slides[oldIndex],
              0.7,
              {
                zIndex: 2,
              },
              {
                y: `${-100 * direction}%`,
                ease: 'quint.inoOut',
                clearProps: 'z-index, transform',
              }
            );

            gsap.to(qs('.js-slide', slides[oldIndex]), 0.7, {
              y: `${100 * direction}%`,
              ease: 'quint.inoOut',
              clearProps: 'transform',
            });

            gsap.set(slides[newIndex], {
              y: `0%`,
              zIndex: 0,
            });
            */
          },
          afterChange: index => {
            setSlickAnimating(false);
          },
        },
      },
    ],
  };

  useEffect(() => {
    const body = document.body;
    body.classList.add('is-home');

    return () => {
      body.classList.remove('is-home');
    };
  }, []);

  return (
    <>
      <SEO title="NAGISA KUBO" />
      <div className="u-rel u-ovh js-slides" data-smooth-item>
        <Slider
          className={`${styles.slides} u-cf ${
            slickAnimating ? 'is-animating' : ''
          }`}
          ref={slickRef}
          {...slickSetting}
        >
          {posts.edges.map((i, index) => (
            <Entry
              data={i}
              index={Utils.zeroPadding(total - (index + 1), 2)}
              key={index}
            />
          ))}
        </Slider>
        <button className={styles.scroll} ref={nextRef}>
          <div className="u-in u-ovh">
            <div className={styles.scrollLabel}>
              {total}
              <span>Project</span>
            </div>
          </div>
          <i className="icon-arrow-down" />
        </button>
      </div>
    </>
  );
};

export default Component;

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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      data,
    },
  };
}
