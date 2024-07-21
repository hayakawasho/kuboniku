import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import ScrollSkewContainer from "~/_components/ui/scroll-skew";
import { SITE_THEME_COLOR } from "~/_foundation/const";
import { Tween } from "~/_foundation/libs/tween";
import ProjectItems from "./projects";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  index: HTMLElement;
  h1: HTMLElement;
};

export default defineComponent({
  name: "Work",
  setup(el, context: AppContext) {
    const { once, history, backCanvasContext } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("index", "h1");

    addChild([refs.h1, refs.index], ScrollSkewContainer, context);
    addChild(refs.index, ProjectItems, context);

    //------------------------------------------------------------------------------

    useMount(() => {
      backCanvasContext.onChangeColorsPalette(SITE_THEME_COLOR, SITE_THEME_COLOR, "#000", "#000");

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
