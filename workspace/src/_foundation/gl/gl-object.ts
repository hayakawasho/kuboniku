import { Group, Texture } from "~/_foundation/libs/three";
import Pool from "~/_foundation/pool";

class GlObject extends Group {
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
  loadTexture = (src: string) => {
    return new Promise<Texture>(resolve => {
      const texture = new Texture();
      const checkLoaded = Pool.pop<HTMLImageElement>(src);

      if (checkLoaded) {
        texture.image = checkLoaded;
        resolve(texture);
      } else {
        Pool.loadFile(src).then(result => {
          texture.image = result;
          resolve(texture);
        });
      }
    });
  };
}

export { GlObject, GlImage };
