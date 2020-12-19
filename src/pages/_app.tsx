import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '~/state/store'
import Layout from '~/foundation/layout'
import { ApolloProvider } from '@apollo/client'
import client from '~/client/apollo'
// import { AnimatePresence } from 'framer-motion'

import 'ress'
import '~/foundation/styles/index.scss'

if (process.browser) {
  require('~/client')
}

const AppComponent = ({
  Component,
  pageProps,
  router,
}: AppProps): ReactElement => {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default AppComponent
