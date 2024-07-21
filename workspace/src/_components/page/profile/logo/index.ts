import { defineComponent, useMount } from "lake";
import { useTick } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { useWindowSizeState } from "~/_states/window-size";
import { LogoPlane } from "./plane";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext;

export default defineComponent({
  name: "Logo",
  setup(el: HTMLImageElement, context: Props) {
    const { once, history, backCanvasContext } = context;

    const logoPlane = new LogoPlane(el);

    const [ww, wh] = useWindowSizeState(({ windowWidth, windowHeight }) => {
      logoPlane.setSize({
        height: windowHeight,
        width: windowWidth,
      });
    });

    useTick(({ deltaRatio }) => {
      //
    });

    useMount(() => {
      logoPlane.setSize({ height: wh.value, width: ww.value });
      backCanvasContext.addScene(logoPlane);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(logoPlane.uniforms.u_alpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(logoPlane.uniforms.u_alpha, 0.55, "power3.out", {
            value: 1,
          })
        );
      }

      return () => {
        if (history.value !== "push") {
          backCanvasContext.removeScene(logoPlane);
          return;
        }

        Tween.tween(logoPlane.uniforms.u_alpha, 0.55, "power3.out", {
          value: 0,
          onComplete: () => {
            backCanvasContext.removeScene(logoPlane);
          },
        });
      };
    });
  },
});
