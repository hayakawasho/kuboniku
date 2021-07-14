import 'ress';
import '~css/global.scss';
import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import { SWRConfig } from 'swr';
import {
  AppConfigProvider,
  AppStateProvider,
  HandleHttpErrorProvider,
  UiColorProvider,
  MenuProvider,
  WindowScrollProvider,
  WindowSizeProvider,
  MousePositionProvider,
} from '@/context';
import { Header } from '@/components/site-parts/header';
import { Navigation } from '@/components/site-parts/navigation';

const World3d = dynamic(
  () => import('@/context/world-3d').then(modules => modules.Webgl),
  {
    ssr: false,
  }
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
      <AppConfigProvider>
        <HandleHttpErrorProvider>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
            }}
          >
            <AppStateProvider>
              <UiColorProvider>
                <WindowScrollProvider>
                  <WindowSizeProvider>
                    <MousePositionProvider>
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
                    </MousePositionProvider>
                  </WindowSizeProvider>
                </WindowScrollProvider>
              </UiColorProvider>
            </AppStateProvider>
          </SWRConfig>
        </HandleHttpErrorProvider>
      </AppConfigProvider>
    </>
  );
};

export default AppComponent;
