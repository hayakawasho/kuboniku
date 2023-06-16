import { css } from '@emotion/react'
import type React from 'react'

const idDev = process.env.NODE_ENV !== 'production'

type Props = {
  header: React.ReactNode
  children: React.ReactNode
  seo: React.ReactNode
}

export const PageWithHeader: React.FC<Props> = props => {
  const LOCAL_DOMAIN = 'http://localhost:3000'

  return (
    <html lang="ja">
      {props.seo}
      <body data-component="Menu">
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={svh}
          data-ref="observer"
        ></div>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen h-screen pointer-events-none"
          data-ref="glWorld"
        >
          <canvas className="w-screen h-screen" data-ref="canvas"></canvas>
        </div>
        {props.header}
        {props.children}
        <div className="u-pc" data-component="Cursor"></div>
        <script
          defer
          src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        />
        <script defer src="https://code.createjs.com/1.0.0/preloadjs.min.js"></script>
        {idDev && <script src={`${LOCAL_DOMAIN}/src/entry.ts`} type="module" />}
        {!idDev && <script src="/assets/entry.js" type="module" />}
      </body>
    </html>
  )
}

const svh = css`
  height: var(--vh * 100);
  height: 100svh;
`
