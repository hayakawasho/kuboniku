import React from 'react';
// import { useSelector } from 'react-redux';
// import { appSelector } from '@/state/app';
import tw, { css } from 'twin.macro';

const Component = React.memo(() => {
  // const { scrolling } = useSelector(appSelector);

  return (
    <>
      <div
        id="js-loader"
        css={mask}
        // style={scrolling ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
      />
    </>
  );
});

export default Component;

const mask = css`
  ${tw`fixed inset-0 pointer-events-none transform-gpu`}
  z-index: 2147483647;
`;
