import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useWindowSizeContext } from "@/_states/window-size";
import Grid from "./grid";
import { useThree } from "../glworld/use-three";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: "Home",
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid", "canvas");

    const frontCanvasContext = useThree(refs.canvas, Math.min(window.devicePixelRatio, 1.5));

    const setGridColSize = (aspect: number) => {
      return aspect >= 1.25 ? "large" : aspect >= 0.85 ? "middle" : "small";
    };

    const [ww, wh] = useWindowSizeContext(({ aspect }) => {
      refs.grid.dataset.col = setGridColSize(aspect);
    });

    refs.grid.dataset.col = setGridColSize(ww.value / wh.value);

    addChild(refs.grid, Grid, {
      ...context,
      addScene: frontCanvasContext.addScene,
      removeScene: frontCanvasContext.removeScene,
    });

    useMount(() => {
      if (history.value === "push") {
        //
      }

      return async () => {
        if (history.value === "pop") {
          return;
        }
      };
    });
  },
});
