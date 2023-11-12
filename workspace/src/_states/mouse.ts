import { useUnmount, ref, readonly } from "lake";
import { map } from "nanostores";
import type { Point } from "@/_foundation/type";

type MousePos = Point;

const pos = map<MousePos>({
  x: 0,
  y: 0,
});

export const useMousePos = () => {
  const { x, y } = pos.get();
  const currentX = ref(x);
  const currentY = ref(y);

  const unbind = pos.listen(({ x, y }) => {
    currentX.value = x;
    currentY.value = y;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(currentX), readonly(currentY)] as const;
};

export const mousePosMutators = (update: MousePos) => pos.set(update);
