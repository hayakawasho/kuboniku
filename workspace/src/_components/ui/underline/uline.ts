import { useDomRef } from "lake";
import { GlObject } from "~/_foundation/gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2, Color } from "~/_foundation/libs/three";
import { useWindowSize } from "~/_states/window-size";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

type Refs = {
  uline: HTMLElement;
};

export const useUnderline = () => {
  const { refs } = useDomRef<Refs>("uline");

  const scene = new GlObject(refs.uline);
  const uniforms = {
    uColor: {
      value: new Color("#fff"),
    },
    uMouse: {
      value: new Vector2(0, 0),
    },
    uProgress: {
      value: 0,
    },
    uTime: {
      value: 0,
    },
    uVelo: {
      value: 0,
    },
    uVeloM: {
      value: 1,
    },
  };

  const geo = new PlaneBufferGeometry(1, 1, 1, 1);
  const mat = new ShaderMaterial({
    fragmentShader,
    uniforms,
    vertexShader,
    depthTest: false,
  });

  useWindowSize(() => {
    scene.resize();
    mesh.scale.x = scene.cache.bounds.width;
    mesh.scale.y = scene.cache.bounds.height;
  });

  const mesh = new Mesh(geo, mat);
  mesh.scale.set(scene.cache.bounds.width, scene.cache.bounds.height, 1);
  scene.add(mesh);

  return {
    scene,
    uniforms,
  };
};
