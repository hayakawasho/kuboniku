import React from 'react';
import styles from './captchaList.module.scss';

type Props = {
  gallery: {
    sourceUrl: string;
    srcSet: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  }[];
  color: string;
};

const Component: React.FC<Props> = ({ gallery, color }) => {
  return (
    <ul className={styles.captchaList} data-smooth-item>
      {gallery.map((item, i) => {
        const aspect = Math.round(
          (item.mediaDetails.height / item.mediaDetails.width) * 100
        );
        const css = {
          '--aspect': `${aspect}%`,
          backgroundColor: `${color}`,
        };
        return (
          <li className="u-rel" key={i}>
            <div className="c-aspect" style={css} />
            <img
              src={item.sourceUrl}
              srcSet={item.srcSet}
              alt=""
              loading="lazy"
              className="u-abs u-fit u-pos-tl"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Component;
