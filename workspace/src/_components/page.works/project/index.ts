import { defineComponent, useEvent, useDomRef } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
// import { useHit } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  eyecatchImg: HTMLImageElement;
  hgroup: HTMLElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: AppContext) {
    const { glContext } = context;
    const { refs } = useDomRef<Refs>("eyecatchImg", "hgroup");

    const themeColor = el.dataset.color!;

    useEvent(el, "mouseenter", _e => {
      glContext.onChangeColorPalette(themeColor);
    });

    useEvent(el, "mouseleave", _e => {
      glContext.onChangeColorPalette(SITE_THEME_COLOR);

      Tween.parallel(
        Tween.tween([refs.eyecatchImg, refs.hgroup], 1.2, "expo.out", {
          x: 0,
          y: 0,
        })
      );
    });

    // useHit(el, ({ tx, ty }) => {
    //   Tween.parallel(
    //     Tween.tween(refs.eyecatchImg, 1.2, "expo.out", {
    //       x: tx / 18,
    //       y: ty / 18,
    //     }),
    //     Tween.tween(refs.hgroup, 1.2, "expo.out", {
    //       x: tx / 14,
    //       y: ty / 14,
    //       z: 0,
    //     })
    //   );
    // });
  },
});
