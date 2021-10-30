import { useEffect, useRef } from 'react';

const useUpdateEffect: typeof useEffect = (callback, deps) => {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    return callback();
  }, deps);
};

export { useUpdateEffect };
