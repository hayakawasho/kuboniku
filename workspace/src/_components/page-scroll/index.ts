import { defineComponent } from "lake";
import { useScrollTween } from "./use-scroll-tween";

export default defineComponent({
  name: "PageScroll",
  setup(el: HTMLElement) {
    return useScrollTween(el);
  },
});
