import { defineComponent, useMount, useDomRef, useEvent } from "lake";
import { Tween } from "~/_foundation/libs/tween";
import { useWindowSizeState } from "~/_states/window-size";
import { Underline } from "./uline";
import type { AppContext } from "~/_foundation/types";

type Refs = {
  uline: HTMLElement;
};

export default defineComponent({
  name: "Underline",
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext } = context;

    const { refs } = useDomRef<Refs>("uline");

    const uline = new Underline(refs.uline);

    useEvent(el, "mouseenter", () => {
      Tween.tween(uline.uniforms.uProgress, 0.95, "expo.out", {
        value: 1,
      });
    });

    useEvent(el, "mouseleave", () => {
      Tween.tween(uline.uniforms.uProgress, 0.95, "expo.out", {
        value: 0,
      });
    });

    const [ww, wh] = useWindowSizeState(({ windowHeight, windowWidth }) => {
      uline.setSize({
        height: windowHeight,
        width: windowWidth,
      });
    });

    useMount(() => {
      uline.setSize({
        height: wh.value,
        width: ww.value,
      });
      frontCanvasContext.addScene(uline);

      return () => {
        frontCanvasContext.removeScene(uline);
      };
    });
  },
});
