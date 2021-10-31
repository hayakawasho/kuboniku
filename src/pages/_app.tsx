import "ress"
import "~css/global.css"

import { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import Script from "next/script"
import * as React from "react"
import { Navigation, Header } from "@/common/components"
import { UiColorProvider, MenuProvider, ScrollProvider } from "@/common/context"

// const World3d = dynamic(
//   () => import('../features/world-3d').then(modules => modules.Webgl),
//   { ssr: false }
// );

const AppComponent = ({
  Component,
  pageProps,
  router,
}: AppProps): React.ReactElement => {
  const containerRef = React.useRef(null)

  return (
    <>
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        strategy="beforeInteractive"
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <UiColorProvider>
        <MenuProvider>
          <ScrollProvider containerRef={containerRef}>
            <div id="app">
              <Header />
              <Navigation />
              <div data-scroll ref={containerRef}>
                <Component {...pageProps} key={router.asPath} />
              </div>
              {
                //<World3d />
              }
            </div>
          </ScrollProvider>
        </MenuProvider>
      </UiColorProvider>
    </>
  )
}

export default AppComponent
