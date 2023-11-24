import { defineComponent, useEvent, useDomRef, useMount, ref } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { Tween } from "@/_foundation/tween";
import { useScrollPosY } from "@/_states/scroll";
import { useWindowSize } from "@/_states/window-size";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  eyecatch: HTMLElement;
  eyecatchImg: HTMLImageElement;
  hgroup: HTMLElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: AppContext) {
    const { glContext } = context;
    const { refs } = useDomRef<Refs>("eyecatch", "eyecatchImg", "hgroup");

    const themeColor = el.dataset.color!;

    const getBounds = (rect: DOMRect, currentY: number) => {
      return {
        height: rect.height,
        offsetX: rect.left,
        offsetY: currentY + rect.top,
        width: rect.width,
      };
    };

    const [currentY] = useScrollPosY();

    const state = ref({
      ...getBounds(el.getBoundingClientRect(), currentY.value),
    });

    useWindowSize(() => {
      const bounds = el.getBoundingClientRect();

      state.value = {
        ...state.value,
        ...getBounds(bounds, currentY.value),
      };
    });

    useMount(() => {
      const bounds = el.getBoundingClientRect();

      state.value = {
        ...state.value,
        ...getBounds(bounds, 0),
      };
    });

    useEvent(el, "mouseenter", (_e) => {
      glContext.onChangeColorPalette(themeColor);
    });

    useEvent(el, "mouseleave", (_e) => {
      glContext.onChangeColorPalette(SITE_THEME_COLOR);

      Tween.parallel(
        Tween.tween([refs.eyecatchImg, refs.hgroup], 1.2, "expo.out", {
          x: 0,
          y: 0,
        })
      );
    });

    useEvent(el, "mousemove", (e) => {
      const { offsetX, offsetY, width, height } = state.value;

      const dx = e.pageX - offsetX;
      const dy = e.pageY - offsetY;
      const tx = dx - width * 0.5;
      const ty = dy - height * 0.5;

      Tween.parallel(
        Tween.tween(refs.eyecatchImg, 1.2, "expo.out", {
          x: tx / 20,
          y: ty / 20,
        }),
        Tween.tween(refs.hgroup, 1.2, "expo.out", {
          x: tx / 14,
          y: ty / 14,
          z: 0,
        })
      );
    });
  },
});
