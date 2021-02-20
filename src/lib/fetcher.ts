import { GraphQLClient } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

const gqlClient = new GraphQLClient(WP_API_END_POINT);

export const fetcher = query => gqlClient.request(query);
