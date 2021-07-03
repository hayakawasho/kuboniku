import { useCallback } from 'react';

const useHandleHttpError = () => {
  const handleHttpError = useCallback((error) => {
    console.log(error)
    return error
  }, []);

  return { handleHttpError };
}

export { useHandleHttpError }
