import { useCallback } from 'react';
import constate from 'constate';
// import { useSentry } from './useSentry';

interface IError extends Error {
  code: number;
}

const useHandleHttpError = () => {
  // const { captureException } = useSentry();

  const handleHttpError = useCallback((error) => {
    let errors: IError | null = null;

    if (error) {
      // captureException(error.error, error.data)

      console.log({ error })
    }

    return errors
  }, []);

  const raiseError = useCallback(() => {

  }, []);

  return { handleHttpError, raiseError };
}

export const [HandleHttpErrorProvider, useHandleHttpErrorContext] = constate(useHandleHttpError);
