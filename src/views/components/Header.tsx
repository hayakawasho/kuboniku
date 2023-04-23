import { css, keyframes } from '@emotion/react'

type Props = {
  current: 'WORKS' | 'WORKS_DETAIL' | 'PROFILE'
}

export const Header = ({ current }: Props) => {
  return (
    <>
      <header className="">
        <a href="/" css={brandLogo}>
          <i className="icon-logo"></i>
          <span className="sr-only">KuboNiku.com</span>
        </a>

        <button
          id="js-menu__onOff"
          className="u-sp"
          css={burger}
          aria-label="menu"
          data-ref="menuTrigger"
        >
          <div className="u-in my-0 mx-auto transform-gpu flex items-center justify-center flex-col z-10">
            <div css={burger__line} data-ref="burgerTL"></div>
            <div css={burger__line} data-ref="burgerBL"></div>
          </div>
        </button>

        <div css={sns} data-component="Sns">
          <ul className="mb-[2rem] sm:mb-[3rem] text-center">
            <li className="overflow-hidden mb-[2rem]">
              <a
                href="https://www.facebook.com/k.b.nagisa"
                target="_blank"
                rel="noopener"
                css={snsLabel}
                data-ref="icon"
              >
                Fb
              </a>
            </li>
            <li className="overflow-hidden">
              <a
                href="https://twitter.com/p3b9lwry"
                target="_blank"
                rel="noopener"
                css={snsLabel}
                data-ref="icon"
              >
                Tw
              </a>
            </li>
          </ul>

          <button css={plus} aria-label="sns" data-ref="toggleTrigger">
            <div className="u-in">
              <div css={plus__x}></div>
              <div css={plus__y}></div>
            </div>
          </button>
        </div>

        <small css={copyright}>@KuboNiku.com</small>
      </header>

      <nav css={menu} data-ref="menuBody" role="navigation">
        <div className="u-in">
          <div css={menu__mask} className="u-sp" data-ref="menuMask" />
          <div css={menu__bg} className="u-sp" data-ref="menuBg" />
          <ul css={menu__links}>
            <li>
              <a
                href="/profile/"
                css={link}
                data-ref="menuLink"
                data-disabled={current === 'PROFILE'}
              >
                <span className="inline-block overflow-hidden leading-[1]">
                  <span css={linkLabel} data-ref="menuLabel">
                    Profile
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href="/" css={link} data-ref="menuLink" data-disabled={current === 'WORKS'}>
                <span className="inline-block overflow-hidden leading-[1]">
                  <span css={linkLabel} data-ref="menuLabel">
                    Works
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:k.bo.n10.05@gmail.com" css={link}>
                <span className="inline-block overflow-hidden leading-[1]">
                  <span css={linkLabel} data-ref="menuLabel">
                    Contact
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

const brandLogo = css`
  font-size: 2.6rem;
  line-height: 1;
  color: var(--color-text-primary);
  position: fixed;
  top: 1.5rem;
  left: 2rem;
  display: block;
  pointer-events: auto;
  z-index: 99;

  @media (min-width: 640px) {
    font-size: 3.7rem;
    top: 2.5rem;
    left: 2.5rem;
  }
`

const copyright = css`
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

  @media (min-width: 640px) {
    font-size: 1rem;
    bottom: 4rem;
    right: 4rem;
  }
`

const menu = css`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  top: 0;
  left: 0;
  z-index: 100;
  overscroll-behavior: contain;

  .is-menuOpen & {
    pointer-events: all;
  }

  .is-menuAnimating & {
    pointer-events: none;
  }
`

const menu__mask = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: #000000;

  .is-menuAnimating & {
    will-change: opacity;
  }
`

const menu__bg = css`
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

  .is-menuAnimating & {
    will-change: clip-path;
  }
`

const menu__links = css`
  position: absolute;
  height: 100vh;
  height: 100dvh;
  top: 0;
  right: 0;
  text-align: right;
  width: calc(46rem * 0.5);
  padding-top: 7rem;
  padding-right: 3rem;

  @media (min-width: 640px) {
    padding-top: 3.2rem;
    padding-right: 4rem;
  }
`

const link = css`
  display: inline-block;
  vertical-align: top;
  font-family: var(--font-en);
  font-weight: 500;
  font-size: 1.4rem;
  line-height: calc(86 / 28);
  letter-spacing: 0.41em;
  color: #fff;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 1.3rem;
    line-height: calc(52 / 26);
    opacity: 1;
    pointer-events: auto;
  }

  &[data-disabled='true'] {
    color: #858585;
    pointer-events: none !important;
  }

  > span {
    line-height: 1;
    display: inline-block;
  }

  .is-menuOpen & {
    pointer-events: auto;
  }
`

const linkLabel = css`
  display: inline-block;
  transform: translateY(100%);
  transform-origin: left;

  @media (min-width: 640px) {
    transform: none;
  }

  .is-menuAnimating & {
    will-change: transform, opacity;
  }
`

const burger = css`
  position: fixed;
  top: 0.8rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  z-index: 101;
  pointer-events: auto;

  .is-menuAnimating & {
    will-change: transform;
  }
`

const burger__line = css`
  width: 2rem;
  height: 1px;
  background-color: #fff;
  transform-origin: left;

  &:nth-of-type(2) {
    margin: 5px 0 0;
    transform: scaleX(calc(32 / 40));
  }

  .is-menuAnimating & {
    will-change: transform;
  }
`

const drawPlus = keyframes`
  0% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`

const sns = css`
  position: fixed;
  text-align: center;
  bottom: 1rem;
  left: 2rem;
  z-index: 99;

  @media (min-width: 640px) {
    bottom: 2.5rem;
    left: 4rem;
  }
`

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

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }

  .is-animating & {
    will-change: transform, opacity;
  }
`

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

  @media (min-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    box-sizing: border-box;
  }
`

const plus__x = css`
  position: absolute;
  top: 50%;
  width: 1.6rem;
  height: 1px;
  background-color: var(--color-text-primary);
  backface-visibility: hidden;
  transform-origin: left;

  @media (min-width: 640px) {
    width: 2.5rem;
    left: 0;
    margin-left: 0;
  }

  .is-hover & {
    animation: ${drawPlus} 0.6s;
  }
`

const plus__y = css`
  position: absolute;
  top: 50%;
  width: 1.6rem;
  height: 1px;
  content: '';
  background-color: var(--color-text-primary);
  backface-visibility: hidden;
  transform: rotate(90deg);
  transform-origin: center;

  @media (min-width: 640px) {
    width: 2.5rem;
    left: 0;
    margin-left: 0;
  }

  .is-hover & {
    animation: ${drawPlus} 0.6s 0.3s;
  }
`
