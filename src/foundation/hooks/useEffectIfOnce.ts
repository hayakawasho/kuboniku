import { DependencyList, EffectCallback, useRef } from 'react';
import { useEffectIf } from './useEffectIf';

const useEffectIfOnce = (
  effect: EffectCallback,
  deps: DependencyList,
  condition: boolean | (() => boolean)
) => {
  const isDoneRef = useRef(false);

  if (typeof condition === 'function') {
    condition = condition();
  }

  useEffectIf(
    () => {
      isDoneRef.current = true;
      return effect();
    },
    deps,
    condition && !isDoneRef.current
  ); //一度実行されるとこの条件式は二度とtrueになることはない
};

export { useEffectIfOnce };
