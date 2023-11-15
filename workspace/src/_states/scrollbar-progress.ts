import { useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";
import { useWindowSize } from "@/_states/window-size";

const progress = map<{
  percentage: number;
  track: number;
}>({
  percentage: 0,
  track: 0,
});

export const useScrollbarProgress = (
  callback: (payload: { percentage: number; track: number }) => void = noop
) => {
  const [_wh, wh] = useWindowSize();

  const onProgressMutate = (value: number, offsetHeight: number) => {
    progress.set({
      percentage: (value / (offsetHeight - wh.value)) * 100,
      track: (value + wh.value) / offsetHeight,
    });
  };

  const unbind = progress.listen(({ percentage, track }) => {
    callback({
      percentage,
      track,
    });
  });

  useUnmount(() => {
    unbind();
  });

  return {
    onProgressMutate,
  } as const;
};
