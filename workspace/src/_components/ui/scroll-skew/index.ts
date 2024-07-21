import { defineComponent } from "lake";
import { useScrollSkew } from "~/_foundation/hooks";
import type { AppContext } from "~/_foundation/types";

export default defineComponent({
  name: "ScrollSkewContainer",
  setup(el: HTMLElement, { scrollContext }: AppContext) {
    useScrollSkew(scrollContext.scrollTop(), ({ value }) => {
      el.style.transform = `skew(0, ${value}deg) translateZ(0)`;
    });
  },
});
