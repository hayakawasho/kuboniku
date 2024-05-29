import { GlObject } from "@/_gl/gl-object";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2 } from "@/_gl/three";
import { createTexture } from "@/_gl/texture";
import Pool from "@/_states/pool";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";

export class LogoPlane extends GlObject {
  #mesh;
  uniforms;

  constructor(el: HTMLElement) {
    super(el);

    const imgSrc = el.dataset.src!;
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
        value: 0 as any,
      },
    };

    const tex = createTexture();
    const checkLoaded = Pool.pop<HTMLImageElement>(imgSrc);

    if (checkLoaded) {
      tex.image = checkLoaded;
      this.uniforms.u_texture.value = tex;
    } else {
      Pool.loadFile(imgSrc).then(result => {
        tex.image = result;
        this.uniforms.u_texture.value = tex;
      });
    }

    const geo = new PlaneBufferGeometry(1, 1, 30, 30);
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
