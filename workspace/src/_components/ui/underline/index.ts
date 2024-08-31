import { defineComponent, useMount, useEvent } from "lake";
import { Tween } from "~/_foundation/libs/tween";
import { useUnderline } from "./uline";
import type { AppContext } from "~/_foundation/types";

export default defineComponent({
  name: "Underline",
  setup(el: HTMLElement, context: AppContext) {
    const { frontCanvasContext } = context;

    const { scene, uniforms } = useUnderline();

    useEvent(el, "mouseenter", () => {
      Tween.tween(uniforms.uProgress, 0.95, "expo.out", {
        value: 1,
      });
    });

    useEvent(el, "mouseleave", () => {
      Tween.tween(uniforms.uProgress, 0.95, "expo.out", {
        value: 0,
      });
    });

    useMount(() => {
      frontCanvasContext.addScene(scene);

      return () => {
        frontCanvasContext.removeScene(scene);
      };
    });
  },
});
