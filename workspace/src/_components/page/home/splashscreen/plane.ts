import { GlImage } from "~/_foundation/gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2 } from "~/_foundation/libs/three";
import { useWindowSize } from "~/_states/window-size";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

export const useSplashscreen = (el: HTMLElement) => {
  const scene = new GlImage(el);

  const uniforms = {
    uAlpha: {
      value: 1,
    },
    uTexture: {
      value: 0 as any,
    },
    uImageSize: {
      value: new Vector2(840, 1050),
    },
    uMeshSize: {
      value: new Vector2(170, 226),
    },
    uBend: {
      value: new Vector2(0, 0),
    },
  };

  const geo = new PlaneBufferGeometry(1, 1, 30, 30);
  const mat = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    transparent: true,
    alphaTest: 0.5,
    depthTest: false,
    uniforms,
  });

  const [windowW, windowH] = useWindowSize(({ windowSize }) => {
    scene.resize(windowSize.width, windowSize.height);
    mesh.scale.x = scene.cache.bounds.width;
    mesh.scale.y = scene.cache.bounds.height;
  });

  const mesh = new Mesh(geo, mat);
  mesh.scale.set(scene.cache.bounds.width, scene.cache.bounds.height, 1);

  scene.resize(windowW.value, windowH.value);
  scene.add(mesh);

  return {
    scene,
    uniforms,
  };
};
