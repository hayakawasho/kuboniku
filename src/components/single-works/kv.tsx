import React from 'react';
import Image from 'next/image';
import styles from './kv.module.scss';

interface IProps {
  img: string;
  title: string;
  category: string;
}

const Component: React.FC<IProps> = ({ img, title, category }) => {
  return (
    <div className={styles.kv} data-smooth-item>
      <div className={styles.kv__cont} data-target="skew.item">
        <h1 className={styles.heading}>
          <div className="u-ovh u-inline-block">
            <span className="u-inline-block u-origin-right">{title}</span>
          </div>
        </h1>
        <p className="u-ovh">
          <span className="u-inline-block u-origin-right">
            {category}
            <i className="icon-arrow-right" />
          </span>
        </p>
      </div>
      <div className={styles.kv__img} data-target="skew.item">
        <Image
          src={img}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="50% 50%"
          priority
        />
      </div>
      <div className={styles.kv__scroll}>
        <div className="u-in u-ovh">
          <div className={styles.kv__scrollLabel}>scroll</div>
        </div>
        <i className="icon-arrow-down" />
      </div>
    </div>
  );
};

export default Component;
