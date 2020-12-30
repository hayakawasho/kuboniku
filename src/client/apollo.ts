import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const WP_API_END_POINT =
  process.env.WP_API_END_POINT || 'https://dev-kuboniku.gq/wp/graphql';

const httpLink = createHttpLink({
  uri: WP_API_END_POINT,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;
