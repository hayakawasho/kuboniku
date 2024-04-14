import { GlObject } from "@/_gl/gl-object";
import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
  Vector2,
} from "@/_gl/three";
import type { Size } from "@/_foundation/type";

export class Plane extends GlObject {
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    {
      currentY,
      device: _,
      geo,
      mat,
      windowWidth,
      windowHeight,
    }: {
      currentY: number;
      device: "pc" | "sp";
      geo: PlaneBufferGeometry;
      mat: ShaderMaterial;
      windowWidth: number;
      windowHeight: number;
    }
  ) {
    super(el);

    const imgSrc = el.dataset.src!;

    const loader = new TextureLoader();
    loader.crossOrigin = "anonymous";

    const texture = loader.load(imgSrc, texture => {
      texture.minFilter = LinearFilter;
      texture.generateMipmaps = false;
    });

    const { width, height } = el.getBoundingClientRect();

    this.uniforms = {
      u_alpha: {
        value: 1,
      },
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(width, height),
      },
      u_scale: {
        value: 1.0,
      },
      u_texture: {
        value: texture,
      },
      u_velo: {
        value: 0,
      },
    };

    const material = mat.clone() as ShaderMaterial;
    material.uniforms = this.uniforms;

    this.#mesh = new Mesh(geo, material);
    this.add(this.#mesh);

    this.resize({
      height: windowHeight,
      width: windowWidth,
    });

    this.updateY(currentY);
  }

  resize = (size: Size) => {
    const bounds = super.resize(size);
    this.#mesh.scale.set(bounds.width, bounds.height, 1);

    return bounds;
  };

  updateY = (current: number) => {
    super.updateY(current);
  };
}
