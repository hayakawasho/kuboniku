import { defineComponent, useDomRef, useEvent } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext;

type Refs = {
  thumb: HTMLImageElement;
  title: HTMLElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: Props) {
    const { backCanvasContext } = context;

    const themeColor = el.dataset.color!;
    const { refs } = useDomRef<Refs>("thumb", "title");

    useEvent(el, "mouseenter", _e => {
      backCanvasContext.onChangeColorPalette(themeColor);
    });

    useEvent(el, "mouseleave", _e => {
      backCanvasContext.onChangeColorPalette(SITE_THEME_COLOR);
    });
  },
});
