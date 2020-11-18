import 'ress'
import '../assets/css/index.scss'

import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'

import { Provider } from 'react-redux'
import store from '../state/store'

const App = ({ Component, pageProps }: AppProps) => {
  const title = 'KuboNiku.com'

  console.log(pageProps)

  return (
    <>
        <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <title>{title}</title>
        <meta name="description" content="" />
        <meta httpEquiv="Content-Type" content="text/html" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />

        <style>{`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          html,
          body {
            width: 100%;
            padding: 0;
            margin: 0;
          }

          html {
            font-size: calc(10 / 1280 * 100vw);
          }

          @media (max-width: 1280px) {
            html {
              font-size: calc(10px + (12 - 10) * ((100vw - 1280px) / (1680 - 1280)));
            }
          }

          @media (min-width: 1680px) {
            html {
              font-size: 12px;
            }
          }

          @media (max-width: 767px) {
            html {
              font-size: calc(10px + (18 - 10) * ((100vw - 375px) / (1024 - 375)));
            }
          }

          @media (max-width: 767px) and (orientation: landscape) {
            html {
              font-size: 10px;
            }
          }

          @media (max-width: 374px) {
            html {
              font-size: calc(10 / 375 * 100vw);
            }
          }

          a {
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

          button:focus {
            outline: 0;
          }

          .mask {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 2147483647;
            pointer-events: none;
            transform: translate3d(0, 0, 0);
          }
      `}</style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap" />
      </Head>

      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default App;
