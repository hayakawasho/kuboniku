import { ref, readonly, useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";
import type { Size } from "@/_foundation/type";

const viewport = map<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSize = (
  callback: (payload: { aspect: number; ww: number; wh: number }) => void = noop
) => {
  const { width, height } = viewport.get();
  const ww = ref(width);
  const wh = ref(height);

  const unbind = viewport.listen(({ width, height }) => {
    const aspect = width / height;

    callback({
      aspect,
      wh: height,
      ww: width,
    });

    ww.value = width;
    wh.value = height;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(ww), readonly(wh)] as const;
};

export const windowSizeMutators = (update: Size) => viewport.set(update);
