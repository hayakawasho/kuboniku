import 'ress';
import '~css/global.scss';
import { ReactElement, useRef } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import ViewportRef from '~/components/parts/ViewportRef';
import Loader from '~/components/parts/Loader';
import Header from '~/components/layouts/Header/header';
import Nav from '~/components/layouts/Nav/nav';
import store from '~/state/store';
import Webgl from '~/context/webgl';

if (process.browser) {
  require('~/client');
}

const AppComponent = ({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement => {
  const queryClientRef = useRef(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          staleTime: 300000,
        },
      },
    });
  }

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
      </Head>

      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
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
          {process.env.NODE_ENV === 'production' ? null : (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </Hydrate>
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
