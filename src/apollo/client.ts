import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const WP_URL = process.env.WP_URL || 'https://dev-kuboniku.gq/wp/'
const WP_API_END_POINT = WP_URL + 'graphql'

/**
 * Instantiate required constructor fields
 */
const cache = new InMemoryCache({
  resultCaching: false,
})

const link = createHttpLink({
  uri: WP_API_END_POINT,
})

const client = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export default client
