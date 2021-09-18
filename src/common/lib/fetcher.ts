import { request } from 'graphql-request';
import { RequestDocument, Variables } from 'graphql-request/dist/types';
import { WP_API_END_POINT } from '@/common/constants/const';

const fetcher = <T>(gql: RequestDocument, variables?: Variables) => {
  return request<T>(WP_API_END_POINT, gql, variables);
};

export { fetcher };
