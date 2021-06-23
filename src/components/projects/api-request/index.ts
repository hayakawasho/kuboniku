import useSWR, { useSWRInfinite } from 'swr';
import { fetcher } from '~/foundation/fetcher';

const useRequest = <T, E extends Error = Error>(
  queryKey: any,
  options: any
) => {
  const { data } = useSWR(queryKey, fetcher, options);

  return [data, status] as const;
};

const useInfiniteRequest = <T>() => {};

export { useRequest, useInfiniteRequest };
