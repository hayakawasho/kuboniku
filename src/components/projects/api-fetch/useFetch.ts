import { useEffect, useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { useHandleHttpError } from './useHandleHttpError';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E]

const useFetch = <T extends {}>(key: string | null, fetcher: () => Promise<T>, options?: SWRConfiguration<T>) => {
  const [status, setStatus] = useState<TStatus<Error>>(['idle']);
  const { handleHttpError } = useHandleHttpError();

  const { data, error } = useSWR<T, Error>(key, async () => {
    return await fetcher();
  }, options);

  useEffect(() => {
    const err = handleHttpError(error);
    setStatus(['error', err]);
  }, [error, handleHttpError]);

  return [data, status] as const;
}

export { useFetch }
