import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './entry.module.scss';
import Utils from '~/foundation/utils/Utils';

const Component = React.memo(({ data, index }: { data; index }) => {
  return (
    <>
      <div className={`${styles.kv}`}>
        <Link href={'/works/' + data.node.slug}>
          <a className="u-abs u-fit u-z-10"></a>
        </Link>
        <div className={styles.kv__cont}>
          <h2 className={styles.heading}>{data.node.title}</h2>
          <p>
            {data.node.acf.category.name}
            <i className="icon-arrow-right" />
          </p>
        </div>
        <div className={styles.kv__img}>
          <Image
            src={data.node.acf.eyecatch.sourceUrl}
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="50% 50%"
            priority
          />
        </div>
      </div>
    </>
  );
});

export default Component;
