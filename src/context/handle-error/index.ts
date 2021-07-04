import { useCallback } from 'react';
import constate from 'constate';

interface IError extends Error {
  code: number;
}

const useHandleHttpError = () => {

  const handleHttpError = useCallback((error) => {
    let errors: IError | null = null;

    if (error) {
      console.log({ error })
    }

    return errors
  }, []);

  const raiseError = useCallback(() => {

  }, []);

  return { handleHttpError, raiseError };
}

export const [HandleHttpErrorProvider, useHandleHttpErrorContext] = constate(useHandleHttpError);
