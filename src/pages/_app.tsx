import 'ress';
import '~css/global.scss';

import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// componments
import ViewportRef from '~/components/ViewportRef';
import Loader from '~/components/Loader';
import Header from '~/layouts/Header/header';
import Nav from '~/layouts/Nav/nav';

import store from '~/state/store';
import Webgl from '~/context/webgl';

const queryClient = new QueryClient();

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
        {/*
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"
            crossOrigin="anonymous"
            defer
          ></script>
          */}
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ViewportRef />
          <Loader />
          <div id="app">
            <Header />
            <Nav />
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={onExitComplete}
            >
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
            <Webgl />
          </div>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default AppComponent;

const onExitComplete = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
    });
  }
};
