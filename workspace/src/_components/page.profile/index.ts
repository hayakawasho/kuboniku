import { defineComponent, useMount, useDomRef, useSlot } from "lake";
import { SITE_THEME_COLOR, SITE_THEME_SECONDARY_COLOR } from "@/_foundation/const";
import { Tween } from "@/_foundation/tween";
import { useThree } from "@/_gl/use-three";
import { useMediaQueryContext } from "@/_states/mq";
import Logo from "./logo";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  profileLogo: HTMLImageElement;
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: "Profile",
  setup(el: HTMLElement, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("profileLogo", "canvas");
    const { device } = useMediaQueryContext();

    if (device === "pc") {
      const { addScene, removeScene } = useThree(
        refs.canvas,
        Math.min(window.devicePixelRatio, 1.5)
      );

      addChild(refs.profileLogo, Logo, {
        ...context,
        addScene,
        removeScene,
      });
    }

    //------------------------------------------------------------------------------

    useMount(() => {
      backCanvasContext.onChangeColorsPalette(
        SITE_THEME_COLOR,
        "#000",
        SITE_THEME_SECONDARY_COLOR,
        "#000"
      );

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(el, {
            opacity: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 1,
          })
        );
      }

      return () => {
        if (history.value === "push") {
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 0,
          });
        }
      };
    });
  },
});
