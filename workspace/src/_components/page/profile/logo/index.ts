import { defineComponent, useMount } from "lake";
// import { useTick } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { useLogo } from "./plane";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext;

export default defineComponent({
  name: "Logo",
  setup(el: HTMLImageElement, context: Props) {
    const { once, history, backCanvasContext } = context;

    const { scene, uniforms } = useLogo(el);

    // useTick(({ deltaRatio }) => {
    //
    // });

    useMount(() => {
      backCanvasContext.addScene(scene);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(uniforms.uAlpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(uniforms.uAlpha, 0.55, "power3.out", {
            value: 1,
          })
        );
      }

      return () => {
        if (history.value !== "push") {
          backCanvasContext.removeScene(scene);
          return;
        }

        Tween.tween(uniforms.uAlpha, 0.55, "power3.out", {
          value: 0,
          onComplete: () => {
            backCanvasContext.removeScene(scene);
          },
        });
      };
    });
  },
});
