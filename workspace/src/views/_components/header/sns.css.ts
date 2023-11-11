import { css, keyframes } from "@emotion/react";
import { mq } from "@/_foundation/mq";

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
