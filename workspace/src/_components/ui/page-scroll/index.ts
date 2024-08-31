import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { defineComponent, useSlot } from "lake";
import { useRoute } from "~/_states/route";
import { useScrollState as _ } from "~/_states/scroll";
import PageScroll from "./page-scroll";

{
  gsap.registerPlugin(ScrollToPlugin);
}

export default defineComponent({
  name: "PageScrollParent",
  setup(content: HTMLElement, context: { anyHover: boolean }) {
    const { addChild, removeChild: _ } = useSlot();

    useRoute(({ name }) => {
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
