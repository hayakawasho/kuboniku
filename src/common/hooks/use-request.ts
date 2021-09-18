import { useEffect, useState } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { useHandleHttpError } from './use-handle-http-error';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E];

const useRequest = <T extends Record<string, unknown>>(
  key: string | string[] | null,
  fetcher: () => Promise<T>,
  options?: SWRConfiguration<T>
) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpError();

  const result = useSWR<T, Error>(key, async () => fetcher(), options);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', error.message]);
    } else if (result.data) {
      setStatus(['success']);
    } else if (result.isValidating) {
      setStatus(['loading']);
    }
  }, [result.error, handleHttpError, result.isValidating, result.data]);

  return [result.data, status] as const;
};

export { useRequest };
