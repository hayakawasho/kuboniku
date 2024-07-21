import Pool from "~/_foundation/pool";
import { GlObject } from "~/_gl/gl-object";
import { createTexture } from "~/_gl/texture";
import { Mesh, PlaneBufferGeometry, ShaderMaterial, Vector2 } from "~/_gl/three";

export class ImgPlane extends GlObject {
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
    const { width, height } = el.getBoundingClientRect();

    this.uniforms = {
      u_alpha: {
        value: 0.9,
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
      u_skewY: {
        value: 0,
      },
      u_mouse: {
        value: new Vector2(0, 0),
      },
      u_curviness: {
        value: 0,
      },
      u_ripple: {
        value: 0,
      },
      u_scaleProgress: {
        value: 0,
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

    const material = mat.clone() as ShaderMaterial;
    material.uniforms = this.uniforms;

    this.#mesh = new Mesh(geo, material);
    this.add(this.#mesh);
  }

  setSize = (newValues: Parameters<GlObject["setSize"]>[0]) => {
    super.setSize(newValues);
    this.#mesh.scale.set(this.cache.width, this.cache.height, 1);

    super.update({ ...newValues });
  };
}
