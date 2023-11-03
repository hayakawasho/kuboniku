import { getGPUTier } from "detect-gpu";
import { defineComponent, useDomRef } from "lake";
import { Bg } from "./bg-noise/core";
import { useTick } from "@/_foundation/hooks";
import { useWindowSize } from "@/_states/window-size";
import * as THREE from "three";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "GlWorld",
  setup(el: HTMLElement, { mq }: Pick<AppContext, "mq">) {
    const { refs } = useDomRef<{ canvas: HTMLCanvasElement }>("canvas");
    const { height, width } = el.getBoundingClientRect();

    const state = {
      resizing: false,
    };

    const renderer = new THREE.WebGLRenderer({
      // alpha: true,
      canvas: refs.canvas,
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    getGPUTier().then((result) => {
      if (result.tier === 1) {
        renderer.setPixelRatio(1);
      }
    });

    const FOV = 60;
    const calcCamDistance = (h: number) => {
      const vFov = (FOV * Math.PI) / 180;
      const fovRad = vFov * 0.5;
      return (h * 0.5) / Math.tan(fovRad);
    };

    const camera = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 2000);
    camera.position.z = calcCamDistance(height);

    const bg = new Bg(renderer, camera, {
      mq: mq.value,
    });

    const scene = new THREE.Scene();
    const addScene = (child: THREE.Mesh) => scene.add(child);
    const removeScene = (child: THREE.Mesh) => scene.remove(child);

    useTick(({ timestamp: _ }) => {
      if (state.resizing) {
        return;
      }

      renderer.render(scene, camera);
      bg.render();
    });

    useWindowSize(({ aspect, wh, ww }) => {
      state.resizing = true;

      renderer.setSize(ww, wh);

      camera.aspect = aspect;
      camera.position.z = calcCamDistance(wh);
      camera.updateProjectionMatrix();

      bg.resize();

      state.resizing = false;
    });

    return {
      addScene,
      removeScene,
    };
  },
});
