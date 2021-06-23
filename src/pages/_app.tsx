import 'ress';
import '~css/global.scss';
import { ReactElement, useRef } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
// import ViewportRef from '~/components/ViewportRef';
// import Loader from '~/components/Loader';
import Header from '~/layouts/header';
import Navigation from '~/layouts/navigation';
import store from '~/state/store';

const World3d = dynamic(
  () => import('~/context/world-3d').then(modules => modules.Webgl),
  {
    ssr: false,
  }
);

if (process.browser) {
  require('~/foundation/client-only');
}

const onExitComplete = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
    });
  }
};

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
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
          strategy="beforeInteractive"
        />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            {
              //<ViewportRef />
            }
            {
              //<Loader />
            }
            <div id="app">
              <Header />
              <Navigation />
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={onExitComplete}
              >
                <Component {...pageProps} key={router.asPath} />
              </AnimatePresence>
              <World3d />
            </div>
          </Provider>
        </Hydrate>
        {
          //<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        }
      </QueryClientProvider>
    </>
  );
};

export default AppComponent;
