import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import loadable from '@loadable/component'
import { useSelector, useDispatch } from 'react-redux'
import { appSelector, DOM_READY } from '~/state/app'

import { EVENTS } from '~/foundation/constants/const'

import Sh from '~/foundation/components/sh'
import Nav from '~/foundation/components/nav'
import Mask from '~/foundation/components/mask'

const Gl = loadable(() => import('~/context/canvas'))
const ViewportRef = loadable(
  () => import('~/foundation/components/viewportRef')
)
const Cursor = loadable(() => import('~/foundation/components/cursor'))

let E

if (process.browser) {
  E = require('~/foundation/utils/E').default
}

const Layout = ({ children }) => {
  const { domReady } = useSelector(appSelector)
  const dispatch = useDispatch()
  const router = useRouter()
  const appRef = useRef(null)

  useEffect(() => {
    !domReady &&
      requestAnimationFrame(
        () => (dispatch(DOM_READY()), E.emit(EVENTS.DOM_READY))
      )
  }, [domReady])

  useEffect(() => {
    const routeChangeStart = url => E.emit(EVENTS.ROUTE_START, { url })
    const routeChangeComplete = url =>
      E.emit(EVENTS.ROUTE_UPDATE, { url, mount: appRef.current })

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
    }
  }, [])

  return (
    <>
      <ViewportRef />
      <Mask />
      <div id="app" ref={appRef}>
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
