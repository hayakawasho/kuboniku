import { useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";
import { useScrollPositionContext } from "@/_states/scroll-position";
import { useWindowSizeContext } from "@/_states/window-size";

const progress = map<{
  now: number;
  pos: number;
}>({
  now: 0,
  pos: 0,
});

export const useScrollbarProgress = (
  callback: (payload: { now: number; pos: number }) => void = noop
) => {
  const [_, wh] = useWindowSizeContext();
  const [posY] = useScrollPositionContext();

  const onMutateScrollProgress = (offset: number) => {
    progress.set({
      now: (posY.value / (offset - wh.value)) * 100,
      pos: (posY.value + wh.value) / offset,
    });
  };

  const unbind = progress.listen(({ now, pos }) => {
    callback({
      now,
      pos,
    });
  });

  useUnmount(() => {
    unbind();
  });

  return {
    onMutateScrollProgress,
  } as const;
};
