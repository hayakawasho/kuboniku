import { defineComponent, useMount } from "lake";
import { RepeatWrapping } from "three";
import { PlaneBufferGeometry, ShaderMaterial, Mesh, TextureLoader, LinearFilter } from "~/_foundation/libs/three";
import { useMediaQuery } from "~/_states/mq";
import { useWindowSize } from "~/_states/window-size";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { ParentScene } from "~/_foundation/types";

type Props = ParentScene & {
  dpr: number;
};

export default defineComponent({
  name: "RepeatNoise",
  setup(canvas: HTMLCanvasElement, context: Props) {
    const { addScene, removeScene, dpr } = context;

    const { device } = useMediaQuery();

    const noisePixelRatio = 0.5;
    const { pc, mob } = canvas.dataset;
    const texSrc = {
      pc: pc as string,
      sp: mob as string,
    }[device];

    const loader = new TextureLoader();
    const texture = loader.load(texSrc, tex => {
      tex.needsUpdate = true;
      tex.minFilter = LinearFilter;
      tex.generateMipmaps = false;
      tex.wrapS = tex.wrapT = RepeatWrapping;
    });

    const uniforms = {
      uRepeat: {
        value: {
          pc: (1100 / 198) * dpr,
          sp: (1100 / 128) * dpr,
        }[device],
      },
      uNoiseTex: {
        value: texture,
      },
      uAlpha: {
        value: 0.18,
      },
    };

    const [windowW, windowH] = useWindowSize(({ windowSize }) => {
      noisePlane.scale.x = windowSize.width * noisePixelRatio;
      noisePlane.scale.y = windowSize.height * noisePixelRatio;
    });

    const geo = new PlaneBufferGeometry(2, 2);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      uniforms,
      vertexShader: vertex,
      depthTest: false,
      transparent: true,
      alphaTest: 0.5,
    });

    const noisePlane = new Mesh(geo, mat);
    noisePlane.scale.set(windowW.value * noisePixelRatio, windowH.value * noisePixelRatio, 1);

    useMount(() => {
      addScene(noisePlane);

      return () => {
        removeScene(noisePlane);
      };
    });
  },
});
