import React from 'react';
import Image from 'next/image';
import styles from './captchaList.module.scss';

type Props = {
  gallery: [];
  color: string;
};

const Component: React.FC<Props> = ({ gallery, color }) => {
  return (
    <ul className={styles.captchaList} data-smooth-item>
      {gallery.map((item: any, i) => {
        const aspect = Math.round(
          (item.mediaDetails.height / item.mediaDetails.width) * 100
        );
        return (
          <li className="u-rel" key={i}>
            <div
              className="c-aspect"
              style={{
                paddingTop: `${aspect}%`,
                backgroundColor: `${color}`,
              }}
            />
            <Image
              src={item.sourceUrl}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Component;
