import { defineComponent, useMount, useDomRef, useEvent } from "lake";
import { SITE_THEME_COLOR } from "@/_foundation/const";
// import { Tween } from "@/_foundation/tween";
import { useTick } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext, ParentScene } from "@/_foundation/type";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_gl/three";

type Props = AppContext &
  ParentScene & {
    geo: PlaneBufferGeometry;
    mat: ShaderMaterial;
  };

type Refs = {
  thumb: HTMLImageElement;
};

export default defineComponent({
  name: "ProjectItem",
  setup(el: HTMLElement, context: Props) {
    const { geo, mat, addScene, removeScene, scrollContext, backCanvasContext } = context;

    const state = {
      resizing: false,
    };

    const themeColor = el.dataset.color!;
    const { refs } = useDomRef<Refs>("thumb");

    const [windowWidth, windowHeight] = useWindowSizeContext();

    const plane = new Plane(refs.thumb, {
      currentY: scrollContext.scrollTop(),
      geo,
      mat,
      windowHeight: windowHeight.value,
      windowWidth: windowWidth.value,
    });

    useWindowSizeContext(({ ww, wh }) => {
      state.resizing = true;
      plane.resize({
        height: wh,
        width: ww,
        y: scrollContext.scrollTop(),
      });
      state.resizing = false;
    });

    useTick(() => {
      if (state.resizing) {
        return;
      }
      plane.update({ y: scrollContext.scrollTop() });
    });

    useEvent(el, "mouseenter", _e => {
      backCanvasContext.onChangeColorsPalette(themeColor, themeColor, "#000", "#000", 1.2);
    });

    useEvent(el, "mouseleave", _e => {
      backCanvasContext.onChangeColorsPalette(
        SITE_THEME_COLOR,
        SITE_THEME_COLOR,
        "#000",
        "#000",
        1.2
      );
    });

    useMount(() => {
      addScene(plane);

      return () => {
        removeScene(plane);
      };
    });
  },
});
