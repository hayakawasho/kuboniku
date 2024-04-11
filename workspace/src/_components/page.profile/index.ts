import { defineComponent, useMount, useDomRef, useSlot } from "lake";
import { Tween } from "@/_foundation/tween";
import Logo from "./logo";
import { useThree } from "@/_gl/use-three";
import { useMediaQueryContext } from "@/_states/mq";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  profileLogo: HTMLImageElement;
  profileLogoSp: HTMLImageElement;
  canvas: HTMLCanvasElement;
};

export default defineComponent({
  name: "Profile",
  setup(el: HTMLElement, context: AppContext) {
    const { once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("profileLogo", "profileLogoSp", "canvas");
    const { device } = useMediaQueryContext();

    const { addScene, removeScene } = useThree(refs.canvas, Math.min(window.devicePixelRatio, 1.5));

    const refLogo = {
      pc: refs.profileLogo,
      sp: refs.profileLogoSp,
    }[device];

    addChild(refLogo, Logo, {
      ...context,
      addScene,
      removeScene,
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
        if (history.value === "push") {
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 0,
          });
        }
      };
    });
  },
});
