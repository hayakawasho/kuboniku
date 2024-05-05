import { useMount, useEvent } from "lake";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { Smooth } from "./smooth";

export const useScrollTween = (el: HTMLElement) => {
  const { pause, resume, scrollTop, ...smooth } = new Smooth();

  const vs = new VirtualScroll({
    firefoxMultiplier: 20,
    mouseMultiplier: 0.375,
    passive: false,
    preventTouch: true,
    touchMultiplier: 2,
    useKeyboard: false,
    useTouch: true,
  });

  const [_, windowHeight] = useWindowSizeContext();

  useElementSize(el, ({ height }) => {
    smooth.updateHeight(height, windowHeight.value);
  });

  vs.on(smooth.onVScroll);

  useEvent(window as any, "scroll", smooth.onNativeScroll, {
    passive: true,
  });

  useTick(payload => {
    smooth.tick(payload);
  });

  useMount(() => {
    resume();

    return () => {
      vs.off(smooth.onVScroll);
      vs.destroy();
      smooth.destroy();
    };
  });

  return {
    pause,
    resume,
    scrollTop,
  };
};
