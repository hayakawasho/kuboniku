import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useThree } from "@/_components/glworld/use-three";
import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";
import Grid from "./grid";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: "Home",
  setup(el, context: AppContext) {
    const { history, once } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "canvas");

    const setGridColSize = (aspect: number) => {
      return aspect >= 1.25 ? "large" : aspect >= 0.85 ? "middle" : "small";
    };

    const [ww, wh] = useWindowSizeContext(({ aspect }) => {
      refs.grid.dataset.col = setGridColSize(aspect);
    });

    refs.grid.dataset.col = setGridColSize(ww.value / wh.value);

    // const glContext = useThree(refs.canvas, Math.min(window.devicePixelRatio, 1.5));
    const glContext = useThree(refs.canvas, 1);

    addChild(refs.grid, Grid, {
      ...context,
      addScene: glContext.addScene,
      removeScene: glContext.removeScene,
    });

    useMount(() => {
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
        if (history.value === "pop") {
          return;
        }

        Tween.tween(el, 0.55, "power3.out", {
          opacity: 0,
        });
      };
    });
  },
});
