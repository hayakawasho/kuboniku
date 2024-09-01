import { defineComponent } from "lake";
import { useWindowEvent } from "~/_foundation/hooks";
import { scrollStateYMutators, useScrollState as _ } from "~/_states/scroll";
import { useNativeScroll } from "./use-native-scroll";
import { useNativeScrollTween } from "./use-native-scroll-tween";

export default defineComponent({
  name: "PageScroll",
  setup(content: HTMLElement, { anyHover }: { anyHover: boolean }) {
    let timer = 0;

    useWindowEvent(
      "scroll",
      () => {
        clearTimeout(timer);

        scrollStateYMutators({ scrolling: true });

        timer = window.setTimeout(() => {
          scrollStateYMutators({ scrolling: false });
        }, 500);
      },
      {
        passive: true,
      }
    );

    const scrollContext = anyHover ? useNativeScrollTween(content) : useNativeScroll();

    return {
      ...scrollContext,
    } as const;
  },
});
