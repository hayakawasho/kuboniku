import { GlObject } from "@/_gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2, Color } from "@/_gl/three";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";

export class Underline extends GlObject {
  #mesh;
  uniforms;

  constructor(el: HTMLElement) {
    super(el);

    this.uniforms = {
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
      fragmentShader: fragment,
      uniforms: this.uniforms,
      vertexShader: vertex,
      depthTest: false,
    });

    this.#mesh = new Mesh(geo, mat);
    this.add(this.#mesh);
  }

  setSize = (newValues: Parameters<GlObject["setSize"]>[0]) => {
    super.setSize(newValues);
    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);
  };
}
