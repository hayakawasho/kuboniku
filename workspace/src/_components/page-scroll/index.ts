import { defineComponent } from "lake";
import { useScrollTween } from "./use-scroll-tween";
import { useMediaQueryContext } from "@/_states/mq";
import { noop } from "@/_foundation/utils";

export default defineComponent({
  name: "PageScroll",
  setup(content: HTMLElement) {
    const { anyHover } = useMediaQueryContext();

    const scrollContext = anyHover
      ? useScrollTween(content)
      : {
          pause: noop,
          resume: noop,
          scrollTop: () => window.scrollY,
        };

    return {
      ...scrollContext,
    };
  },
});
