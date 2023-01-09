import { Global, css } from '@emotion/react'

const TITLE = 'KUBONIKU.COM | WEB DESIGNER'
const DESCRIPTION = 'WEB DESIGNER NAGISA KUBO 久保渚 portfolio site'
const SITE_URL = 'https://kuboniku.com'

export const Page = props => {
  const title = props.title || TITLE
  const description = DESCRIPTION
  const pagePath = ''

  return (
    <html lang={'ja'}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="Content-Type" content="text/html" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL + pagePath} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={SITE_URL + '/ogp.jpg'} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@300;400;700&display=swap"
          // media="print"
          // onLoad="this.media='all'"
        />
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
          defer
        ></script>
        {props.env === 'production' && <script type="module" src="./main.js" defer></script>}
        {props.env === 'development' && (
          <script type="module" src="http://localhost:3000/src/entry.ts" defer></script>
        )}
        <Global styles={styles} />
      </head>
      <body>
        <div className="l-window">
          <div className="l-content">
            <main className="l-page">{props.children}</main>
          </div>
        </div>
        <div className="gl" data-component="Gl"></div>
      </body>
    </html>
  )
}

const styles = css`
  @custom-media --sp (max-width: 639px);
  @custom-media --pc (min-width: 640px);
  @custom-media --hover (hover: hover) and (pointer: fine);

  :root {
    --font: 'Noto Sans JP', sans-serif;
    --font-en: 'Montserrat', sans-serif;
    --font-roboto: 'Roboto Condensed', sans-serif;

    --grid: calc(1 / 12 * 100vw);
    --gutter: 0;
    --grid-gutter: 1.6rem;

    --vh: 1vh;

    --gap: calc(30 / 750 * 100vw);
    --aspect: 100%;

    --color-text: #e3e3e3;
    --color-text-primary: #858585;
    --color-theme: #1793a9;

    @media (min-width: 640px) {
      --gap: calc(40 / 1280 * 100vw);
      --gutter: calc(16 / 1280 * 100vw);
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    min-height: 100vh;
    font-size: calc(10 / 1280 * 100vw);

    @media (min-width: 1280px) {
      font-size: calc(10px + (12 - 10) * ((100vw - 1280px) / (1680 - 1280)));
    }

    @media (min-width: 1680px) {
      font-size: 12px;
    }

    @media (max-width: 639px) {
      font-size: calc(10 / 375 * 100vw);
    }
  }

  body {
    color: var(--color-text);
    background: #191918;
    overflow-x: hidden;
    font-family: var(--font);
    overflow-wrap: break-word;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: subpixel-antialiased;
    -moz-osx-font-smoothing: unset;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    font-feature-settings: 'palt' 1;

    & ::-moz-selection {
      color: #fff;
      background: #101010;
    }

    & ::selection {
      color: #fff;
      background: #101010;
    }

    @media (min-resolution: 1.5dppx) {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  }

  :any-link {
    color: inherit;
    text-decoration: none;
  }

  ol,
  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  @font-face {
    font-family: 'kuboniku';
    src: url('/fonts/kuboniku.ttf?mk7nz0') format('truetype'),
      url('/fonts/kuboniku.woff?mk7nz0') format('woff'),
      url('/fonts/kuboniku.svg?mk7nz0#kuboniku') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  [class^='icon-'],
  [class*=' icon-'] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'kuboniku' !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-arrow_right:before {
    content: '\e903';
  }

  .icon-arrow_down:before {
    content: '\e902';
  }

  .icon-logo_sp:before {
    content: '\e900';
  }

  .icon-logo:before {
    content: '\e901';
  }

  @keyframes drawPlus {
    0% {
      transform: scaleX(1);
    }

    50% {
      transform: scaleX(0);
    }

    100% {
      transform: scaleX(1);
    }
  }

  @keyframes gradAnim {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes front {
    0%,
    70% {
      transform: translateZ(0);
    }

    100% {
      transform: translate3d(0, 20px, 0);
    }
  }

  @keyframes back {
    0%,
    70% {
      transform: translateZ(0) rotate(30deg) skewX(30deg);
    }

    100% {
      transform: translate3d(0, -50px, 0) rotate(0) skewX(0);
    }
  }

  .l-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    pointer-events: none;
    z-index: 99;
  }

  .l-mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: -1;
  }

  .l-brandLogo {
    font-size: 2.6rem;
    line-height: 1;
    color: var(--color-text-primary);
    position: absolute;
    top: 1.5rem;
    left: 2rem;
    display: block;
    pointer-events: auto;
    z-index: 99;

    @media (--pc) {
      font-size: 3.6rem;
      top: 2.4rem;
      left: 2.4rem;
    }
  }

  .l-copyright {
    font-family: var(--font-en);
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1;
    color: var(--color-text-primary);
    letter-spacing: 0.2em;
    position: absolute;
    right: 3rem;
    bottom: 2.5rem;
    display: inline-block;
    z-index: 99;

    @media (--pc) {
      font-size: 1rem;
      bottom: 4rem;
      right: 4rem;
    }
  }

  .l-sns {
    position: absolute;
    text-align: center;
    bottom: 1rem;
    left: 2rem;
    z-index: 99;

    @media (--pc) {
      bottom: 4rem;
      left: 4rem;
    }
  }

  .l-window {
    position: relative;
    z-index: 1;
  }

  .l-content {
    position: relative;
    min-height: 100vh;
  }

  .l-content__h {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    visibility: hidden;
    z-index: -1;
  }

  .l-page {
    position: relative;
  }
`
