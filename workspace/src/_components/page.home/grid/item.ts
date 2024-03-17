import { defineComponent, useMount, useDomRef } from "lake";
// import { gsap } from "gsap";
import { useTick } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import type { AppContext } from "@/_foundation/type";

type Props = AppContext & {
  geo: PlaneBufferGeometry;
  mat: ShaderMaterial;
  addScene: any;
  removeScene: any;
};

type Refs = {
  plane: HTMLImageElement;
  // link: HTMLAnchorElement;
};

export default defineComponent({
  name: "GridItem",
  setup(_el: HTMLElement, context: Props) {
    const { geo, mat, addScene, removeScene } = context;

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

    useTick(() => {
      // const y = 0;
      // plane.updateY(y);
    });

    // WIP:
    const val = {
      y: 0,
    };

    const SPEED = Number(refs.plane.dataset.speed);

    Tween.tween(val, 40, "power2.out", {
      onUpdate: () => {
        plane.updateY(val.y * SPEED);
      },
      y: 2000,
    });

    useWindowSizeContext(({ ww, wh }) => {
      plane.resize({
        height: wh,
        width: ww,
      });
    });

    useMount(() => {
      addScene(plane);

      return () => {
        removeScene(plane);
      };
    });
  },
});
