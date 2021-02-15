import React, { ReactElement, Fragment } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '~/state/store';
import Layout from '~/foundation/layout';
import { ApolloProvider } from '@apollo/client';
import client from '~/client/apollo';
import { motion, AnimatePresence } from 'framer-motion';

import 'ress';
import '~/assets/styles/global.scss';

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
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Layout>
            <AnimatePresence exitBeforeEnter initial={false}>
              <motion.div
                key={router.route}
                transition={{
                  duration: 0.5,
                  ease: [0.18, 0.06, 0.23, 1],
                }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default AppComponent;
