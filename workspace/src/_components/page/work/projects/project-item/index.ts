import { defineComponent, useMount, useDomRef, useEvent, ref } from "lake";
import { SITE_THEME_COLOR } from "~/_foundation/const";
import { useScrollSkew } from "~/_foundation/hooks";
import { Tween } from "~/_foundation/libs/tween";
import { norm } from "~/_foundation/math";
import { useMousePositionState } from "~/_states/mouse";
import { useScrollPositionState } from "~/_states/scroll-position";
import { useWindowSizeState } from "~/_states/window-size";
import { ImgPlane } from "./plane";
import type { AppContext } from "~/_foundation/types";
import type { PlaneBufferGeometry, ShaderMaterial } from "~/_gl/three";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
};

type Refs = {
  thumb: HTMLImageElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: Props) {
    const { once, history, geo, mat, scrollContext, backCanvasContext } = context;

    const themeColor = el.dataset.color!;
    const { refs } = useDomRef<Refs>("thumb");
    const isHover = ref(false);
    const cacheY = ref(scrollContext.scrollTop());

    const imgPlane = new ImgPlane(refs.thumb, { geo, mat });

    useScrollSkew(scrollContext.scrollTop(), ({ value }) => {
      imgPlane.uniforms.u_skewY.value = value * -0.015;
    });

    useScrollPositionState(({ currentY }) => {
      imgPlane.update({ y: currentY });
    });

    const [ww, wh] = useWindowSizeState(({ windowHeight, windowWidth }) => {
      cacheY.value = scrollContext.scrollTop();

      imgPlane.setSize({
        height: windowHeight,
        width: windowWidth,
        y: cacheY.value,
      });
    });

    useEvent(el, "mouseenter", _e => {
      isHover.value = true;

      Tween.kill(imgPlane.uniforms.u_curviness);
      Tween.tween(imgPlane.uniforms.u_curviness, 0.8, "expo.out", {
        value: 1,
      });
      // imgPlane.uniforms.u_scaleProgress.value = 0;
      // imgPlane.uniforms.u_ripple.value = 0;

      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000", 1.2);
    });

    useEvent(el, "mouseleave", _e => {
      isHover.value = false;

      backCanvasContext.onChangeColorsPalette(SITE_THEME_COLOR, SITE_THEME_COLOR, "#000", "#000", 1.2);

      Tween.tween(imgPlane.uniforms.u_curviness, 1.2, "expo.out", {
        value: 0,
      });
    });

    useMousePositionState(({ x: mousePosX, y: mousePosY }) => {
      if (!isHover.value) {
        return;
      }

      const { left, top, width, height } = imgPlane.cache;

      const x = -left;
      const y = -(top + cacheY.value);
      const mouseX = norm(x + mousePosX, 0, width);
      // const mouseY = -norm(y + payload.y, 0, height) + 1;
      const mouseY = norm(y + mousePosY, 0, height);

      Tween.tween(imgPlane.uniforms.u_mouse.value, 2.4, "expo.out", {
        x: mousePosX - ww.value / 2,
        y: -(y + scrollContext.scrollTop() + mousePosY),
      });

      // imgPlane.uniforms.ripple.value = 0;
      // imgPlane.uniforms.curviness.value = Math.pow(mouseX, mouseY);
      // imgPlane.uniforms.scaleProgress.value = -mouseY;
    });

    useMount(() => {
      imgPlane.setSize({
        height: wh.value,
        width: ww.value,
        y: cacheY.value,
      });
      backCanvasContext.addScene(imgPlane);

      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(imgPlane.uniforms.u_alpha, {
            value: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
            value: 0.9,
          })
        );
      }

      return () => {
        if (history.value !== "push") {
          backCanvasContext.removeScene(imgPlane);
          return;
        }

        Tween.tween(imgPlane.uniforms.u_alpha, 0.55, "power3.out", {
          value: 0,
          onComplete: () => {
            backCanvasContext.removeScene(imgPlane);
          },
        });
      };
    });
  },
});
