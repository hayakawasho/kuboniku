import { atom, createStore } from "jotai";
import { ref, readonly, useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import type { Size } from "~/_foundation/types";

const store = createStore();
const viewportAtom = atom<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSize = (callback: (payload: { aspect: number; windowSize: Size }) => void = noop) => {
  const { width, height } = store.get(viewportAtom);
  const ww = ref(width);
  const wh = ref(height);

  const unsub = store.sub(viewportAtom, () => {
    const { width, height } = store.get(viewportAtom);
    const aspect = width / width;

    ww.value = width;
    wh.value = height;

    const windowSize = {
      width,
      height,
    };

    callback({
      aspect,
      windowSize,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(ww), readonly(wh)] as const;
};

export const windowSizeMutators = (val: Size) => store.set(viewportAtom, val);
