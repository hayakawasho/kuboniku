import { useRef, useCallback } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import { request } from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';
import { WP_API_END_POINT } from '@/foundation/constants/const';

const fetcher = <T>(gql: RequestDocument, variables?) => {
  return request<T>(WP_API_END_POINT, gql, variables);
};

const useRequest = <T, E extends Error = Error>(gql: string, options: {
  deps?: any[],
  initialData?: any
}) => {
  const k = Array.isArray(options.deps) ? [gql, ...options.deps] : [gql];
  const { data, error } = useSWR<T, E>(k, {
    initialData: options.initialData
  });

  return [data] as const;
};

const useInfiniteRequest = <T>(query: any, options: any) => {
  return [status] as const;
};

export { useRequest, useInfiniteRequest, fetcher };
