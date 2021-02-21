import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
              <Image
                src={data.acf.eyecatch.sourceUrl}
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
              <h2 className={styles.heading}>{data.title}</h2>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
});

export default Component;
