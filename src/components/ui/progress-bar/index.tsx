import React from 'react';
import tw, { css } from 'twin.macro';

const Component: React.FC = ({ children }) => {
  return (
    <div className="l-progress">
      <div tw="relative w-full h-full">
        <div tw="text-center" css={progressCtrl}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Component;

const progressCtrl = css`
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
