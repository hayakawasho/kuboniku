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
import type { Size } from "@/_foundation/type";

export class Logo extends GlObject {
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    {
      windowWidth,
      windowHeight,
    }: {
      windowWidth: number;
      windowHeight: number;
    }
  ) {
    super(el);

    const imgSrc = el.dataset.src!;

    const loader = new TextureLoader();
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

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fragmentShader: fragment,
      transparent: true,
      uniforms: this.uniforms,
      vertexShader: vertex,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);

    this.resize({
      height: windowHeight,
      width: windowWidth,
    });
  }

  resize = (size: Size) => {
    const bounds = super.resize(size);
    this.#mesh.scale.set(bounds.width, bounds.height, 1);

    return bounds;
  };
}
