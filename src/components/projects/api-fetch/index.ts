import { request } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { WP_API_END_POINT } from '@/foundation/constants/const';

const fetcher = <T>(gql: RequestDocument, variables?) => {
  return request<T>(WP_API_END_POINT, gql, variables);
};

export { fetcher };
