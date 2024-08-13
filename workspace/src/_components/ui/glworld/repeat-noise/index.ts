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
    const loader = new TextureLoader();
    const textSrc = {
      pc: pc!,
      sp: mob!,
    };
    const texture = loader.load(textSrc[device], tex => {
      tex.needsUpdate = true;
      tex.minFilter = LinearFilter;
      tex.generateMipmaps = false;
      tex.wrapS = tex.wrapT = RepeatWrapping;
    });

    const repeatVal = {
      pc: (1100 / 198) * dpr,
      sp: (1100 / 128) * dpr,
    };
    const uniforms = {
      u_repeat: {
        value: repeatVal[device],
      },
      u_noiseTex: {
        value: texture,
      },
      u_alpha: {
        value: 0.18,
      },
    };

    const noisePlane = new Mesh(
      new PlaneBufferGeometry(2, 2),
      new ShaderMaterial({
        fragmentShader: fragment,
        uniforms,
        vertexShader: vertex,
        depthTest: false,
        transparent: true,
        alphaTest: 0.5,
      })
    );

    const [ww, wh] = useWindowSize(({ windowSize }) => {
      noisePlane.scale.x = windowSize.width * noisePixelRatio;
      noisePlane.scale.y = windowSize.height * noisePixelRatio;
    });

    useMount(() => {
      noisePlane.scale.set(ww.value * noisePixelRatio, wh.value * noisePixelRatio, 1);
      addScene(noisePlane);

      return () => {
        removeScene(noisePlane);
      };
    });
  },
});
