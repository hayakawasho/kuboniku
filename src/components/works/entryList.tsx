import React from 'react';
import styles from './entryList.module.scss';
import Entry from '~/components/works/entry';
import Utils from '~/foundation/utils/Utils';

interface IProps {
  posts: [];
  total: number;
}

const Component: React.FC<IProps> = ({ posts, total }) => {
  return (
    <>
      <div className={`${styles.entryList} o-grid`} data-target="skew.item">
        {posts.map((item, i) => (
          <article className="o-grid__item" data-smooth-item key={i}>
            <Entry data={item} index={Utils.zeroPadding(total - i, 2)} />
          </article>
        ))}
      </div>
    </>
  );
};

export default Component;
