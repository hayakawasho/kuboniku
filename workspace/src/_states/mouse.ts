import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";
import { noop } from "@/_foundation/utils";
import type { Point } from "@/_foundation/type";

const store = createStore();
const mousePosAtom = atom<Point>({
  x: 0,
  y: 0,
});

export const useMousePos = (callback: (payload: { x: number; y: number }) => void = noop) => {
  const { x, y } = store.get(mousePosAtom);
  const posX = ref(x);
  const posY = ref(y);

  const unsub = store.sub(mousePosAtom, () => {
    const { x, y } = store.get(mousePosAtom);
    posX.value = x;
    posY.value = y;

    callback({
      x,
      y,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(posX), readonly(posY)] as const;
};

export const mousePosMutators = (val: Point) => store.set(mousePosAtom, val);
