import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { appSelector, DOM_READY } from '~/state/app';
import { EVENTS } from '~/foundation/constants/const';
import { isMobile } from 'react-device-detect';
import Header from '~/components/header/header';

let E;

if (process.browser) {
  E = require('~/foundation/utils/E').default;
}

const Layout = ({ children }) => {
  const [isTouch, setIsTouch] = useState(undefined);
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
      <div id="app">
        <Header />
        <main className="page" data-smooth>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
