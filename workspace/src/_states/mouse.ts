import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";
import { noop } from "~/_foundation/utils";
import type { Point } from "~/_foundation/types";

const store = createStore();
const mousePosAtom = atom<Point>({
  x: 0,
  y: 0,
});

export const useMousePosition = (callback: (payload: { x: number; y: number }) => void = noop) => {
  const refX = ref(0);
  const refY = ref(0);

  const unsub = store.sub(mousePosAtom, () => {
    const coordinate = store.get(mousePosAtom);
    refX.value = coordinate.x;
    refY.value = coordinate.y;

    callback(coordinate);
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(refX), readonly(refY)] as const;
};

export const mousePositionMutators = (val: Point) => store.set(mousePosAtom, val);
