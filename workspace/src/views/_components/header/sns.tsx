import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const Sns = () => {
  return (
    <div css={sns} data-component="Sns">
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

      <button aria-label="sns" css={plus} data-ref="plus">
        <div css={plus__front}>
          <div css={plus__x}>
            <span data-ref="plusX"></span>
          </div>
          <div css={plus__y}>
            <span data-ref="plusY"></span>
          </div>
        </div>
        <div css={plus__back}>
          <div css={plus__x}>
            <span data-ref="backPlusX"></span>
          </div>
          <div css={plus__y}>
            <span data-ref="backPlusY"></span>
          </div>
        </div>
      </button>
    </div>
  );
};

const sns = css`
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
`;

const plus__back = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const plus__x = css`
  position: absolute;
  top: 50%;
  width: 1.6rem;
  height: 1px;
  backface-visibility: hidden;
  transform-origin: right;

  @media ${mq.pc} {
    width: 2.5rem;
    left: 0;
    margin-left: 0;
  }

  > span {
    background-color: var(--color-text-primary);
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const plus__y = css`
  position: absolute;
  top: 50%;
  width: 1.6rem;
  height: 1px;
  content: "";
  backface-visibility: hidden;
  rotate: 90deg;
  transform-origin: center;

  @media ${mq.pc} {
    width: 2.5rem;
    left: 0;
    margin-left: 0;
  }

  > span {
    background-color: var(--color-text-primary);
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const plus = css`
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
