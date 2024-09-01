import { defineComponent, useMount, useEvent } from "lake";
import { SITE_THEME_COLOR } from "~/_foundation/const";
import { useScrollSkew } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { useMousePosition } from "~/_states/mouse";
import { useWindowScroll } from "~/_states/window-scroll";
import { useWorkItem } from "./plane";
import type { PlaneBufferGeometry, ShaderMaterial } from "~/_foundation/libs/three";
import type { AppContext } from "~/_foundation/types";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
};

export default defineComponent({
  name: "WorkItem",
  setup(el: HTMLAnchorElement, context: Props) {
    const { once, history, geo, mat, scrollContext, backCanvasContext } = context;

    const themeColor = el.dataset.color as string;
    const initialY = scrollContext.scrollOffset();

    const state = {
      hover: false,
    };

    const { scene, uniforms, ...workItem } = useWorkItem(geo, mat);

    useScrollSkew(initialY, value => {
      uniforms.uSkewY.value = value * -0.015;
    });

    useWindowScroll(({ currentY }) => {
      scene.updatePosition(currentY);
    });

    useEvent(el, "mouseenter", () => {
      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000", 1.2);
      workItem.mouseenter();
    });

    useEvent(el, "mouseleave", () => {
      backCanvasContext.onChangeColorsPalette(SITE_THEME_COLOR, SITE_THEME_COLOR, "#000", "#000", 1.2);
      workItem.mouseleave();
    });

    useMousePosition(_coordinate => {
      workItem.mousemove();
    });

    useMount(() => {
      backCanvasContext.addScene(scene);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(uniforms.uAlpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(uniforms.uAlpha, 0.55, "power3.out", {
            value: 0.9,
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
