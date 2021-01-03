import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import loadable from '@loadable/component';
import { useSelector, useDispatch } from 'react-redux';
import { appSelector, DOM_READY } from '~/state/app';
import { uiSelector } from '~/state/ui';

import { EVENTS } from '~/foundation/constants/const';

import Header from '~/foundation/components/header';
import Nav from '~/foundation/components/nav';
import Loader from '~/foundation/components/loader';
const Webgl = loadable(() => import('~/context/webgl'));
const ViewportRef = loadable(
  () => import('~/foundation/components/viewportRef')
);
const Cursor = loadable(() => import('~/foundation/components/cursor'));

let E;

if (process.browser) {
  E = require('~/foundation/utils/E').default;
}

const Layout = ({ children }) => {
  const { domReady } = useSelector(appSelector);
  const { location } = useSelector(uiSelector);
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
        <Cursor />
        <Webgl />
      </div>
    </>
  );
};

export default Layout;
