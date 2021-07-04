import { useEffect, useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { useHandleHttpErrorContext } from '@/context';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E]

const useFetch = <T extends {}>(
  key: string | null,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration<T>
) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpErrorContext();

  const result = useSWR<T, Error>(key, fetcher, options);

  useEffect(() => {
    const err = handleHttpError(result.error);

    if (err) {
      setStatus(['error', err.message]);
    }
  }, [result.error, handleHttpError]);

  return [result.data, status] as const;
}

export { useFetch }
