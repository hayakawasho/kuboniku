import { defineComponent, useMount, useDomRef, useSlot } from "lake";
import { Tween } from "@/_foundation/tween";
import { useThree } from "@/_gl/use-three";
import { useMediaQueryContext } from "@/_states/mq";
import Logo from "./logo";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  profileLogo: HTMLImageElement;
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: "Profile",
  setup(el: HTMLElement, context: AppContext) {
    const { once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("profileLogo", "canvas");
    const { device } = useMediaQueryContext();

    if (device === "pc") {
      const { addScene, removeScene } = useThree(
        refs.canvas,
        Math.min(window.devicePixelRatio, 1.5)
      );

      addChild(refs.profileLogo, Logo, {
        ...context,
        addScene,
        removeScene,
      });
    }

    //------------------------------------------------------------------------------

    const onEnter = () => {
      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.2),
        Tween.tween(el, 0.55, "power3.out", {
          opacity: 1,
        })
      );
    };

    const onLeave = () => {
      Tween.tween(el, 0.55, "power3.out", {
        opacity: 0,
      });
    };

    useMount(() => {
      if (!once && history.value === "push") {
        onEnter();
      }

      return () => {
        if (history.value === "push") {
          onLeave();
        }
      };
    });
  },
});
