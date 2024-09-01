import { Object3D, Texture } from "~/_foundation/libs/three";
import { loadAsset } from "~/_foundation/load-asset";

class GlObject extends Object3D {
  #pos = {
    x: 0,
    y: 0,
  };
  cache: {
    bounds: DOMRect;
    centerX: number;
    centerY: number;
  };

  constructor(protected el: HTMLElement) {
    super();
    this.cache = this.setCache();
  }

  setCache = () => {
    const bounds = this.el.getBoundingClientRect();

    return {
      bounds,
      centerX: bounds.left + bounds.width * 0.5,
      centerY: bounds.top + bounds.height * 0.5,
    };
  };

  resize = (windowW: number, windowH: number) => {
    this.cache = this.setCache();
    const { centerX, centerY } = this.cache;

    this.#pos.x = centerX - windowW * 0.5;
    this.#pos.y = -(centerY - windowH * 0.5);

    this.position.x = this.#pos.x;
    this.position.y = this.#pos.y;
  };

  updatePosition = (current = 0) => {
    this.position.y = current + this.#pos.y;
  };
}

class GlImage extends GlObject {
  loadTexture = async (src: string) => {
    const result = await loadAsset<HTMLImageElement>(src);
    const texture = new Texture();
    texture.image = result;
    return texture;
  };
}

export { GlObject, GlImage };
