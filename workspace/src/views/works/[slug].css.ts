import { css, keyframes } from '@emotion/react'
import { mq } from '@/_foundation/mq'

export const kv = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100vh;
  height: 100svh;
  background: #191918;

  @media ${mq.pc} {
    height: 100vh;
  }
`

export const kvNext = css`
  height: 100vh;
`

export const kv__cont = css`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  z-index: 2;
  padding-left: var(--grid);
  color: #fff;
`

export const heading = css`
  font-weight: 600;
  font-family: var(--font-roboto);
  font-size: 3.9rem;
  line-height: 1;
  color: #fff;

  @media ${mq.pc} {
    font-size: 7rem;
  }
`

export const project = css`
  position: absolute;
  top: calc(-1em - 2rem);
  font-weight: bold;
  font-family: var(--font-en);
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);

  > span {
    font-size: 70%;
    letter-spacing: 0.02em;
  }
`

export const sub = css`
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;

  .icon-arrow_right {
    font-size: 1rem;
    transform: scale(0.7);
    transform-origin: left;
    display: inline-block;
  }
`

export const kv__scrollDown = css`
  position: absolute;
  left: 50%;
  bottom: 5rem;
  overflow: hidden;
  transform: translateX(-50%);
  font-weight: bold;
  font-family: var(--font-en);
  font-size: 1rem;
  line-height: 1;
  color: #e3e3e3;
  letter-spacing: 0.02em;
  z-index: 2;

  @media ${mq.pc} {
    font-size: 1.3rem;
  }
`

export const front = keyframes`
  0%,
  50% {
    transform: translateZ(0);
  }

  100% {
    transform: translate3d(0, 2rem, 0);
  }
`

export const back = keyframes`
  0%,
  50% {
    transform: translateZ(0) rotate(30deg) skewX(30deg);
  }

  100% {
    transform: translate3d(0, -5.2rem, 0) rotate(0) skewX(0);
  }
`

export const kv__scrollLabel = css`
  display: inline-block;
  animation: ${front} 2.5s var(--ease-power3-inOut) infinite;

  &::before {
    content: attr(data-text);
    position: absolute;
    bottom: -3.2rem;
    display: block;
    transform-origin: right;
    animation: ${back} 2.5s var(--ease-power3-inOut) infinite;
    animation-delay: 0.05s;
    transform-origin: bottom;
  }
`

export const body = css`
  backface-visibility: hidden;
`

export const introLayout = css`
  position: relative;
  width: 100%;
  padding: 0 calc(var(--gap) * 2);

  @media ${mq.pc} {
    margin-left: auto;
    margin-right: auto;
    width: calc(var(--grid) * 10);
    padding: 0 var(--grid);
  }
`

export const intro = css`
  position: relative;

  @media ${mq.pc} {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

export const intro__info = css`
  @media ${mq.pc} {
    margin-bottom: 0;
  }
`

export const dl = css`
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-family: var(--font-roboto);
`

export const dt = css`
  color: var(--color-text-primary);
  line-height: calc(52 / 24);
  white-space: nowrap;

  @media ${mq.pc} {
    font-size: 1.1rem;
  }
`

export const dd = css`
  font-weight: 300;
  line-height: calc(52 / 24);
  letter-spacing: 0.08em;
  color: #cbcbcb;

  @media ${mq.pc} {
    font-size: 1.3rem;
  }
`

export const intro__viewLink = css`
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding-left: 2.6em;
  font-family: var(--font-en);
  font-size: 1.2rem;
  line-height: 1.5;
  letter-spacing: 0.02em;

  @media ${mq.pc} {
    font-size: 1.4rem;
    position: absolute;
    bottom: 0.5rem;
    right: 0;
  }
`

export const intro__viewLinkLine = css`
  position: absolute;
  left: 0;
  display: block;
  height: 0;
  top: 0.7em;
  width: 1.75em;
  content: '';
  border: solid;
  border-width: 1px 0 0;

  @media ${mq.pc} {
    border-top-width: 2px;
  }
`

export const captchaItems = css`
  padding: 0 var(--gap);

  @media ${mq.pc} {
    width: calc(var(--grid) * 10);
    padding: 0;
  }
`
