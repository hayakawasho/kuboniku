import { useMount, useEvent } from "lake";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { Smooth } from "./smooth";

export const useScrollTween = (el: HTMLElement) => {
  const { onResize, onNativeScroll, onVScroll, onRaf, destroy, ...smooth } = new Smooth();

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

  useElementSize(el, ({ height: contentH }) => {
    onResize(contentH, windowHeight.value);
  });

  vs.on(onVScroll);

  useEvent(window as any, "scroll", onNativeScroll, {
    passive: true,
  });

  useTick(onRaf);

  useMount(() => {
    smooth.resume();

    return () => {
      smooth.pause();
      vs.off(onVScroll);
      vs.destroy();
      destroy();
    };
  });

  return {
    ...smooth,
  };
};
