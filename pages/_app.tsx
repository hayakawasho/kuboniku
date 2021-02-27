import 'ress';
import '~/assets/styles/global.scss';
import React, { ReactElement, useEffect } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '~/state/store';
import { AnimatePresence } from 'framer-motion';

import ViewportRef from '~/components/viewportRef';
import Loader from '~/components/loader';
import Header from '~/components/header/header';
import Nav from '~/components/nav/nav';
import Webgl from '~/context/webgl';

if (process.browser) {
  require('~/client');
}

const AppComponent = ({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
          crossOrigin="anonymous"
          defer
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <Provider store={store}>
        <ViewportRef />
        <Loader />
        <div id="app">
          <Header />
          <Nav />
          <AnimatePresence exitBeforeEnter initial={false}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
          <Webgl />
        </div>
      </Provider>
    </>
  );
};

export default AppComponent;
