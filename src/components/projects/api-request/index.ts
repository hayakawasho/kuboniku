import useSWR, { useSWRInfinite } from 'swr';
import { request } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

const fetcher = (query, variables?) => {
  return request(WP_API_END_POINT, query, variables);
};

const useRequest = <T, E extends Error = Error>(
  queryKey: any,
  options: any
) => {
  const { data } = useSWR(queryKey, fetcher, options);

  return [data, status] as const;
};

const useInfiniteRequest = <T>() => {};

export { useRequest, useInfiniteRequest, fetcher };
