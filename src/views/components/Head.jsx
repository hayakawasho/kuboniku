// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Global, css } from '@emotion/react'

const TITLE = 'KUBONIKU.COM | WEB DESIGNER'
const DESCRIPTION = 'WEB DESIGNER NAGISA KUBO 久保渚 portfolio site'
const SITE_URL = 'https://kuboniku.com'

export const Head = props => {
  const title = props.title + '| ' + TITLE
  const description = DESCRIPTION
  const pagePath = ''

  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="Content-Type" content="text/html" />
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
      <Global
        styles={css`
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

          dialog {
            padding: 0;
            margin: 0;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            padding: 0;
            margin: 0;
            overflow-y: auto;
            background-color: transparent;
            border: none;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
              display: none;
            }

            &::backdrop {
              background-color: transparent;
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
            src: url('/assets/kuboniku.ttf?f4g4p2') format('truetype'),
              url('/assets/kuboniku.woff?f4g4p2') format('woff'),
              url('/assets/kuboniku.svg?f4g4p2#kuboniku') format('svg');
            font-weight: normal;
            font-style: normal;
            font-display: block;
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

          .icon-arrow_down:before {
            content: '\\e900';
          }

          .icon-arrow_right:before {
            content: '\\e901';
          }

          .icon-logo_sp:before {
            content: '\\e902';
          }

          .icon-logo:before {
            content: '\\e903';
          }

          .l-page {
            position: relative;
          }
        `}
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@300;400;700&display=swap"
        media="print"
        onLoad="this.media='all'"
      />
      <script
        src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        defer
      ></script>
      {props.env !== 'production' && (
        <script type="module" src="http://localhost:3000/src/entry.ts" defer></script>
      )}
      {props.env === 'production' && <script type="module" src="./main.js" defer></script>}
      <Global
        styles={css`
          .u-sp {
            @media (min-width: 640px) {
              display: none !important;
            }
          }

          .u-pc {
            @media (max-width: 639px) {
              display: none !important;
            }
          }

          .u-in {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .u-cf {
            &::after {
              display: block;
              clear: both;
              content: '';
            }
          }

          .u-fit {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}
      />
    </head>
  )
}
