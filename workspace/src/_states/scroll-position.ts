import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";
import { noop } from "~/_foundation/utils";

const store = createStore();
const yAtom = atom(0);

export const useScrollPositionState = (
  callback: (payload: { currentY: number; oldY: number; diff: number }) => void = noop
) => {
  const currentY = ref(store.get(yAtom));

  const unsub = store.sub(yAtom, () => {
    const oldY = currentY.value;
    const y = store.get(yAtom);
    const diff = y - oldY;

    callback({
      currentY: y,
      oldY,
      diff,
    });

    currentY.value = y;
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(currentY)] as const;
};

export const scrollPositionMutators = (val: number) => store.set(yAtom, val);
