import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

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
