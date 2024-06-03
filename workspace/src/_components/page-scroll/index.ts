import { defineComponent, useEvent, ref } from "lake";
import { noop } from "@/_foundation/utils";
import { useScrollTween } from "./use-scroll-tween";
import { useTick } from "@/_foundation/hooks";
import { scrollPositionMutators } from "@/_states/scroll-position";
import { scrollStateYMutators, useScrollStateContext as _ } from "@/_states/scroll";

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

    const timer = ref(0);

    useEvent(
      window as any,
      "scroll",
      () => {
        clearTimeout(timer.value);

        scrollStateYMutators({ scrolling: true });

        timer.value = window.setTimeout(() => {
          scrollStateYMutators({ scrolling: false });
        }, 500);
      },
      {
        passive: true,
      }
    );

    const scrollContext = anyHover ? useScrollTween(content) : anyDevice;

    return {
      ...scrollContext,
    };
  },
});
