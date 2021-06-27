import 'ress';
import '~css/global.scss';
import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
// import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
// import ViewportRef from '~/components/ViewportRef';
// import Loader from '~/components/Loader';
// import { Header, Navigation } from '~/components/layouts';
import {
  AppConfigProvider,
  AppStateProvider,
  UiColorProvider,
  MenuProvider,
} from '~/context';
import { SWRConfig } from 'swr';
import { fetcher } from '~/components/projects';

// const World3d = dynamic(
//   () => import('~/context/world-3d').then(modules => modules.Webgl),
//   { ssr: false }
// );

// if (process.browser) {
//   require('~/foundation/client-only');
// }

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
      <AppConfigProvider>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher,
          }}
        >
          <AppStateProvider>
            <UiColorProvider>
              <MenuProvider>
                <div id="app">
                  {
                    // <Header />
                    // <Navigation />
                  }
                  <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={onExitComplete}
                  >
                    <Component {...pageProps} key={router.asPath} />
                  </AnimatePresence>
                  {
                    //<World3d />
                  }
                </div>
              </MenuProvider>
            </UiColorProvider>
          </AppStateProvider>
        </SWRConfig>
      </AppConfigProvider>
    </>
  );
};

export default AppComponent;
