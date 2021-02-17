import React, { useEffect } from 'react';
import styles from './entryList.module.scss';
import { useInView } from 'react-intersection-observer';
import client from '~/client/apollo';
import { gql } from '@apollo/client';
import Entry from '~/components/works/entry';
import Utils from '~/foundation/utils/Utils';

interface IProps {
  posts: [];
  total: number;
}

const Component: React.FC<IProps> = ({ posts, total }) => {
  const [loaderRef, inView] = useInView({
    rootMargin: '200px 0px',
  });

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async () => {
    const { data } = await client.query({
      query: gql`
        query {
          posts(where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                title
                slug
                acf {
                  url
                  themeColor
                  eyecatch {
                    sourceUrl
                  }
                }
              }
            }
            pageInfo {
              offsetPagination {
                hasMore
              }
            }
          }
        }
      `,
    });
  };

  return (
    <>
      <div className={`${styles.entryList} o-grid`} data-target="skew.item">
        {posts.map((item, i) => (
          <article className="o-grid__item" data-smooth-item key={i}>
            <Entry data={item} index={Utils.zeroPadding(total - i, 2)} />
          </article>
        ))}
      </div>
      <div className={styles.loader} ref={loaderRef} />
    </>
  );
};

export default Component;
