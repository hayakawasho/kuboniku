import { defineComponent, useEvent, useDomRef } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { useElementSize, useTick } from "@/_foundation/hooks";
import { useMousePos } from "@/_states/mouse";
import { useWindowSize } from "@/_states/window-size";
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

    const rect = el.getBoundingClientRect();

    const state = {
      resizing: false,
      active: false,
      rect,
      offsetX: 0,
      offsetY: 0,
    };

    useEvent(el, "mouseenter", (_e) => {
      state.active = true;
      glContext.onChangeColorPalette(themeColor);
    });

    useEvent(el, "mouseleave", (_e) => {
      glContext.onChangeColorPalette(SITE_THEME_COLOR);
      state.active = false;
    });

    const [x, y] = useMousePos();

    useWindowSize(() => {
      state.resizing = true;
      state.rect = el.getBoundingClientRect();
      state.resizing = false;
    });

    // useElementSize(el, ({ width, height }) => {});

    useTick(() => {
      if (!state.active || state.resizing) {
        return;
      }

      console.log(x.value, y.value);
    });
  },
});
