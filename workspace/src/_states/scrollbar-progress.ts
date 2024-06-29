import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "@/_foundation/utils";
import { useScrollPositionContext } from "@/_states/scroll-position";
import { useWindowSizeContext } from "@/_states/window-size";

type ScrollProgress = {
  now: number;
  pos: number;
};

const store = createStore();
const progressAtom = atom<ScrollProgress>({
  now: 0,
  pos: 0,
});

export const useScrollbarProgress = (
  callback: (payload: { now: number; pos: number }) => void = noop
) => {
  const [_, wh] = useWindowSizeContext();
  const [posY] = useScrollPositionContext();

  const onMutateScrollProgress = (offset: number) => {
    store.set(progressAtom, {
      now: (posY.value / (offset - wh.value)) * 100,
      pos: (posY.value + wh.value) / offset,
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
