import { defineComponent, useMount, useDomRef } from "lake";
import { useTick } from "@/_foundation/hooks";
// import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import type { AppContext } from "@/_foundation/type";
import type { Object3D, Scene } from "@/_foundation/three";
import type { useInfiniteScroll } from "../use-infinite-scroll";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
  addScene: (child: Object3D) => Scene;
  removeScene: (child: Object3D) => Scene;
  infiniteScrollContext: ReturnType<typeof useInfiniteScroll>;
};

type Refs = {
  plane: HTMLImageElement;
};

export default defineComponent({
  name: "GridItem",
  setup(el: HTMLElement, context: Props) {
    const { geo, mat, addScene, removeScene, infiniteScrollContext } = context;
    const { posY, diff } = infiniteScrollContext;

    const state = {
      resizing: false,
    };

    const { refs } = useDomRef<Refs>("plane");

    const { device } = useMediaQueryContext();
    const [ww, wh] = useWindowSizeContext();

    const plane = new Plane(refs.plane, {
      currentY: 0,
      device,
      geo,
      mat,
      windowSize: {
        height: wh.value,
        width: ww.value,
      },
    });

    useWindowSizeContext(({ ww, wh }) => {
      state.resizing = true;

      plane.resize({
        height: wh,
        width: ww,
      });

      state.resizing = false;
    });

    const SPEED = Number(refs.plane.dataset.speed);

    useTick(() => {
      if (state.resizing) {
        return;
      }

      const y = infiniteScrollContext.wrap(posY.value * SPEED);

      plane.updateY(y);
      plane.uniforms.u_velo.value =
        diff.value *
        {
          pc: 0.0025,
          sp: 0.005,
        }[device] *
        SPEED;

      el.style.transform = `translateY(${-y}px) translateZ(0)`;
    });

    useMount(() => {
      addScene(plane);

      return () => {
        removeScene(plane);
      };
    });
  },
});
