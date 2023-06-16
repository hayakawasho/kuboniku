import { Global, css } from '@emotion/react'

const SITE_TITLE = 'KUBONIKU.COM | WEB DESIGNER'
const DESCRIPTION = 'WEB DESIGNER NAGISA KUBO 久保渚 portfolio site'
const SITE_URL = 'https://kuboniku.com'

const idDev = process.env.NODE_ENV !== 'production'

export const Seo = (props: any) => {
  const title = props.title + ' | ' + SITE_TITLE
  const description = props.description || DESCRIPTION
  const pagePath = props.pagePath
  const isHome = pagePath === ''

  return (
    <head>
      <meta charSet="UTF-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="telephone=no" name="format-detection" />
      <meta content="text/html" httpEquiv="Content-Type" />
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={isHome ? 'website' : 'article'} property="og:type" />
      <meta content={description} property="og:description" />
      <meta content={SITE_URL + pagePath} property="og:url" />
      <meta content={SITE_TITLE} property="og:site_name" />
      <meta content={SITE_URL + '/ogp.jpg'} property="og:image" />
      <link href="/favicon.ico" rel="icon" />
      {!idDev && <link as="style" href="/assets/entry.css" rel="preload" />}
      <link href="https://code.createjs.com" rel="preconnect" />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
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

            --ease-power3-inOut: cubic-bezier(0.77, 0, 0.175, 1);

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
            min-height: calc(var(--vh) * 100);
            min-height: 100svh;
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

            &.isMenuOpen {
              overflow: hidden;
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
            display: block;
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
        `}
      />
      {!idDev && <link href="/assets/entry.css" rel="stylesheet" />}
      <script
        defer
        src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
      />
      {idDev && <script defer src="http://localhost:3000/src/entry.ts" type="module" />}
      {!idDev && <script defer src="/assets/entry.js" type="module" />}
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
        `}
      />
    </head>
  )
}
