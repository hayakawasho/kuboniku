import React, { ReactNode, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import store from '../state/store';
import { useSelector } from 'react-redux';
import { uiSelector, SET_SCROLLING } from '../state/ui';

import Sh from './sh'
const Gl = dynamic(() => import('./canvas'), { ssr: false })
const ViewportRef = dynamic(() => import('./viewportRef'), { ssr: false })
const Cursor = dynamic(() => import('./cursor'), { ssr: false })

import { EVENTS } from '../foundation/constants/const';

type Props = {
  children?: ReactNode
  title?: string
}

let E;

if (process.browser) {
  const env = require('../foundation/constants/env')
  const { mq, APP, hasTouch } = env;

  const ASScroll = require('@ashthornton/asscroll').default

  const app = require('stimulus').Application.start();
  const mod = require('../controllers')

  E = require('../foundation/utils/E').default;

  E.once(EVENTS.DOM_READY, () => {
    app.register('skew', mod.Skew);

    if (!hasTouch) {
      APP.smooth = new ASScroll({
        element: '[data-smooth]',
        innerElement: '[data-smooth-item]',
        ease: 0.09,
        disableResize: true,
        customScrollbar: false
      });

      const { smooth } = APP

      smooth.on('raf', ({ scrollPos, smoothScrollPos }) => {
        E.emit(EVENTS.SCROLL, { scrollPos, smoothScrollPos })
      });

      E.on(EVENTS.RESIZE, ({ width, height }) => smooth.onResize(width, height))

      smooth.enable();
    } else {

    }

    disableHover();

    // temp
    document.documentElement.classList.add('is-webfontLoaded')
  })

  const { mobile, pc } = mq;

  if (mobile.matches) {
    // store.dispatch(SET_SCROLLING(true))
  } else {
    // store.dispatch(SET_SCROLLING(true))
  }

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

  window.addEventListener('scroll', (event) => {
    E.emit(EVENTS.NATIVE_SCROLL, { event })
  }, {
    passive: true
  });

  const disableHover = () => {
    let isRunning, val, timer;

    isRunning = false
    val = 0
    timer = setTimeout(enable, 300)

    if (!hasTouch) {
      APP.smooth.on('scroll', disable)
    } else {
      E.on(EVENTS.NATIVE_SCROLL, disable)
    }

    function disable(scrollPos) {
      if (val !== scrollPos) {
        val = scrollPos
        clearTimeout(timer)

        isRunning || (
          isRunning = true,
          store.dispatch(SET_SCROLLING(true))
        ),
          timer = setTimeout(enable, 300)
      }
    }

    function enable() {
      isRunning = false
      store.dispatch(SET_SCROLLING(false))
    }
  }
} // process.browser

const Layout = ({ children }: Props) => {
  const [domReady, setDomReady] = useState(false)
  const router = useRouter()
  const appRef = useRef(null)
  const { scrolling } = useSelector(uiSelector)

  useEffect(() => {
    !domReady && requestAnimationFrame(() => (
      setDomReady(true),
      E.emit(EVENTS.DOM_READY)
    ))
  }, [domReady]);

  useEffect(() => {
    const routeChangeStart = url => {
      (window as any).KUBONIKU_APP.smooth && (window as any).KUBONIKU_APP.smooth.disable()
    }

    const routeChangeComplete = url => {
      (window as any).KUBONIKU_APP.smooth && (window as any).KUBONIKU_APP.smooth.enable(false, true, appRef.current.querySelectorAll('[data-smooth-item]'))
    }

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
    }
  })

  return (
    <>
      <ViewportRef />
      <div className={`mask || js-loader`} style={scrolling ? { pointerEvents: 'all' } : { pointerEvents: 'none' } } />
      <div id="js-site-wrap" className="app" ref={appRef} data-controller="mainMenu">
        <Sh />
        <main className="page" data-smooth>
          {children}
        </main>
        <Cursor />
        <Gl />
      </div>
    </>
  )
}

export default Layout
