import { css, keyframes } from "@emotion/react";
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

export const menu = css`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 100;
  overscroll-behavior: contain;

  .isMenuOpen & {
    pointer-events: all;
  }

  .isMenuAnimating & {
    pointer-events: none;
  }
`;

export const menu__mask = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: #000000;

  .isMenuAnimating & {
    will-change: opacity;
  }
`;

export const menu__bg = css`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  width: calc(46rem * 0.5);
  background-color: #000;
  clip-path: polygon(100% 0px, 100% 0px, 100% 100vh, 100% 100vh);
  clip-path: polygon(100% 0px, 100% 0px, 100% 100svh, 100% 100svh);
  backface-visibility: hidden;

  .isMenuAnimating & {
    will-change: clip-path;
  }
`;

export const menu__links = css`
  position: absolute;
  height: 100vh;
  height: 100dvh;
  top: 0;
  right: 0;
  text-align: right;
  width: calc(46rem * 0.5);
  padding-top: 7rem;
  padding-right: 3rem;

  @media ${mq.pc} {
    padding-top: 3.2rem;
    padding-right: 4rem;
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

export const drawPlus = keyframes`
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

export const sns = css`
  position: fixed;
  text-align: center;
  bottom: 1.5rem;
  left: 2rem;
  z-index: 99;

  @media ${mq.pc} {
    // bottom: 2.5rem;　// コピーライトと天地中央に揃える数値
    bottom: 4rem;
    left: 4rem;
  }
`;

export const snsLabel = css`
  display: inline-block;
  pointer-events: auto;
  visibility: hidden;
  opacity: 0;
  font-family: var(--font-en);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  backface-visibility: hidden;

  @media ${mq.pc} {
    font-size: 1.3rem;
  }

  .is-animating & {
    will-change: transform, opacity;
  }
`;

export const plus = css`
  position: relative;
  z-index: 2;
  display: inline-block;
  width: 1.6rem;
  height: 1.6rem;
  pointer-events: auto;
  cursor: pointer;
  padding: 1rem;
  box-sizing: content-box;
  backface-visibility: hidden;

  @media ${mq.pc} {
    width: 2.3rem;
    height: 2.3rem;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const plus__x = css`
  position: absolute;
  top: 50%;
  width: 1.6rem;
  height: 1px;
  background-color: var(--color-text-primary);
  backface-visibility: hidden;
  transform-origin: left;

  @media ${mq.pc} {
    width: 2.5rem;
    left: 0;
    margin-left: 0;
  }

  .is-hover & {
    animation: ${drawPlus} 0.6s;
  }
`;

export const plus__y = css`
  position: absolute;
  top: 50%;
  width: 1.6rem;
  height: 1px;
  content: "";
  background-color: var(--color-text-primary);
  backface-visibility: hidden;
  transform: rotate(90deg);
  transform-origin: center;

  @media ${mq.pc} {
    width: 2.5rem;
    left: 0;
    margin-left: 0;
  }

  .is-hover & {
    animation: ${drawPlus} 0.6s 0.3s;
  }
`;
