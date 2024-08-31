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

export const useScrollbarProgress = (callback: (payload: { now: number; pos: number }) => void = noop) => {
  const [_, windowH] = useWindowSize();
  const [currentY] = useWindowScroll();

  const onMutateScrollProgress = (offset: number) => {
    store.set(progressAtom, {
      now: (currentY.value / (offset - windowH.value)) * 100,
      pos: (currentY.value + windowH.value) / offset,
    });
  };

  const unsub = store.sub(progressAtom, () => {
    callback({
      ...store.get(progressAtom),
    });
  });

  useUnmount(() => {
    unsub();
  });

  return {
    onMutateScrollProgress,
  } as const;
};
