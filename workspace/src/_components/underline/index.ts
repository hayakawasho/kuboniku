import { defineComponent, useMount, useDomRef, useEvent } from "lake";
import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";
import { Underline } from "./uline";
import type { AppContext } from "@/_foundation/type";

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

    const [ww, wh] = useWindowSizeContext(({ windowHeight, windowWidth }) => {
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
