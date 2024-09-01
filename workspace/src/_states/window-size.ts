import { atom, createStore } from "jotai";
import { ref, readonly, useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import globalStore from ".";
import type { Size } from "~/_foundation/types";

const store = createStore();

const viewportAtom = atom<Size>({
  height: globalStore.bounds.wh,
  width: globalStore.bounds.ww,
});

export const useWindowSize = (callback: (payload: { aspect: number; windowSize: Size }) => void = noop) => {
  const { width, height } = store.get(viewportAtom);
  const refWindowW = ref(width);
  const refWindowH = ref(height);

  const unsub = store.sub(viewportAtom, () => {
    const windowSize = store.get(viewportAtom);
    const aspect = windowSize.width / windowSize.height;

    callback({
      aspect,
      windowSize,
    });

    refWindowW.value = globalStore.bounds.ww = windowSize.width;
    refWindowH.value = globalStore.bounds.wh = windowSize.height;
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(refWindowW), readonly(refWindowH)] as const;
};

export const windowSizeMutators = (val: Size) => store.set(viewportAtom, val);
