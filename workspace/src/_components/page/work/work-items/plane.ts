import { useDomRef } from "lake";
import { GlImage } from "~/_foundation/gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2, LinearFilter } from "~/_foundation/libs/three";
import { useWindowSize } from "~/_states/window-size";

type Refs = {
  plane: HTMLImageElement;
};

export const useWorkItem = (geo: PlaneBufferGeometry, mat: ShaderMaterial) => {
  const { refs } = useDomRef<Refs>("plane");

  const scene = new GlImage(refs.plane);
  const naturalWidth = Number(refs.plane.dataset.width);
  const naturalHeight = Number(refs.plane.dataset.height);

  const uniforms = {
    uAlpha: {
      value: 0.9,
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
    uSkewY: {
      value: 0,
    },
    uMouse: {
      value: new Vector2(0, 0),
    },
    uCurviness: {
      value: 0,
    },
    uRipple: {
      value: 0,
    },
    uScaleProgress: {
      value: 0,
    },
  };

  scene.loadTexture(refs.plane.dataset.src as string).then(texture => {
    texture.needsUpdate = true;
    texture.minFilter = LinearFilter;
    texture.generateMipmaps = false;

    uniforms.uTexture.value = texture;
  });

  const [windowW, windowH] = useWindowSize(({ windowSize }) => {
    scene.resize(windowSize.width, windowSize.height);
    mesh.scale.x = scene.cache.bounds.width;
    mesh.scale.y = scene.cache.bounds.height;
  });

  const material = mat.clone() as ShaderMaterial;
  const mesh = new Mesh(geo, material);
  mesh.scale.set(scene.cache.bounds.width, scene.cache.bounds.height, 1);

  scene.resize(windowW.value, windowH.value);
  scene.add(mesh);

  return {
    scene,
    uniforms,
  };
};
