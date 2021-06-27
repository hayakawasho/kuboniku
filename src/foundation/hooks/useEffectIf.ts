import { DependencyList, EffectCallback, useEffect } from 'react';

const useEffectIf = (
  effect: EffectCallback,
  deps: DependencyList,
  condition: boolean | (() => boolean)
) => {
  if (typeof condition === 'function') {
    condition = condition();
  }

  useEffect(() => {
    if (!condition) {
      return;
    }

    return effect();
  }, [...deps, condition]);
};

export { useEffectIf };
