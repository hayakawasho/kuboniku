import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";
import { noop } from "~/_foundation/utils";

const store = createStore();
const yAtom = atom(0);

export const useWindowScroll = (
  callback: (payload: { currentY: number; oldY: number; diff: number }) => void = noop
) => {
  const refY = ref(0);

  const unsub = store.sub(yAtom, () => {
    const oldY = refY.value;
    const currentY = store.get(yAtom);
    const diff = currentY - oldY;

    callback({
      currentY,
      oldY,
      diff,
    });

    refY.value = currentY;
  });

  useUnmount(() => {
    unsub();
  });

  return [readonly(refY)] as const;
};

export const windowScrollMutators = (val: number) => store.set(yAtom, val);
