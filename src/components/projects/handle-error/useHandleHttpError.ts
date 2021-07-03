import { useCallback } from 'react';

interface IError {
  code: number;
  message: string;
}

const useHandleHttpError = () => {
  const handleHttpError = useCallback((error) => {
    let errors: IError | null;

    if (error) {
      console.log({ error })
    }

    return errors
  }, []);

  return { handleHttpError };
}

export { useHandleHttpError }
