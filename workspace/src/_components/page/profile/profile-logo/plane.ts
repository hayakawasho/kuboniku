import { GlImage } from "~/_foundation/gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2, LinearFilter } from "~/_foundation/libs/three";
import { useWindowSize } from "~/_states/window-size";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

export const useLogo = (el: HTMLElement) => {
  const scene = new GlImage(el);
  const naturalWidth = Number(el.dataset.width);
  const naturalHeight = Number(el.dataset.height);

  const uniforms = {
    uAlpha: {
      value: 1,
    },
    uImageSize: {
      value: new Vector2(naturalWidth, naturalHeight),
    },
    uMeshSize: {
      value: new Vector2(scene.cache.bounds.width, scene.cache.bounds.height),
    },
    uTexture: {
      value: 0 as any,
    },
  };

  scene.loadTexture(el.dataset.src as string).then(texture => {
    texture.needsUpdate = true;
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;

    uniforms.uTexture.value = texture;
  });

  const geo = new PlaneBufferGeometry(1, 1, 30, 30);
  const mat = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms,
    transparent: true,
    alphaTest: 0.5,
    depthTest: false,
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
