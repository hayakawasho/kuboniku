import { ref, readonly, useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";
import type { Size } from "@/_foundation/type";

const viewport = map<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSizeContext = (
  callback: (payload: { aspect: number; width: number; height: number }) => void = noop
) => {
  const { width, height } = viewport.get();
  const ww = ref(width);
  const wh = ref(height);

  const unbind = viewport.listen(payload => {
    const aspect = payload.width / payload.height;

    callback({
      aspect,
      height: payload.height,
      width: payload.width,
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
