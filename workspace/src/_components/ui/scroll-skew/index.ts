import { defineComponent } from "lake";
import { useScrollSkew } from "~/_foundation/hooks";
import type { AppContext } from "~/_foundation/types";

export default defineComponent({
  name: "ScrollSkew",
  setup(el: HTMLElement, { scrollContext }: AppContext) {
    const initialY = scrollContext.scrollOffset();

    useScrollSkew(initialY, value => {
      el.style.transform = `skew(0, ${value}deg) translateZ(0)`;
    });
  },
});
