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

  const result = useSWR<T, Error>(key, async () => fetcher(), options);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', error.message]);
    } else if (result.isValidating) {
      setStatus(['loading'])
    } else if (result.data) {
      setStatus(['success'])
    }
  }, [result.error, handleHttpError, result.isValidating, result.data]);

  return [result.data, status] as const;
}

export { useFetch }
