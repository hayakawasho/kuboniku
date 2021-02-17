import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '~/state/store';
import { AnimatePresence } from 'framer-motion';

import 'ress';
import '~/assets/styles/global.scss';

import ViewportRef from '~/components/viewportRef';
import Loader from '~/components/loader';
import Nav from '~/components/nav/nav';
import Webgl from '~/context/webgl';

if (process.browser) {
  require('~/client');
}

const routeChange = () => {
  const tempFix = () => {
    const allStyleElements = document.querySelectorAll('link');
    allStyleElements.forEach(elem => {
      if (elem.as === 'style') elem.rel = 'stylesheet';
    });
  };
  tempFix();
};

Router.events.on('routeChangeStart', routeChange);
Router.events.on('routeChangeComplete', routeChange);

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
        <Nav />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        <Webgl />
      </Provider>
    </>
  );
};

export default AppComponent;
