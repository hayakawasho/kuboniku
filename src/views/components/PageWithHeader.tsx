import { css } from '@emotion/react'
import type React from 'react'
import { Head } from './Head'

const idDev = process.env.NODE_ENV !== 'production'

export const PageWithHeader: React.FC<any> = props => {
  return (
    <html lang="ja">
      <Head title={props.title} description={props.description} pagePath={props.pagePath} />
      <body data-component="Menu">
        <div
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={svh}
          aria-hidden="true"
          data-ref="observer"
        ></div>
        <div
          data-ref="glWorld"
          className="fixed inset-0 w-screen h-screen pointer-events-none"
          aria-hidden="true"
        >
          <canvas className="w-screen h-screen" data-ref="canvas"></canvas>
        </div>
        {props.header}
        {props.children}
        <div data-component="Cursor" className="u-pc"></div>
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
          defer
        />
        <script src="https://code.createjs.com/1.0.0/preloadjs.min.js" defer></script>
        {idDev && <script type="module" src="http://localhost:3000/src/entry.ts" />}
        {!idDev && <script type="module" src="/assets/entry.js" />}
      </body>
    </html>
  )
}

const svh = css`
  height: var(--vh * 100);
  height: 100svh;
`
