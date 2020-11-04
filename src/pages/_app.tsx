import '../assets/css/index.scss'

import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Layout from '../components/Layout'

import { Provider } from 'react-redux'
import store from '../state/store'
import { EVENTS } from '../foundation/constants/const'


let E;
let isDomReady = false;

if (process.browser) {
  E = require('../foundation/utils/E').default;

  const mq = require('../foundation/constants/env').mq
  const ASScroll = require('@ashthornton/asscroll').default
  const Application = require('stimulus').Application
  const Viewport = require('../controllers/viewportRef').default

  const app = Application.start();

  const { mobile, pc } = mq;

  pc.addListener(enterPcViewport);
  mobile.addListener(enterMobileViewport);

  function enterPcViewport(mql) {
    if (!mql.matches) return;
    E.emit(EVENTS.ENTER_PC_VIEWPORT)
  }

  function enterMobileViewport(mql) {
    if (!mql.matches) return;
    E.emit(EVENTS.ENTER_MOBILE_VIEWPORT)
  }

  function mouseMove(evt) {
    const { clientX, clientY, target } = evt;

    E.emit(EVENTS.MOUSE_MOVE, {
      x: clientX,
      y: clientY,
      target,
      event: evt
    })
  }

  window.addEventListener('mousemove', mouseMove, {
    passive: true
  });

  window.addEventListener('wheel', (event) => {
    E.emit(EVENTS.WHEEL, { event })
  }, {
    passive: false
  });

  window.addEventListener('scroll', (event) => {
    E.emit(EVENTS.NATIVE_SCROLL, { event })
  }, {
    passive: true
  });

  E.once(EVENTS.DOM_READY, () => {
    app.register('viewportRef', Viewport);

    const smoothScroll = new ASScroll({
      element: '[data-smooth]',
      innerElement: '[data-smooth-item]',
      ease: 0.14,
      disableResize: true,
      disableOnTouch: true,
      customScrollbar: false
    });

    smoothScroll.on('raf', async ({ scrollPos, smoothScrollPos }) => {
      E.emit(EVENTS.SCROLL, { scrollPos, smoothScrollPos })
    });

    E.on(EVENTS.RESIZE, ({ width, height }) => smoothScroll.onResize(width, height))

    smoothScroll.enable();
  })
};

const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    if (isDomReady) return;
    isDomReady = true;
    E.emit(EVENTS.DOM_READY);
  });

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default App;