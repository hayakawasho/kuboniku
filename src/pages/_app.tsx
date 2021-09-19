import 'ress';
import '~css/global.css';
import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { AnimatePresence } from 'framer-motion';
import { SWRConfig } from 'swr';
import { UiColorProvider, MenuProvider } from '@/common/context';
import { Navigation, Header } from '@/common/components';
import dynamic from 'next/dynamic';

const World3d = dynamic(
  () => import('../features/world-3d').then(modules => modules.Webgl),
  { ssr: false }
);

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
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=String.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        strategy="beforeInteractive"
      />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      {
        //<AppConfigProvider>
      }
      <SWRConfig
        value={{
          revalidateOnFocus: false,
        }}
      >
        {
          // <AppStateProvider>
        }
        <UiColorProvider>
          {
            //<WindowScrollProvider>
            //<WindowSizeProvider>
            //<MousePositionProvider>
          }
          <MenuProvider>
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
          </MenuProvider>
          {
            //</UiColorProvider>
            // </WindowSizeProvider>
            // </WindowScrollProvider>
          }
        </UiColorProvider>
        {
          // </AppStateProvider>
        }
      </SWRConfig>
      {
        // </AppConfigProvider>
      }
    </>
  );
};

export default AppComponent;
