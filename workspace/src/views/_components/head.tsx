import { Global, css } from "@emotion/react";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { mq } from "@/_foundation/mq";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";

export const Head: FC<{
  seo: ReactNode;
}> = ({ seo }) => {
  return (
    <head>
      <link
        as="font"
        crossOrigin=""
        href="/assets/kuboniku.woff"
        rel="preload"
        type="font/woff"
      />
      {!idDev && (
        <link
          as="style"
          crossOrigin=""
          href="/assets/entry.css"
          onLoad={`this.onload=null;this.rel='stylesheet';` as any}
          rel="preload"
        />
      )}
      <link href="https://fonts.googleapis.com" rel="dns-prefetch preconnect" />
      <link href="https://fonts.gstatic.com" rel="dns-prefetch preconnect" />
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@300;400;700&display=swap"
        onLoad={`this.onload=null;this.rel='stylesheet';` as any}
        rel="preload"
      />
      {seo}
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <Global styles={base} />
      {!idDev && (
        <link
          as="style"
          href="/assets/entry.css"
          onLoad={`this.onload = null; this.rel='stylesheet';` as any}
          rel="stylesheet"
        />
      )}
    </head>
  );
};

const base = css`
  :root {
    --font: "Noto Sans JP", sans-serif;
    --font-en: "Montserrat", sans-serif;
    --font-roboto: "Roboto Condensed", sans-serif;

    --grid: calc(1 / 12 * 100vw);
    --gutter: 0;
    --grid-gutter: 1.6rem;

    --vh: 1vh;

    --gap: calc(30 / 750 * 100vw);
    --aspect: 100%;

    --color-text: #e3e3e3;
    --color-text-primary: #858585;
    --color-theme: ${SITE_THEME_COLOR};

    --ease-power3-inOut: cubic-bezier(0.77, 0, 0.175, 1);
    --ease-opacity: cubic-bezier(0.26, 0.06, 0, 1);

    @media ${mq.pc} {
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
    font-size: 10px;

    @media screen and (max-width: 1080px) {
      font-size: 9px;
    }

    @media screen and (max-width: 960px) {
      font-size: 8px;
    }

    @media screen and (max-width: 854px) {
      font-size: 7px;
    }

    @media screen and (max-width: 767px) {
      font-size: 6px;
    }

    @media screen and (max-width: 639px) {
      font-size: 10px;
    }

    @media (min-width: 1680px) {
      font-size: 12px;
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
    font-feature-settings: "palt" 1;

    & ::-moz-selection {
      color: #fff;
      background: var(--color-theme);
    }

    & ::selection {
      color: #fff;
      background: var(--color-theme);
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

  :focus-visible {
    @media not (hover: hover) {
      outline-style: none;
    }
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

  picture {
    display: block;
  }

  summary {
    display: block;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  @font-face {
    font-family: "kuboniku";
    src: url("/assets/kuboniku.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  [class^="icon-"],
  [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: "kuboniku" !important;
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
    content: "\\e900";
  }

  .icon-arrow_right:before {
    content: "\\e901";
  }

  .icon-logo_sp:before {
    content: "\\e902";
  }

  .icon-logo:before {
    content: "\\e903";
  }
`;
