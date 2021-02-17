import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './kv.module.scss';

interface IProps {
  img: string;
  title: string;
  slug: string;
}

const Component: React.FC<IProps> = ({ img, title, slug }) => {
  return (
    <aside className={`${styles.kv} is-next`} data-smooth-item>
      <Link href={'/works/' + slug}>
        <a className="u-abs u-fit u-z-10"></a>
      </Link>
      <div className={styles.kv__cont}>
        <h2 className={styles.heading}>Next Project</h2>
        <p>
          {title}
          <i className="icon-arrow-right" />
        </p>
      </div>
      <div className={styles.kv__img}>
        <Image
          src={img}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </div>
    </aside>
  );
};

export default Component;
