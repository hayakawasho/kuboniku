import React from 'react';
import styles from './kv.module.scss';

type Props = {
  src: string;
  srcSet: string;
  mobile: {
    srcSet: string;
  };
  title: string;
  category: string;
};

const Component: React.FC<Props> = props => {
  return (
    <div className={styles.kv} data-smooth-item>
      <div className={styles.kv__cont} data-target="skew.item">
        <h1 className={styles.heading}>
          <div className="u-ovh u-inline-block">
            <span className="u-inline-block u-origin-right">{props.title}</span>
          </div>
        </h1>
        <p className="u-ovh">
          <span className="u-inline-block u-origin-right">
            {props.category}
            <i className="icon-arrow-right" />
          </span>
        </p>
      </div>
      <picture className={styles.kv__img} data-target="skew.item">
        {props.mobile && (
          <source media="(max-width: 639px)" srcSet={props.mobile.srcSet} />
        )}
        <img
          src={props.src}
          srcSet={props.srcSet}
          alt=""
          decoding="async"
          className="u-abs u-fit u-pos-tl u-object-cover u-object-center"
        />
      </picture>
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
