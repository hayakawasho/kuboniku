import { defineComponent, useEvent, useDomRef } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { useElementSize } from "@/_foundation/hooks";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  eyecatch: HTMLElement;
  hgroup: HTMLElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: AppContext) {
    const { glContext } = context;
    const { refs } = useDomRef<Refs>("eyecatch", "hgroup");

    const themeColor = el.dataset.color!;

    useEvent(el, "mouseenter", (_e) => {
      glContext.onChangeColorPalette(themeColor);
    });

    useEvent(el, "mouseleave", (_e) => {
      glContext.onChangeColorPalette(SITE_THEME_COLOR);
    });

    useEvent(el, "mousemove", (_e) => {
      //
    });

    useElementSize(el, ({}) => {
      //
    });
  },
});
