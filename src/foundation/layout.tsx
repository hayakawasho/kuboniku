import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { appSelector, DOM_READY } from '~/state/app';
import { EVENTS } from '~/foundation/constants/const';

import Header from '~/components/header/header';
import Nav from '~/components/nav/nav';
import Loader from '~/components/loader';
import Webgl from '~/context/webgl';
import ViewportRef from '~/components/viewportRef';

let E;

if (process.browser) {
  E = require('~/foundation/utils/E').default;
}

const Layout = ({ children }) => {
  const { domReady } = useSelector(appSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const appRef = useRef(null);

  useEffect(() => {
    !domReady &&
      requestAnimationFrame(
        () => (dispatch(DOM_READY()), E.emit(EVENTS.DOM_READY))
      );
  }, [domReady]);

  useEffect(() => {
    const routeChangeStart = url => E.emit(EVENTS.ROUTE_START, { url });
    const routeChangeComplete = url =>
      E.emit(EVENTS.ROUTE_UPDATE, { url, mount: appRef.current });

    router.events.on('routeChangeStart', routeChangeStart);
    router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      router.events.off('routeChangeStart', routeChangeStart);
      router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, []);

  return (
    <>
      <ViewportRef />
      <div id="app" ref={appRef}>
        <Loader />
        <Header />
        <Nav />
        <main className="page" data-smooth>
          {children}
        </main>
        <Webgl />
      </div>
      <div id="mobile-turn">Please turn your device.</div>
    </>
  );
};

export default Layout;
