import { useUnmount, ref, readonly } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";

const pos = map<{
  y: number;
}>({
  y: 0,
});

export const useScrollPos = (
  callback: (payload: { currentY: number; oldY: number }) => void = noop
) => {
  const { y } = pos.get();
  const currentY = ref(y);

  const unbind = pos.listen(({ y }) => {
    const oldY = currentY.value;

    callback({
      currentY: y,
      oldY,
    });

    currentY.value = y;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(currentY)] as const;
};

export const scrollPosMutators = (update: { y: number }) =>
  pos.set({ y: update.y });
