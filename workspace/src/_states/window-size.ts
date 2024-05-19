import { ref, readonly, useUnmount } from "lake";
import { map } from "nanostores";
import { noop } from "@/_foundation/utils";
import type { Size } from "@/_foundation/type";

const viewport = map<Size>({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSizeContext = (
  callback: (payload: { aspect: number; windowWidth: number; windowHeight: number }) => void = noop
) => {
  const size = viewport.get();
  const ww = ref(size.width);
  const wh = ref(size.height);

  const unbind = viewport.listen(payload => {
    const aspect = payload.width / payload.height;

    callback({
      aspect,
      windowHeight: payload.height,
      windowWidth: payload.width,
    });

    ww.value = size.width;
    wh.value = size.height;
  });

  useUnmount(() => {
    unbind();
  });

  return [readonly(ww), readonly(wh)] as const;
};

export const windowSizeMutators = (update: Size) => viewport.set(update);
