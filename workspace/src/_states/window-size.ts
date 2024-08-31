import { atom, createStore } from "jotai";
import { ref, readonly, useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import type { Size } from "~/_foundation/types";

const store = createStore();
const viewportAtom = atom<Size>({
  height: 0,
  width: 0,
});

export const useWindowSize = (callback: (payload: { aspect: number; windowSize: Size }) => void = noop) => {
  const refWindowW = ref(0);
  const refWindowH = ref(0);

  const unsub = store.sub(viewportAtom, () => {
    const windowSize = store.get(viewportAtom);
    const aspect = windowSize.width / windowSize.height;
    refWindowW.value = windowSize.width;
    refWindowH.value = windowSize.height;

    callback({
      aspect,
      windowSize,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(refWindowW), readonly(refWindowH)] as const;
};

export const windowSizeMutators = (val: Size) => store.set(viewportAtom, val);
