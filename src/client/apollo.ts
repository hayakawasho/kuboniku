import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache({
  resultCaching: false,
});

const WP_API_END_POINT =
  process.env.WP_API_END_POINT || 'https://dev-kuboniku.gq/wp/graphql';

const link = createHttpLink({
  uri: WP_API_END_POINT,
});

// Apollo GraphQL client.
const client = new ApolloClient({
  link,
  cache,
  ssrForceFetchDelay: 100,
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
});

export default client;
