import React from 'react';
import tw, { css } from 'twin.macro';

interface IProps {
  bar: React.ReactNode;
  index?: number[];
  max?: number;
}

const Component = ({ bar, index, max }: IProps) => {
  return (
    <div className="l-progress">
      <div tw="relative w-full h-full">
        <div tw="text-center" css={ctrl}>
          {index && (
            <ol>
              {index.map((num, i) => (
                <li key={i}>
                  <span>{num}</span>
                </li>
              ))}
            </ol>
          )}
          {bar}
          {max && (
            <div className="u-abs">
              <span>{max}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Component;

const ctrl = css`
  font-family: var(--font-en);
  font-size: 1rem;
  line-height: 1;
  letter-spacing: 0.2em;
  width: 1.5em;

  > ol {
    ${tw`absolute w-full overflow-hidden`}
    height: 1.5em;
    top: -1.5em;

    > li {
      ${tw`absolute inset-0 m-auto whitespace-nowrap opacity-0`}
      line-height: 2;

      &:first-of-type {
        opacity: 1;
      }
    }
  }
`;
