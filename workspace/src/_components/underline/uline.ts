import { GlObject } from "@/_gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2, Color } from "@/_gl/three";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";
import type { Size } from "@/_foundation/type";

export class Underline extends GlObject {
  #mesh;
  uniforms;

  constructor(
    el: HTMLElement,
    props: {
      currentY: number;
      windowWidth: number;
      windowHeight: number;
    }
  ) {
    super(el);

    this.uniforms = {
      uProgress: {
        value: 0,
      },
      uColor: {
        value: new Color("#fff"),
      },
      uTime: {
        value: 0,
      },
      uMouse: {
        value: new Vector2(0, 0),
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
    });

    this.#mesh = new Mesh(geo, mat);

    this.add(this.#mesh);

    this.resize({
      height: props.windowHeight,
      width: props.windowWidth,
    });
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
