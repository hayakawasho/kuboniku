import { useMount, useEvent, defineComponent } from "lake";
import { clamp } from "remeda";
import VirtualScroll from "virtual-scroll";
import { useTick, useElementSize } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";
import { Smooth } from "./smooth";

export default defineComponent({
  name: "PageScroll",
  setup(content: HTMLElement) {
    const smooth = new Smooth();
    const vs = new VirtualScroll({
      mouseMultiplier: 0.45,
      touchMultiplier: 2.5,
      firefoxMultiplier: 90,
      passive: true,
      preventTouch: true,
      useKeyboard: false,
      useTouch: true,
    });

    const [_, windowHeight] = useWindowSizeContext();
    useElementSize(content, ({ height }) => {
      smooth.updateHeight(height, windowHeight.value);
    });

    vs.on(({ deltaY, originalEvent }) => {
      smooth.onVScroll(originalEvent as KeyboardEvent, { deltaY });
    });

    useEvent(window as any, "scroll", smooth.onNativeScroll, {
      passive: true,
    });

    useTick(() => {
      smooth.tick();
    });

    useMount(() => {
      smooth.resume();

      return () => {
        vs.destroy();
        smooth.destroy();
      };
    });

    return {
      //
    };
  },
});
