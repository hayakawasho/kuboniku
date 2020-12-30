import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const WP_API_END_POINT =
  process.env.WP_API_END_POINT || 'https://dev-kuboniku.gq/wp/graphql';

const httpLink = createHttpLink({
  uri: WP_API_END_POINT,
});

const client = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
  ssrForceFetchDelay: 100,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
