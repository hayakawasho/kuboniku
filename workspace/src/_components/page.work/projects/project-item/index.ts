import { defineComponent, useMount, useDomRef, useEvent } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { useScrollSkew } from "@/_foundation/hooks";
import { norm } from "@/_foundation/math";
import { Tween } from "@/_foundation/tween";
import { useMousePos } from "@/_states/mouse";
import { useScrollPositionContext } from "@/_states/scroll-position";
import { useWindowSizeContext } from "@/_states/window-size";
import { ImgPlane } from "./plane";
import type { AppContext } from "@/_foundation/type";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";

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

    const state = {
      resizing: false,
      hovering: false,
      mousePos: [0, 0],
    };

    const cache = {
      posY: scrollContext.scrollTop(),
    };

    const themeColor = el.dataset.color!;
    const { refs } = useDomRef<Refs>("thumb");

    const imgPlane = new ImgPlane(refs.thumb, { geo, mat });

    useScrollPositionContext(({ currentY }) => {
      imgPlane.update({
        y: currentY,
        mouseX: state.mousePos[0],
        mouseY: state.mousePos[1],
      });
    });

    const [ww, wh] = useWindowSizeContext(({ windowHeight, windowWidth }) => {
      cache.posY = scrollContext.scrollTop();
      imgPlane.setSize({
        height: windowHeight,
        width: windowWidth,
        y: cache.posY,
      });
    });

    useScrollSkew(
      ({ value }) => {
        imgPlane.uniforms.u_skewY.value = value * -0.015;
      },
      {
        initialPos: scrollContext.scrollTop(),
      }
    );

    useEvent(el, "mouseenter", _e => {
      state.hovering = true;
      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000", 1.2);

      Tween.parallel(
        Tween.tween(imgPlane.uniforms.u_lightStrength, 1, "power2.out", {
          value: 1,
        })
      );
    });

    useEvent(el, "mouseleave", _e => {
      state.hovering = false;

      backCanvasContext.onChangeColorsPalette(
        SITE_THEME_COLOR,
        SITE_THEME_COLOR,
        "#000",
        "#000",
        1.2
      );

      Tween.parallel(
        Tween.tween(imgPlane.uniforms.u_lightStrength, 1, "power1.out", {
          value: 0,
        })
      );
    });

    useMousePos(payload => {
      if (!state.hovering) {
        return;
      }

      const { left, top, width, height } = imgPlane.cache;
      const x = -left;
      const y = -(top + cache.posY);
      const mouseX = norm(x + payload.x, 0, width);
      const mouseY = -norm(y + payload.y, 0, height) + 1;

      console.log({
        posY: cache.posY,
        top,
        y,
        mouseY,
      });

      state.mousePos = [mouseX, mouseY];
    });

    useMount(() => {
      imgPlane.setSize({
        height: wh.value,
        width: ww.value,
        y: scrollContext.scrollTop(),
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
