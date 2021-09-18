import { useCallback } from 'react';

interface IError extends Error {
  code?: number;
}

const useHandleHttpError = () => {
  const handleHttpError = useCallback(error => {
    const errors: IError | null = null;

    if (error) {
      console.log({ error });
    }

    return errors;
  }, []);

  return { handleHttpError };
};

export { useHandleHttpError };
