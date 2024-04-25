import { Object3D } from "./three";
import type { Point, Size } from "@/_foundation/type";

export class GlObject extends Object3D {
  #pos: Point;

  constructor(protected el: HTMLElement) {
    super();

    this.#pos = {
      x: 0,
      y: 0,
    };
  }

  resize(size: Size) {
    const bounds = this.el.getBoundingClientRect();
    const { left, top, width, height } = bounds;

    const offsetX = left + width / 2 - size.width / 2;
    const offsetY = top + height / 2 - size.height / 2;

    this.#pos = {
      x: offsetX,
      y: offsetY,
    };

    this.position.x = offsetX;
    this.position.y = -offsetY;

    return bounds;
  }

  update(y = 0, x = 0) {
    this.position.x = x + this.#pos.x;
    this.position.y = y - this.#pos.y;
  }
}
