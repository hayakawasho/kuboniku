import { useMount, useEvent } from "lake";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { scrollPositionMutators } from "@/_states/scroll-position";
import { Smooth } from "./smooth";

export const useScrollTween = (el: HTMLElement) => {
  const { onResize, onNativeScroll, onVScroll, raf, ...smooth } = new Smooth();

  const [_, wh] = useWindowSizeContext();

  useElementSize(el, ({ height: contentH }) => {
    onResize(contentH, wh.value);
  });

  useEvent(window as any, "scroll", onNativeScroll, {
    passive: true,
  });

  useTick(({ deltaRatio, deltaTime }) => {
    raf({ deltaRatio, deltaTime });
  });

  useMount(() => {
    const vs = new VirtualScroll({
      firefoxMultiplier: 20,
      mouseMultiplier: 0.375,
      passive: false,
      preventTouch: true,
      touchMultiplier: 2,
      useKeyboard: false,
      useTouch: true,
    });

    vs.on(onVScroll);

    const onSmooth = ({ currentY }: { currentY: number }) => scrollPositionMutators(currentY);
    smooth.on(onSmooth);
    smooth.set(window.scrollY);
    smooth.resume();

    return () => {
      smooth.pause();
      smooth.off(onSmooth);
      vs.off(onVScroll);
      vs.destroy();
    };
  });

  return {
    ...smooth,
  };
};
