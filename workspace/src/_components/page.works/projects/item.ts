import { defineComponent, useMount, useDomRef, useEvent } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
import { useTick } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useScrollPosY } from "@/_states/scroll";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import type { AppContext, ParentScene } from "@/_foundation/type";

type Props = AppContext &
  ParentScene & {
    geo: PlaneBufferGeometry;
    mat: ShaderMaterial;
  };

type Refs = {
  thumb: HTMLImageElement;
  title: HTMLElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: Props) {
    const { geo, mat, backCanvasContext, addScene, removeScene } = context;

    const themeColor = el.dataset.color!;
    const state = {
      resizing: false,
      ty: 0,
    };

    const { refs } = useDomRef<Refs>("thumb", "title");
    const { device } = useMediaQueryContext();
    const [ww, wh] = useWindowSizeContext();

    useEvent(el, "mouseenter", _e => {
      backCanvasContext.onChangeColorPalette(themeColor);
    });

    useEvent(el, "mouseleave", _e => {
      backCanvasContext.onChangeColorPalette(SITE_THEME_COLOR);
    });

    const plane = new Plane(refs.thumb, {
      currentY: 0,
      device,
      geo,
      mat,
      windowSize: {
        height: wh.value,
        width: ww.value,
      },
    });

    useScrollPosY(({ currentY }) => {
      Tween.tween(state, 0.1, "expo.out", {
        onUpdate: () => {
          plane.updateY(state.ty);
        },
        ty: currentY,
      });
    });

    useWindowSizeContext(({ ww, wh }) => {
      state.resizing = true;
      plane.resize({
        height: wh,
        width: ww,
      });
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }
    });

    useMount(() => {
      addScene(plane);

      return () => {
        removeScene(plane);
      };
    });
  },
});
