import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { defineComponent } from "lake";
import { useRoute } from "~/_states/route";
import { useScrollState as _ } from "~/_states/scroll";
import { usePageScroll } from "./use-page-scroll";

{
  gsap.registerPlugin(ScrollToPlugin);
}

export default defineComponent({
  name: "PageScroll",
  setup(el: HTMLElement, { anyHover }: { anyHover: boolean }) {
    const scrollContext = usePageScroll({
      el,
      anyHover,
    });

    useRoute(({ name }) => {
      switch (name) {
        case "home":
        case "profile":
        case "error":
          scrollContext.pause();
          break;
        default:
          scrollContext.resume();
          break;
      }
    });

    return scrollContext;
  },
});
