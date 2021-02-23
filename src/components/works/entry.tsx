import React, { useState } from 'react';
import Link from 'next/link';
import styles from './entry.module.scss';

import { useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';

interface Props {
  data: {
    title: string;
    slug: string;
    acf: any;
  };
  index: number | string;
}

const Component: React.FC<Props> = React.memo(({ data, index }) => {
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);

  const handlePointerDown = () => {
    setHover(true);
    dispatch(SET_UI_COLOR(data.acf.themeColor));
  };

  const handlePointerUp = () => {
    setHover(false);
  };

  return (
    <>
      <Link href={'/works/' + data.slug}>
        <a
          className={`${styles.entry} ${isHover ? 'is-hover' : ''}`}
          onMouseEnter={handlePointerDown}
          onTouchStart={handlePointerDown}
          onMouseLeave={handlePointerUp}
          onTouchEnd={handlePointerUp}
        >
          <div className="c-aspect" />
          <div className="u-abs u-pos-tl u-fit">
            <div className={styles.eyecatch}>
              <img
                src={data.acf.eyecatch.sourceUrl}
                srcSet={data.acf.eyecatch.srcSet}
                alt=""
                loading="lazy"
                className="u-abs u-fit u-pos-tl u-object-cover u-object-center"
              />
            </div>
            <div className={styles.entry__hgroup}>
              <p className={styles.num}>
                {index}
                <span>Project</span>
              </p>
              <h2 className={styles.heading}>{data.title}</h2>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
});

export default Component;
