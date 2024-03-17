import { defineComponent, useSlot, useDomRef, useMount } from "lake";
import { useWindowSizeContext } from "@/_states/window-size";
import Grid from "./grid";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  grid: HTMLElement;
};

export default defineComponent({
  name: "Home",
  setup(_el, context: AppContext) {
    const { history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("grid");

    const setGridColSize = (aspect: number) => {
      return aspect >= 1.2 ? "large" : aspect >= 0.85 ? "middle" : "small";
    };

    const [ww, wh] = useWindowSizeContext(({ aspect }) => {
      refs.grid.dataset.col = setGridColSize(aspect);
    });

    addChild(refs.grid, Grid, context);

    useMount(() => {
      refs.grid.dataset.col = setGridColSize(ww.value / wh.value);

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
