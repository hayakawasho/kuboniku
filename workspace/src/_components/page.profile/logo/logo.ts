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

export class Logo extends GlObject {
  #mesh;
  uniforms;

  constructor(el: HTMLElement) {
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
      u_texture: {
        value: texture,
      },
    };

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
      uniforms: this.uniforms,
      transparent: true,
      alphaTest: 0.5,
      depthTest: false,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);
    this.#mesh.renderOrder = this.order;
  }

  setSize = (newValues: Parameters<GlObject["setSize"]>[0]) => {
    super.setSize(newValues);
    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };
}
