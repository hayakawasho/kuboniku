import { useCallback } from 'react';

const useSkewScroll = () => {
  const onScroll = useCallback((scrollVal: number) => {}, []);

  return {
    onScroll,
  };
};

export { useSkewScroll };
