import React from 'react';

interface IProps {
  gallery: {
    sourceUrl: string;
    srcSet: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  }[];
  color: string;
}

const Component: React.FC<IProps> = ({ gallery, color }) => {
  return (
    <ul className="worksDetailCaptchaList" data-smooth-item>
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
