import { defineComponent, useEvent } from "lake";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "Project",
  setup(el: HTMLElement, context: AppContext) {
    const { glContext } = context;

    // const { refs } = useDomRef();

    const colorPallete = el.dataset.color!;

    useEvent(el, "mouseenter", (_e) => {
      glContext.onChangeColorPallete(colorPallete);
    });
  },
});
