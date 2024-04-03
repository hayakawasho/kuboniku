import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { Tween } from "@/_foundation/tween";
import { sleep } from "@/_foundation/utils";
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

    const setGridColSize = (aspect: number) => {
      return aspect >= 1.25 ? "large" : aspect >= 0.85 ? "middle" : "small";
    };

    const [ww, wh] = useWindowSizeContext(({ aspect }) => {
      refs.grid.dataset.col = setGridColSize(aspect);
    });

    const { addScene, removeScene } = useThree(refs.canvas, 1);

    useMount(() => {
      refs.grid.dataset.col = setGridColSize(ww.value / wh.value);

      if (once) {
        cursorTypeMutators("loading");

        const [splashContext] = addChild(refs.splash, Splash, context);

        const done = async () => {
          const [_gridContext] = addChild(refs.grid, Grid, {
            ...context,
            addScene,
            removeScene,
          });
          await splashContext.current.done();
          removeChild([splashContext]);
          cursorTypeMutators("default");
        };

        (async () => {
          await splashContext.current.start();
          // await sleep(0.2);
          done();
        })();
      } else if (!once && history.value === "push") {
        const [_gridContext] = addChild(refs.grid, Grid, {
          ...context,
          addScene,
          removeScene,
        });

        Tween.serial(
          Tween.prop(el, {
            opacity: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 1,
          })
        );
      } else {
        addChild(refs.grid, Grid, {
          ...context,
          addScene,
          removeScene,
        });
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
