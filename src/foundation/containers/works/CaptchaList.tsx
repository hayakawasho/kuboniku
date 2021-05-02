import React from 'react';
import tw, { css } from 'twin.macro';
import { IWorks } from '~/models/works';

interface IProps {
  gallery: IWorks['post']['acf']['gallery']
  color: string;
}

const Component: React.FC<IProps> = ({ gallery, color }) => {
  return (
    <ul css={captchaList}>
      {
        gallery.map((item, i) => {
          const aspect = Math.round((item.mediaDetails.height / item.mediaDetails.width) * 100);
          const css = {
            '--aspect': `${aspect}%`,
            backgroundColor: `${color}`,
          };

          return (
            <li tw="relative" key={i}>
              <div className="c-aspect" style={css} />
              <img
                src={item.sourceUrl}
                srcSet={item.srcSet}
                alt=""
                loading="lazy"
                tw="absolute w-full h-full top-0 left-0"
              />
            </li>
          );
        })
      }
    </ul>
  );
};

export default Component;

const captchaList = css`
  padding: 0 var(--gap);
  margin-bottom: 10.5rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 10);
    padding: 0;
    margin: 0 auto 12rem;
  }

  > li {
    margin-bottom: 2rem;

    @media (min-width: 640px) {
      margin-bottom: 6rem;
    }

    .c-aspect {
      opacity: .2;
    }
  }
`
