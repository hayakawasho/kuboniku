import React, { useRef, useState } from 'react';
import SEO from '~/foundation/seo';
import Slider from 'react-slick';
import Entry from '~/foundation/components/_home/entry';
import styles from './index.module.scss';
import Utils from '~/foundation/utils/Utils';

import client from '~/client/apollo';
import { gql } from '@apollo/client';

const Component = ({ data }) => {
  const { posts } = data;
  const { total } = posts.pageInfo.offsetPagination;
  const slickRef = useRef(null);
  const slickProgressRef = useRef(null);
  const [slickAnimating, setSlickAnimating] = useState(false);

  const slickSetting = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 350,
    draggable: false,
    cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    responsive: [
      {
        breakpoint: 640,
        settings: {
          speed: 300,
          vertical: true,
          infinite: true,
          verticalSwiping: true,
        },
      },
    ],
  };

  return (
    <>
      <SEO title="NAGISA KUBO" />
      <div data-smooth-item>
        <Slider
          className={`${styles.kv} u-cf`}
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
