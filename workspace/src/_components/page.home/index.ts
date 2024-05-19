import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { SITE_THEME_COLOR, SITE_THEME_SECONDARY_COLOR } from "@/_foundation/const";
import { Tween } from "@/_foundation/tween";
import { cursorTypeMutators } from "@/_states/cusor";
import { useWindowSizeContext } from "@/_states/window-size";
import Grid from "./grid";
import Splash from "./splash";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
  canvas: HTMLCanvasElement;
  splash: HTMLElement;
};

export default defineComponent({
  name: "Home",
  setup(el, context: AppContext) {
    const { history, once, backCanvasContext } = context;

    const { addChild, removeChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "canvas", "splash");

    const setGridSize = (aspect: number) => {
      const gridSize = aspect >= 1.25 ? "large" : aspect >= 0.85 ? "middle" : "small";
      refs.grid.dataset.col = gridSize;
    };

    const [ww, wh] = useWindowSizeContext(({ aspect }) => {
      setGridSize(aspect);
    });

    //------------------------------------------------------------------------------

    useMount(() => {
      backCanvasContext.onChangeColorsPalette(
        SITE_THEME_COLOR,
        "#000",
        SITE_THEME_SECONDARY_COLOR,
        "#000"
      );
      setGridSize(ww.value / wh.value);

      if (once) {
        cursorTypeMutators("loading");
        const [splashContext] = addChild(refs.splash, Splash, context);

        const done = async () => {
          const [gridContext] = addChild(refs.grid, Grid, context);
          await splashContext.current.hideStart();
          gridContext.current.start();
          await splashContext.current.hideEnd();
          removeChild([splashContext]);
          cursorTypeMutators("default");
        };

        (async () => {
          await splashContext.current.start();
          done();
        })();
      } else if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(el, {
            opacity: 0,
          }),
          Tween.immediate(() => {
            const [gridContext] = addChild(refs.grid, Grid, context);
            gridContext.current.start();
          }),
          Tween.wait(0.2),
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 1,
          })
        );
      } else {
        addChild(refs.grid, Grid, context);
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
