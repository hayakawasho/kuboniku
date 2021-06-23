import { useQuery, useInfiniteQuery } from 'react-query';

const QUERY_KEYS = ['works'] as const;

type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
type TQueryKeys = Unpacked<typeof QUERY_KEYS>;
type TFetchHandler<T, E> = {
  ok: Promise<T>;
  error: E;
};

const useRequest = <T, E extends Error = Error>(
  queryKey: TQueryKeys,
  { ok, error }: TFetchHandler<T, E>
) => {
  const { data, status } = useQuery<T, E>(queryKey, async () => {
    try {
      return await ok;
    } catch (e) {
      throw new Error('useRequest: error catch');
    }
  });

  return [data, status];
};

const useRequestInfinite = <T>() => {};

export { useRequest, useRequestInfinite };
