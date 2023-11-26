import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const heading = css`
  position: relative;
  font-weight: bold;
  padding: 0 calc(var(--gap) * 2);
  font-family: var(--font-roboto);
  font-size: 5.3rem;
  line-height: 1;

  @media ${mq.pc} {
    margin: 0 auto;
    left: 2rem;
    width: calc(var(--grid) * 10);
    padding: 0 0 0 calc(var(--grid) * 0.5 + var(--gutter));
    font-size: 7.6rem;
  }
`;

export const heading__total = css`
  position: absolute;
  top: 0.75em;
  margin-left: 1em;
  font-family: var(--font-en);
  font-size: calc(26.6 / 106.4 * 100%);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: 0.41em;

  @media ${mq.pc} {
    font-size: 1.5rem;
  }
`;

export const entries = css`
  padding: 0 calc(var(--gap) * 2);
  padding-bottom: 6.5rem;

  @media ${mq.pc} {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 0;
    width: calc(var(--grid) * 10);
    padding-bottom: 17.5rem;
  }
`;

export const entryWrap = css`
  margin-bottom: 4rem;

  @media ${mq.pc} {
    width: calc(var(--grid) * 4);
    margin-bottom: 6.5rem;

    &:nth-of-type(2n - 1) {
      margin-top: 9rem;
      margin-left: 3.4rem;
    }
  }
`;

export const entry = css`
  position: relative;
  display: block;

  @media ${mq.pc} {
    margin-left: 0;
  }
`;

export const entry__heading = css`
  font-family: var(--font-roboto);
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1;
  color: #e3e3e3;

  @media ${mq.pc} {
    font-size: 3rem;
  }
`;

export const entry__g = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const entry__hgroup = css`
  position: absolute;
  bottom: 2rem;
  left: -1rem;
  z-index: 2;
  transform: translateZ(0);
  backface-visibility: hidden;

  @media ${mq.pc} {
    bottom: 4.2rem;
    left: -3.4rem;
    padding-right: 3.6rem;
  }
`;

export const num = css`
  font-family: var(
    --font-en
  ); // デザインデータとフォントが違うため、実際のフォントサイズより小さめに指定する
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  line-height: 1;

  @media ${mq.pc} {
    font-size: 1.5rem;
  }

  > span {
    font-size: calc(20 / 30 * 100%);
    letter-spacing: 0.02em;

    @media ${mq.pc} {
      font-size: calc(26 / 38 * 100%);
    }
  }
`;

export const eyecatch = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  backface-visibility: hidden;

  @media (hover: hover) {
    &:hover {
      & > ._img {
        // filter: grayscale(0);
      }
    }
  }

  & > ._img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    // filter: grayscale(1);
    backface-visibility: hidden;
    // transition: 1s filter var(--ease-opacity);
    opacity: 0.8;
  }
`;

export const aspect = css`
  aspect-ratio: 1536 / 960;
`;
