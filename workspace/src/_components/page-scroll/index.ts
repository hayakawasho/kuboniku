import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { defineComponent, useSlot } from "lake";
import { useRouteContext } from "@/_states/route";
import { useScrollStateContext as _ } from "@/_states/scroll";
import PageScroll from "./page-scroll";

{
  gsap.registerPlugin(ScrollToPlugin);
}

export default defineComponent({
  name: "ScrollController",
  setup(content: HTMLElement, context: { anyHover: boolean }) {
    const { addChild, removeChild: _ } = useSlot();

    useRouteContext(({ name }) => {
      switch (name) {
        case "home":
        case "profile":
        case "error":
          scrollContext.current.pause();
          break;
        default:
          scrollContext.current.resume();
          break;
      }
    });

    const [scrollContext] = addChild(content, PageScroll, context);

    return {
      ...scrollContext.current,
    } as const;
  },
});
