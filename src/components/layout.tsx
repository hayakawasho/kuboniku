import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import loadable from '@loadable/component'

import { EVENTS } from '~/foundation/constants/const'

import store from '~/state/store'
import { SET_SCROLLING, SET_GPU_TIER } from '~/state/ui'

import Sh from './_parts/sh'
import Nav from './_parts/nav'
import Mask from './_parts/mask'

const Gl = loadable(() => import('./canvas'))
const ViewportRef = loadable(() => import('./_parts/viewportRef'))
const Cursor = loadable(() => import('./_parts/cursor'))

import { getGPUTier } from 'detect-gpu'

let E

const Layout = ({ children }) => {
  const [domReady, setDomReady] = useState(false)
  const router = useRouter()
  const appRef = useRef(null)

  useEffect(() => {
    !domReady &&
      requestAnimationFrame(() => (setDomReady(true), E.emit(EVENTS.DOM_READY)))
  }, [domReady])

  useEffect(() => {
    const routeChangeStart = url =>
      E.emit(EVENTS.ROUTE_START, {
        url,
      })

    const routeChangeComplete = url =>
      E.emit(EVENTS.ROUTE_COMPLETE, {
        url,
        mount: appRef.current,
      })

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
    }
  }, [])

  // const newPageTransition = useTransition(router, router => router.pathname, {
  //   from: { transform: 'translate3d(0,-40px,0)' },
  //   enter: { transform: 'translate3d(0,0px,0)' },
  //   leave: { transform: 'translate3d(0,-40px,0)' },
  // })

  return (
    <>
      <ViewportRef />
      <Mask />
      <div id="app" ref={appRef} data-controller="mainMenu">
        <Sh />
        <Nav />
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

if (process.browser) {
  ;(async () => {
    const gpuTier = await getGPUTier()
    store.dispatch(SET_GPU_TIER(gpuTier))
  })()

  const env = require('~/foundation/constants/env')
  const { APP, hasTouch } = env

  const ASScroll = require('@ashthornton/asscroll').default

  const app = require('stimulus').Application.start()
  const mod = require('~/controllers')

  E = require('~/foundation/utils/E').default

  E.once(EVENTS.DOM_READY, () => {
    app.register('skew', mod.Skew)

    if (!hasTouch) {
      APP.smooth = new ASScroll({
        element: '[data-smooth]',
        innerElement: '[data-smooth-item]',
        ease: 0.09,
        disableResize: true,
        customScrollbar: false,
      })

      const { smooth } = APP

      smooth.on('raf', ({ scrollPos, smoothScrollPos }) => {
        E.emit(EVENTS.SCROLL, { scrollPos, smoothScrollPos })
      })

      E.on(EVENTS.RESIZE, ({ width, height }) => smooth.onResize(width, height))

      smooth.enable()
    } else {
      E.emit(EVENTS.SCROLL, { event })
    }

    disableHover()
  })

  E.on(EVENTS.ROUTE_START, () => {
    APP.smooth && APP.smooth.disable()
  })

  E.on(EVENTS.ROUTE_COMPLETE, ({ mount }) => {
    APP.smooth &&
      APP.smooth.enable(
        false,
        true,
        mount.querySelectorAll('[data-smooth-item]')
      )
  })

  // const { mobile, pc } = mq;

  // if (mobile.matches) {
  //   store.dispatch(SET_SCROLLING(true))
  // } else {
  //   store.dispatch(SET_SCROLLING(true))
  // }

  // function enterPcViewport(mql) {
  //   if (!mql.matches) return;
  //   E.emit(EVENTS.ENTER_PC_VIEWPORT)
  // }

  // function enterMobileViewport(mql) {
  //   if (!mql.matches) return;
  //   E.emit(EVENTS.ENTER_MOBILE_VIEWPORT)
  // }

  // pc.addListener(enterPcViewport);
  // mobile.addListener(enterMobileViewport);

  const mouseMove = evt => {
    E.emit(EVENTS.MOUSE_MOVE, {
      x: evt.clientX,
      y: evt.clientY,
      target: evt.target,
      event: evt,
    })
  }

  window.addEventListener('mousemove', mouseMove, {
    passive: true,
  })

  window.addEventListener(
    'scroll',
    event => {
      E.emit(EVENTS.NATIVE_SCROLL, { event })
    },
    {
      passive: true,
    }
  )

  const disableHover = () => {
    let isRunning = false
    let val = 0
    let timer

    function enable() {
      isRunning = false
      store.dispatch(SET_SCROLLING(false))
    }

    function disable(scrollPos) {
      if (val !== scrollPos) {
        val = scrollPos
        clearTimeout(timer)

        isRunning || ((isRunning = true), store.dispatch(SET_SCROLLING(true))),
          (timer = setTimeout(enable, 300))
      }
    }

    timer = setTimeout(enable, 300)

    if (!hasTouch) {
      APP.smooth.on('scroll', disable)
    } else {
      E.on(EVENTS.NATIVE_SCROLL, disable)
    }
  }
}
