import { defineComponent } from "lake";
import { noop } from "@/_foundation/utils";
import { useScrollTween } from "./use-scroll-tween";

export default defineComponent({
  name: "PageScroll",
  setup(content: HTMLElement, { anyHover }: { anyHover: boolean }) {
    const scrollContext = anyHover
      ? useScrollTween(content)
      : {
          pause: noop,
          reset: () => window.scrollTo(0, 0),
          resume: noop,
          scrollTop: () => window.scrollY,
        };

    return {
      ...scrollContext,
    };
  },
});
