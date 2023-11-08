import { defineComponent, useEvent } from "lake";
import { THEME_COLOR } from "@/_foundation/const";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: AppContext) {
    const { glContext } = context;
    // const { refs } = useDomRef();

    const color = el.dataset.color!;

    useEvent(el, "mouseenter", (_e) => {
      glContext.onChangeColorPalette(color);
    });

    useEvent(el, "mousemove", (_e) => {
      //
    });

    useEvent(el, "mouseleave", (_e) => {
      glContext.onChangeColorPalette(THEME_COLOR);
    });
  },
});
