import React from 'react';

interface IProps {
  src: string;
  srcSet: string;
  mobile: {
    srcSet: string;
  };
  title: string;
  category: string;
}

const Component: React.FC<IProps> = props => {
  return (
    <div className="worksDetailKv" data-smooth-item>
      <div className="worksDetailKv__cont" data-target="skew.item">
        <h1 className="worksDetailKvHeading">
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
      <picture className="worksDetailKv__img" data-target="skew.item">
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
      <div className="worksDetailKv__scroll">
        <div className="u-in u-ovh">
          <div className="worksDetailKv__scrollLabel">scroll</div>
        </div>
        <i className="icon-arrow-down" />
      </div>
    </div>
  );
};

export default Component;
