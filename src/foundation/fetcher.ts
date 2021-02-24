import { request } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

export const fetcher = (query, variables?) => {
  return request(WP_API_END_POINT, query, variables);
};
