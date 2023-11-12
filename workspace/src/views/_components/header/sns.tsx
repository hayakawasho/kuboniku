import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const Sns = () => {
  return (
    <details css={sns} data-component="Sns">
      <ul className="mb-[2rem] pc:mb-[3rem] text-center">
        <li className="overflow-hidden mb-[2rem]">
          <a
            css={snsLabel}
            data-ref="snsLabel"
            href="https://www.facebook.com/k.b.nagisa"
            rel="noopener"
            target="_blank"
          >
            Fb
          </a>
        </li>
        <li className="overflow-hidden">
          <a
            css={snsLabel}
            data-ref="snsLabel"
            href="https://twitter.com/p3b9lwry"
            rel="noopener"
            target="_blank"
          >
            X
          </a>
        </li>
      </ul>

      <summary css={plus} data-ref="plus">
        <div className="relative w-full h-full">
          <div css={plus__front}>
            <div css={plus__x}>
              <span className="origin-right" data-ref="frontPlusX"></span>
            </div>
            <div css={plus__y}>
              <span className="origin-left" data-ref="frontPlusY"></span>
            </div>
          </div>
          <div css={plus__back}>
            <div css={plus__x}>
              <span className="origin-left" data-ref="backPlusX"></span>
            </div>
            <div css={plus__y}>
              <span className="origin-right" data-ref="backPlusY"></span>
            </div>
          </div>
        </div>
      </summary>
    </details>
  );
};

const sns = css`
  --size: 1.6rem;

  position: fixed;
  text-align: center;
  bottom: 1.5rem;
  left: 2rem;
  z-index: 99;
  padding-bottom: calc(var(--size) + 2rem);
  width: calc(var(--size) + 2rem);

  @media ${mq.pc} {
    --size: 2.3rem;

    bottom: 3rem;
    left: 3rem;
  }
`;

const snsLabel = css`
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

const plus__front = css`
  position: relative;
  width: 100%;
  height: 100%;
  transform: translateZ(0px);
`;

const plus__back = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transform: translateZ(0px);
`;

const plus__x = css`
  position: absolute;
  top: 50%;
  left: 0;
  width: var(--size);
  height: 1px;
  transform: translateZ(0px);

  > span {
    background-color: var(--color-text-primary);
    width: 100%;
    height: 100%;
    display: block;
    backface-visibility: hidden;
  }
`;

const plus__y = css`
  position: absolute;
  top: 50%;
  left: 0;
  width: var(--size);
  height: 1px;
  content: "";
  backface-visibility: hidden;
  rotate: 90deg;
  transform-origin: center;
  transform: translateZ(0px);

  > span {
    background-color: var(--color-text-primary);
    width: 100%;
    height: 100%;
    display: block;
    backface-visibility: hidden;
  }
`;

const plus = css`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: inline-block;
  width: var(--size);
  height: var(--size);
  pointer-events: auto;
  cursor: pointer;
  padding: 1rem;
  backface-visibility: hidden;
`;
