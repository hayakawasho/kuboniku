import { defineComponent, useMount, useDomRef, useSlot } from "lake";
import { SITE_THEME_COLOR, SITE_THEME_SECONDARY_COLOR } from "~/_foundation/const";
import { Tween } from "~/_foundation/libs/tween";
import { useMediaQuery } from "~/_states/mq";
import Logo from "./logo";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  profileLogo: HTMLImageElement;
};

export default defineComponent({
  name: "Profile",
  setup(el: HTMLElement, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("profileLogo");
    const { device } = useMediaQuery();

    if (device === "pc") {
      addChild(refs.profileLogo, Logo, context);
    }

    //------------------------------------------------------------------------------

    useMount(() => {
      backCanvasContext.onChangeColorsPalette(SITE_THEME_COLOR, "#000", SITE_THEME_SECONDARY_COLOR, "#000");

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
        if (history.value !== "push") {
          return;
        }

        Tween.tween(el, 0.55, "power3.out", {
          opacity: 0,
        });
      };
    });
  },
});
