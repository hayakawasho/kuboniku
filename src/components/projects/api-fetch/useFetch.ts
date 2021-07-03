import { useEffect, useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { useHandleHttpError } from '@/components/projects';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E]

const useFetch = <T extends {}>(key: string | null, fetcher: () => Promise<T>, options?: SWRConfiguration<T>) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpError();

  const result = useSWR<T, Error>(key, async () => {
    return await fetcher();
  }, options);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', '' + error]);
    }
  }, [result.error, handleHttpError]);

  return [result.data, status] as const;
}

export { useFetch }
