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
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";

export class Plane extends GlObject {
  #mesh;
  uniforms;

  constructor(el: HTMLElement) {
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
        value: 0.4,
      },
      u_image_size: {
        value: new Vector2(Number(el.dataset.w), Number(el.dataset.h)),
      },
      u_mesh_size: {
        value: new Vector2(width, height),
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

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: this.uniforms,
      transparent: true,
      alphaTest: 0.5,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);
    this.#mesh.renderOrder = this.order;
  }

  resize = (newValues: Parameters<GlObject["resize"]>[0]) => {
    super.resize(newValues);
    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };

  update = ({
    mouseOffsetX,
    mouseOffsetY,
    ...newValues
  }: {
    mouseOffsetX: number;
    mouseOffsetY: number;
  } & Parameters<GlObject["update"]>[0]) => {
    super.update(newValues);

    this.uniforms.u_mouse.value.x = lerp(this.uniforms.u_mouse.value.x, mouseOffsetX, 0.04);
    this.uniforms.u_mouse.value.y = lerp(this.uniforms.u_mouse.value.y, mouseOffsetY, 0.04);
  };
}
