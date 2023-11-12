import { useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";

const progress = map<{
  track: number;
  percentage: number;
}>({
  percentage: 0,
  track: 0,
});

export const useScrollbarProgress = (
  callback: (payload: { percentage: number; track: number }) => void = noop
) => {
  const onProgressMutate = (
    value: number,
    screenHeight: number,
    offsetHeight: number
  ) => {
    progress.set({
      percentage: (value / (offsetHeight - screenHeight)) * 100,
      track: (value + screenHeight) / offsetHeight,
    });
  };

  const unbind = progress.listen(({ percentage, track }) => {
    callback({ percentage, track });
  });

  useUnmount(() => {
    unbind();
  });

  return {
    onProgressMutate,
  } as const;
};
