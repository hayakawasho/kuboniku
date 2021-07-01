import { useCallback } from 'react';

const useHandleHttpError = () => {
  const handleHttpError = useCallback((error) => {
    return error
  }, []);

  return { handleHttpError };
}

export { useHandleHttpError }
