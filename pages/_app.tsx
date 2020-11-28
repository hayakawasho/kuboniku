import 'ress'
import '~/assets/css/index.scss'

import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '~/components/Layout'

import { Provider } from 'react-redux'
import store from '~/state/store'

import { ApolloProvider } from '@apollo/client'
import client from '~/apollo/client'

const App = ({ Component, pageProps }: AppProps) => {
  const siteName = 'KuboNiku.com'
  const title = 'KuboNiku.com'
  const description = 'なぁちゃんのsiteだよ'

  return (
    <>
        <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta httpEquiv="Content-Type" content="text/html" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />

        <style>{`*,:after,:before{box-sizing:border-box}body,html{width:100%;padding:0;margin:0}html{font-size:0.78125vw}@media(max-width:1280px){html{font-size:calc(10px+2 *((100vw - 1280px)/400))}}@media(min-width:1680px){html{font-size:12px}}@media(max-width:767px){html{font-size:calc(10px+8 *((100vw - 375px)/649))}}@media(max-width:767px) and (orientation:landscape){html{font-size:10px}}@media(max-width:374px){html{font-size: calc(10 / 375 * 100vw);}}a{color:inherit;text-decoration:none}ol,ul{list-style:none}img{max-width:100%;height:auto;vertical-align:middle}button:focus{outline:0}.mask{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:none;transform:translate3d(0,0,0)}`}</style>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" />

        <script src="https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.includes%2CArray.prototype.flat%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver" crossOrigin="anonymous" async defer></script>
      </Head>

      <Provider store={store}>
        <ApolloProvider client={client} >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </>
  )
}

export default App;
