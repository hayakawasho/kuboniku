import { atom, createStore } from "jotai";
import { ref, readonly, useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import type { Size } from "~/_foundation/types";

const store = createStore();
const viewportAtom = atom<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSizeState = (
  callback: (payload: { aspect: number; windowWidth: number; windowHeight: number }) => void = noop
) => {
  const { width, height } = store.get(viewportAtom);
  const ww = ref(width);
  const wh = ref(height);

  const unsub = store.sub(viewportAtom, () => {
    const { width: windowWidth, height: windowHeight } = store.get(viewportAtom);
    const aspect = windowWidth / windowHeight;
    ww.value = windowWidth;
    wh.value = windowHeight;

    callback({
      aspect,
      windowHeight,
      windowWidth,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(ww), readonly(wh)] as const;
};

export const windowSizeMutators = (val: Size) => store.set(viewportAtom, val);
