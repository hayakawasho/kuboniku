import React from 'react';
import { motion } from 'framer-motion';
import { transition } from '~/foundation/animations';
import tw, { css } from 'twin.macro';
import { keyframes } from '@emotion/react';
import Utils from '~/foundation/utils/Utils';
import { Entry } from './presenter/Entry';

type TEntryData = React.ComponentProps<typeof Entry>['data'];

const PER_PAGE = 10;

const PageContainer = ({
  totalPost,
  chunkedPostData,
  entryLoaderRef,
  isValidating,
  error,
}) => {
  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={transition}
      css={container}
    >
      <h1 css={heading}>
        <div data-smooth-item>
          Works<sup css={heading__total}>{totalPost}</sup>
        </div>
      </h1>
      {chunkedPostData.map((postData, i) => (
        <div className="o-grid" css={entryList} key={i}>
          {postData.posts.nodes.map((item, j) => {
            const projectIndex = Utils.zeroPadding(
              totalPost - (j + (i + i * (PER_PAGE - 1))),
              2
            );
            return (
              <article className="o-grid__item" data-smooth-item key={j}>
                <Entry data={item} index={projectIndex} />
              </article>
            );
          })}
        </div>
      ))}
      <div ref={entryLoaderRef} css={entryLoader}>
        {isValidating && (
          <div css={entryLoader__bounce}>
            <div />
            <div />
            <div />
          </div>
        )}
        {error && <div css={entryLoader__error}>Try to reload.</div>}
      </div>
    </motion.div>
  );
};

export default PageContainer;

const container = css`
  padding-top: 10rem;

    @media (min-width: 640px) {
      padding-top: 15rem;
    }
  }
`;

const heading = css`
  ${tw`relative font-bold`}
  padding: 0 calc(var(--gap) * 2);
  margin: 0 0 6rem;
  font-family: var(--font-roboto);
  font-size: 5.3rem;
  line-height: 1;

  @media (min-width: 640px) {
    ${tw`mt-0 mx-auto`}
    left: 2rem;
    width: calc(var(--grid) * 10);
    padding: 0 0 0 calc(var(--grid) * 0.5 + var(--gutter));
    margin-bottom: 3.6rem;
    font-size: 7.6rem;
  }
`;

const heading__total = css`
  ${tw`absolute`}
  top: 0.5em;
  margin-left: 0.5em;
  font-family: var(--font-en);
  font-size: calc(26.6 / 106.4 * 100%);
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: 0.41em;
`;

const entryList = css`
  padding: 0 calc(var(--gap) * 2);

  @media (min-width: 640px) {
    ${tw`flex flex-wrap justify-between my-0 mx-auto p-0`}
    width: calc(var(--grid) * 10);
  }

  .o-grid__item {
    margin-bottom: 4rem;

    @media (min-width: 640px) {
      width: calc(var(--grid) * 4);
      margin-bottom: 6.4rem;

      &:nth-of-type(2n - 1) {
        margin-top: 9.6rem;
        margin-left: 3.4rem;
      }
    }
  }
`;

const entryLoader = css`
  ${tw`flex justify-center`}
  padding-bottom: 6.4rem;
`;

const bounce = keyframes`
  from {
    transform: translateY(75%);
  }
  to {
    transform: translateY(-75%);
  }
`;

const entryLoader__bounce = css`
  display: flex;

  > div {
    width: 6px;
    height: 6px;
    background-color: var(--color-theme);
    border-radius: 50%;
    animation: ${bounce} 0.4s cubic-bezier(0.19, 0.57, 0.3, 0.98) infinite
      alternate;

    &:nth-of-type(2) {
      animation-delay: 0.1s;
      opacity: 0.8;
      margin: 0 3px;
    }

    &:nth-of-type(3) {
      animation-delay: 0.2s;
      opacity: 0.6;
    }
  }
`;

const entryLoader__error = css`
  ${tw`text-center font-bold`}
  font-family: var(--font-en);
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);
`;
