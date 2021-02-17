import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './entry.module.scss';

import { useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';

const Component = React.memo(({ data, index }: { data; index }) => {
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);

  const handlePointerDown = () => {
    setHover(true);
    dispatch(SET_UI_COLOR(data.node.acf.themeColor));
  };

  const handlePointerUp = () => {
    setHover(false);
  };

  return (
    <>
      <Link href={'/works/' + data.node.slug}>
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
              <Image
                src={data.node.acf.eyecatch.sourceUrl}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
            <div className={styles.entry__hgroup}>
              <p className={styles.num}>
                {index}
                <span>Project</span>
              </p>
              <h2 className={styles.heading}>{data.node.title}</h2>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
});

export default Component;
