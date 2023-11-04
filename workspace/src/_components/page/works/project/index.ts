import { defineComponent, useEvent } from "lake";
import { THEME_COLOR } from "@/_foundation/const";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "Project",
  setup(el: HTMLElement, context: AppContext) {
    const { glContext, mq } = context;
    // const { refs } = useDomRef();

    if (mq.value === "sp") {
      return;
    }

    const color = el.dataset.color!;

    useEvent(el, "mouseenter", (_e) => {
      glContext.onChangeColorPalette(color);
    });

    useEvent(el, "mouseleave", (_e) => {
      glContext.onChangeColorPalette(THEME_COLOR);
    });
  },
});
