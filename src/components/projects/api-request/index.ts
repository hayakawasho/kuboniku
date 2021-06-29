import { useRef, useCallback } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import { request } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

const fetcher = (query, variables?) => {
  return request(WP_API_END_POINT, query, variables);
};

const useRequest = <T, E extends Error = Error>(query: any, options: any) => {
  const { data } = useSWR(query, options);
  return [data, status] as const;
};

const useInfiniteRequest = <T>(query: any, options: any) => {
  return [status] as const;
};

export { useRequest, useInfiniteRequest, fetcher };
