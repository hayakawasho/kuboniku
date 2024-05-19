import { lerp } from "@/_foundation/math";
import { GlObject } from "@/_gl/gl-object";
import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
  Vector2,
} from "@/_gl/three";

export class Plane extends GlObject {
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    {
      geo,
      mat,
    }: {
      geo: PlaneBufferGeometry;
      mat: ShaderMaterial;
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
      u_skewY: {
        value: 0,
      },
      u_mouse: {
        value: new Vector2(0, 0),
      },
      u_lightStrength: {
        value: 0,
      },
    };

    const material = mat.clone() as ShaderMaterial;
    material.uniforms = this.uniforms;

    this.#mesh = new Mesh(geo, material);
    this.add(this.#mesh);
    this.#mesh.renderOrder = this.order;
  }

  resize = (newValues: Parameters<GlObject["resize"]>[0]) => {
    super.resize(newValues);
    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };

  update = ({
    mouseX,
    mouseY,
    ...newValues
  }: {
    mouseX: number;
    mouseY: number;
  } & Parameters<GlObject["update"]>[0]) => {
    super.update(newValues);

    this.uniforms.u_mouse.value.x = lerp(this.uniforms.u_mouse.value.x, mouseX, 0.04);
    this.uniforms.u_mouse.value.y = lerp(this.uniforms.u_mouse.value.y, mouseY, 0.04);
  };
}
