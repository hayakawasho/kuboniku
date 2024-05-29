import { defineComponent } from "lake";
import { noop } from "@/_foundation/utils";
import { useScrollTween } from "./use-scroll-tween";
import { useTick } from "@/_foundation/hooks";
import { scrollPositionMutators } from "@/_states/scroll-position";

export default defineComponent({
  name: "PageScroll",
  setup(content: HTMLElement, { anyHover }: { anyHover: boolean }) {
    const anyDevice = {
      pause: noop,
      reset: () => window.scrollTo(0, 0),
      resume: noop,
      scrollTop: () => window.scrollY,
    };

    useTick(() => {
      if (anyHover) {
        return;
      }
      scrollPositionMutators(anyDevice.scrollTop());
    });

    const scrollContext = anyHover ? useScrollTween(content) : anyDevice;

    return {
      ...scrollContext,
    };
  },
});
