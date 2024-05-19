import { defineComponent, useMount } from "lake";
import { useTick, useScrollSkew } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext;

export default defineComponent({
  name: "Kv",
  setup(el: HTMLImageElement, context: Props) {
    const { once, history, scrollContext, frontCanvasContext } = context;

    const state = {
      resizing: false,
      hover: false,
      mouseOffsetPos: [0, 0],
    };

    const imgPlane = new Plane(el);

    const [ww, wh] = useWindowSizeContext(({ width, height }) => {
      state.resizing = true;

      imgPlane.resize({
        height,
        width,
        y: scrollContext.scrollTop(),
      });

      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }

      imgPlane.update({
        y: scrollContext.scrollTop(),
        mouseOffsetX: state.mouseOffsetPos[0],
        mouseOffsetY: state.mouseOffsetPos[1],
      });
    });

    useMount(() => {
      imgPlane.resize({
        height: wh.value,
        width: ww.value,
        y: scrollContext.scrollTop(),
      });
      frontCanvasContext.addScene(imgPlane);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(imgPlane.uniforms.u_alpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
            value: 1,
          })
        );
      }

      return () => {
        Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
          value: 0,
          onComplete: () => {
            frontCanvasContext.removeScene(imgPlane);
          },
        });
      };
    });
  },
});
