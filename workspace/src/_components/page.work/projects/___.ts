import { defineComponent, useEvent, useDomRef } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
// import { useHit } from "@/_foundation/hooks";
import { splitTextNode2Words } from "@/_foundation/split-text";
import { Tween } from "@/_foundation/tween";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  thumb: HTMLImageElement;
  heading: HTMLElement;
  text: HTMLElement;
  hoverText: HTMLElement;
};

export default defineComponent({
  name: "Project",
  setup(el: HTMLElement, context: AppContext) {
    const { backCanvasContext } = context;

    const { refs } = useDomRef<Refs>("thumb", "heading", "text", "hoverText");

    const themeColor = el.dataset.color!;

    const { split: splittedText } = splitTextNode2Words(refs.text, {
      types: "chars",
    });

    const { split: splittedHoverText } = splitTextNode2Words(refs.hoverText, {
      types: "chars",
    });

    Tween.prop(splittedHoverText.chars, {
      opacity: 0,
    });

    useEvent(el, "mouseenter", _e => {
      backCanvasContext.onChangeColorPalette(themeColor);

      // Tween.parallel(
      //   Tween.tween(splittedText.chars, 0.4, "power3.inOut", {
      //     scaleX: 0,
      //     opacity: 0,
      //     x: "50%",
      //     stagger: 0.035,
      //   }),
      //   Tween.serial(
      //     Tween.wait(0.1),
      //     Tween.parallel(
      //       Tween.tween(splittedHoverText.chars, 0.4, "power3.inOut", {
      //         scaleX: 1,
      //         opacity: 1,
      //         stagger: 0.035,
      //       }),
      //       Tween.tween(refs.hoverText, 0.6, "power3.inOut", {
      //         x: "8%",
      //       })
      //     )
      //   )
      // );
    });

    useEvent(el, "mouseleave", _e => {
      backCanvasContext.onChangeColorPalette(SITE_THEME_COLOR);

      // Tween.parallel(
      //   Tween.serial(
      //     Tween.parallel(
      //       Tween.tween(splittedHoverText.chars, 0.6, "power3.out", {
      //         scaleX: 0,
      //         opacity: 0,
      //         stagger: 0.03,
      //       }),
      //       Tween.tween(refs.hoverText, 0.8, "power3.out", {
      //         x: "0%",
      //       })
      //     ),
      //     Tween.wait(0.1)
      //   ),
      //   Tween.tween(splittedText.chars, 0.6, "power3.out", {
      //     scaleX: 1,
      //     opacity: 1,
      //     x: "0%",
      //     stagger: 0.03,
      //   })
      // );
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
