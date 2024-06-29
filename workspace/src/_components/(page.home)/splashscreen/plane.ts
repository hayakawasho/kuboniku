import { GlObject } from "@/_gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2 } from "@/_gl/three";
import fragmentShader from "./fragment.frag";
import vertexShader from "./vertex.vert";

export class ImgPlane extends GlObject {
  #mesh;
  uniforms;

  constructor(el: HTMLElement) {
    super(el);

    this.uniforms = {
      u_alpha: {
        value: 1,
      },
      u_texture: {
        value: 0 as any,
      },
      u_image_size: {
        value: new Vector2(840, 1050),
      },
      u_mesh_size: {
        value: new Vector2(170, 226),
      },
      u_bend: {
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
      uniforms: this.uniforms,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);
  }

  setSize = (newValues: Parameters<GlObject["setSize"]>[0]) => {
    super.setSize(newValues);
    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };
}
