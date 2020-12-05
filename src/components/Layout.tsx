import React, { ReactNode, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import loadable from '@loadable/component'

import { EVENTS } from '../foundation/constants/const'

import store from '../state/store'
import { SET_SCROLLING } from '../state/ui'

import Sh from './sh'
import Nav from './nav'
import Mask from './mask'

const Gl = loadable(() => import('./canvas'))
const ViewportRef = loadable(() => import('./viewportRef'))
const Cursor = loadable(() => import('./cursor'))

import { getGPUTier } from 'detect-gpu'

let E

if (process.browser) {
  ;(async () => {
    const gpuTier = await getGPUTier()
    ;(window as any).KUBONIKU_APP.gpuTier = gpuTier
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
    }

    disableHover()
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
} // process.browser

const Layout = ({ children }) => {
  const [domReady, setDomReady] = useState(false)
  const router = useRouter()
  const appRef = useRef(null)

  useEffect(() => {
    !domReady &&
      requestAnimationFrame(() => (setDomReady(true), E.emit(EVENTS.DOM_READY)))
  }, [domReady])

  useEffect(() => {
    const routeChangeStart = url => {
      ;(window as any).KUBONIKU_APP.smooth &&
        (window as any).KUBONIKU_APP.smooth.disable()
    }

    const routeChangeComplete = url => {
      ;(window as any).KUBONIKU_APP.smooth &&
        (window as any).KUBONIKU_APP.smooth.enable(
          false,
          true,
          appRef.current.querySelectorAll('[data-smooth-item]')
        )
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
