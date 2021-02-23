import React from 'react';
import Link from 'next/link';
import styles from './kv.module.scss';

type Props = {
  src: string;
  srcSet: {
    pc: {
      srcSet: string;
    };
    mobile: {
      srcSet: string;
    };
  };
  title: string;
  slug: string;
};

const Component: React.FC<Props> = props => {
  return (
    <aside className={`${styles.kv} is-next`} data-smooth-item>
      <Link href={'/works/' + props.slug}>
        <a className="u-abs u-fit u-z-10"></a>
      </Link>
      <div className={styles.kv__cont}>
        <h2 className={styles.heading}>Next Project</h2>
        <p>
          {props.title}
          <i className="icon-arrow-right" />
        </p>
      </div>
      <picture className={styles.kv__img}>
        {props.srcSet.mobile && (
          <source
            media="(max-width: 639px)"
            srcSet={props.srcSet.mobile.srcSet}
          />
        )}
        <img
          src={props.src}
          srcSet={props.srcSet.pc.srcSet}
          alt=""
          loading="lazy"
          className="u-abs u-fit u-pos-tl u-object-cover u-object-center"
        />
      </picture>
    </aside>
  );
};

export default Component;
