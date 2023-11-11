import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const brandLogo = css`
  font-size: 2.6rem;
  line-height: 1;
  color: var(--color-text-primary);
  position: fixed;
  top: 1.5rem;
  left: 2rem;
  display: block;
  pointer-events: auto;
  z-index: 99;

  @media ${mq.pc} {
    font-size: 3.7rem;
    top: 2.5rem;
    left: 2.5rem;
  }
`;

export const copyright = css`
  font-family: var(--font-en);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.2em;
  position: fixed;
  right: 3rem;
  bottom: 2.5rem;
  display: inline-block;
  z-index: 99;

  @media ${mq.pc} {
    font-size: 1rem;
    bottom: 4rem;
    right: 4rem;
  }
`;

/*
export const link = css`
  display: inline-block;
  vertical-align: top;
  font-family: var(--font-en);
  font-weight: 500;
  font-size: 1.4rem;
  line-height: calc(86 / 28);
  letter-spacing: 0.41em;
  color: #fff;
  overflow: hidden;

  @media ${mq.pc} {
    font-size: 1.3rem;
    line-height: calc(52 / 26);
    opacity: 1;
    pointer-events: auto;
  }

  &[aria-current='page'] {
    color: #858585;
    pointer-events: none !important;
  }

  > span {
    line-height: 1;
    display: inline-block;
  }

  .isMenuOpen & {
    pointer-events: auto;
  }
`

export const linkLabel = css`
  display: inline-block;
  transform: translateY(100%);
  transform-origin: left;

  @media ${mq.pc} {
    transform: none;
  }

  .isMenuAnimating & {
    will-change: transform, opacity;
  }
`
*/

export const burger = css`
  position: fixed;
  top: 0.8rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  z-index: 101;
  pointer-events: auto;

  .isMenuAnimating & {
    will-change: transform;
  }
`;

export const burger__line = css`
  width: 2rem;
  height: 1px;
  background-color: #fff;
  transform-origin: left;

  &:nth-of-type(2) {
    margin: 5px 0 0;
    transform: scaleX(calc(32 / 40));
  }

  .isMenuAnimating & {
    will-change: transform;
  }
`;
