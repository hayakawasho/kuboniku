import React, { ReactElement } from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '~/state/store'
import Layout from '~/components/layout'
import { ApolloProvider } from '@apollo/client'
import client from '~/apollo/client'

import 'ress'
import '~/assets/css/index.scss'

const AppComponent = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Provider>
    </>
  )
}

export default AppComponent
