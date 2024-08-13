import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "~/_foundation/utils";
import { useWindowScroll } from "~/_states/scroll-position";
import { useWindowSize } from "~/_states/window-size";

type ScrollProgress = {
  now: number;
  pos: number;
};

const store = createStore();
const progressAtom = atom<ScrollProgress>({
  now: 0,
  pos: 0,
});

export const useScrollbarProgress = (callback: (payload: ScrollProgress) => void = noop) => {
  const unsub = store.sub(progressAtom, () => {
    callback({
      ...store.get(progressAtom),
    });
  });

  useUnmount(() => {
    unsub();
  });
};

export const useScrollProgressMutators = () => {
  const [_, wh] = useWindowSize();
  const [posY] = useWindowScroll();

  const setScrollProgress = (offset: number) => {
    store.set(progressAtom, {
      now: (posY.value / (offset - wh.value)) * 100,
      pos: (posY.value + wh.value) / offset,
    });
  };

  return {
    setScrollProgress,
  };
};
