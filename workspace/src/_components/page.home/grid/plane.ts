import { GlObject } from "@/_foundation/glsl/gl-object";
import {
  Mesh,
  PlaneBufferGeometry,
  ShaderMaterial,
  TextureLoader,
  LinearFilter,
  Vector2,
} from "@/_foundation/three";
import type { Size } from "@/_foundation/type";

const loader = new TextureLoader();
loader.crossOrigin = "anonymous";

export class Plane extends GlObject {
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    props: {
      currentY: number;
      device: "pc" | "sp";
      windowSize: Size;
      geo: PlaneBufferGeometry;
      mat: ShaderMaterial;
    }
  ) {
    super(el);

    const imgSrc = el.dataset.src!;

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

    const mat = props.mat.clone() as ShaderMaterial;
    mat.uniforms = this.uniforms;

    this.#mesh = new Mesh(props.geo, mat);
    this.add(this.#mesh);

    this.resize(props.windowSize);
    this.updateY(props.currentY);
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
