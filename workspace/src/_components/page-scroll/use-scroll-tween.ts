import { useMount, useEvent } from "lake";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { scrollPositionMutators } from "@/_states/scroll-position";
import { Smooth } from "./smooth";

export const useScrollTween = (el: HTMLElement) => {
  const smooth = new Smooth();

  const [_, wh] = useWindowSizeContext();

  useElementSize(el, ({ height: contentH }) => {
    smooth.onResize(contentH, wh.value);
  });

  useEvent(window as any, "scroll", smooth.onNativeScroll, {
    passive: true,
  });

  useEvent(window as any, "wheel", smooth.onWheel, {
    passive: false,
  });

  useTick(({ deltaRatio, deltaTime }) => {
    smooth.raf({ deltaRatio, deltaTime });
  });

  useMount(() => {
    const onSmooth = ({ currentY }: { currentY: number }) => scrollPositionMutators(currentY);
    smooth.on(onSmooth);
    smooth.set(window.scrollY);
    smooth.resume();

    return () => {
      smooth.pause();
      smooth.off(onSmooth);
    };
  });

  return {
    ...smooth,
  };
};
