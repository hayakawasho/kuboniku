import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { Tween } from "@/_foundation/tween";
import { useThree } from "@/_gl/use-three";
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
    const { history, once } = context;

    const { addChild, removeChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "canvas", "splash");
    const { addScene, removeScene } = useThree(refs.canvas, 1);

    const setGridSize = (aspect: number) => {
      return aspect >= 1.25 ? "large" : aspect >= 0.85 ? "middle" : "small";
    };

    const [ww, wh] = useWindowSizeContext(({ aspect }) => {
      refs.grid.dataset.col = setGridSize(aspect);
    });

    //------------------------------------------------------------------------------

    const onEnter = () => {
      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.2),
        Tween.tween(el, 0.55, "power3.out", {
          opacity: 1,
        })
      );
    };

    const onLeave = () => {
      Tween.tween(el, 0.55, "power3.out", {
        opacity: 0,
      });
    };

    useMount(() => {
      refs.grid.dataset.col = setGridSize(ww.value / wh.value);

      const gridProvides = {
        ...context,
        addScene,
        removeScene,
      };

      if (once) {
        cursorTypeMutators("loading");
        const [splashContext] = addChild(refs.splash, Splash, context);

        const done = async () => {
          const [gridContext] = addChild(refs.grid, Grid, gridProvides);
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
        const [gridContext] = addChild(refs.grid, Grid, gridProvides);
        gridContext.current.start();
        onEnter();
      } else {
        addChild(refs.grid, Grid, gridProvides);
      }

      return () => {
        if (history.value === "push") {
          onLeave();
        }
      };
    });
  },
});
