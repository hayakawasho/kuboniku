import React, { ReactNode } from 'react'
import Head from 'next/head'
import ViewportRef from './viewportRef';
import Cursor from './cursor';
// import SiteHeader from './siteHeader';

import { EVENTS } from '../foundation/constants/const';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'KuboNiku.com' }: Props) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <title>{title}</title>
        <meta name="description" content="" />
        <meta httpEquiv="Content-Type" content="text/html" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap" />
      </Head>
      <ViewportRef />
      <div className={`mask`} />
      <div id="js-site-wrap" className="app">
        <header />
        <main className="page" data-smooth>
          {children}
        </main>
        <Cursor />
      </div>
    </>
  )
}

export default Layout
