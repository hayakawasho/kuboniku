import { defineComponent, useDomRef, useEvent } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { Tween } from "@/_foundation/tween";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext;

type Refs = {
  g: HTMLElement;
  thumbWrapper: HTMLElement;
  thumb: HTMLImageElement;
  title: HTMLElement;
  hgroup: HTMLElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: Props) {
    const { backCanvasContext } = context;

    const { refs } = useDomRef<Refs>("thumb", "title", "g", "hgroup", "thumbWrapper");

    const themeColor = el.dataset.color!;

    useEvent(el, "mouseenter", _e => {
      backCanvasContext.onChangeColorPalettes(themeColor, themeColor, "#000", "#000", 1.2);

      Tween.tween(refs.thumb, 1.1, "expo.out", {
        scale: 1.05,
      });
    });

    useEvent(el, "mouseleave", _e => {
      backCanvasContext.onChangeColorPalettes(
        SITE_THEME_COLOR,
        SITE_THEME_COLOR,
        "#000",
        "#000",
        1.2
      );
    });

    useEvent(el, "mousemove", e => {
      //
    });
  },
});
