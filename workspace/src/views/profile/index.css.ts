import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const logo = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 2rem), calc(-100% - 7.5rem));
  font-size: 17rem;
  background: url("/assets/grad.jpg");
  background-size: 100% 160%;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  @media ${mq.pc} {
    font-size: 31rem;
    transform: translate(calc(-50% + 7rem), calc(-100% + 0.1em));
  }
`;

export const container = css`
  position: relative;
  margin: 0 3rem;
  height: calc(var(--vh) * 100);
  height: 100dvh;

  @media ${mq.pc} {
    text-align: left;
    margin: 0;
  }
`;

export const container__in = css`
  position: absolute;
  right: 0;
  text-align: right;
  bottom: calc(100 / 800 * 100%);
  z-index: 2;

  @media ${mq.pc} {
    left: 50%;
    text-align: left;
    width: calc(var(--grid) * 5);
  }
`;

export const heading = css`
  font-family: var(--font-roboto);
  font-weight: bold;
  font-size: 2.4rem;
  line-height: calc(60 / 48);

  @media ${mq.pc} {
    font-size: 3rem;
  }
`;

export const sub = css`
  font-family: var(--font-roboto);
  font-size: 1.2rem;
  color: #858585;

  @media ${mq.pc} {
    font-size: 1.4rem;
  }
`;

export const about = css`
  font-size: 1.1rem;
  line-height: calc(40 / 22);

  @media ${mq.pc} {
    font-size: 1.3rem;
    text-align: justify;
  }
`;
