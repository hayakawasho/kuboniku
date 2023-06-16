import type { Mesh } from 'ogl'

type UpdateParams = {
  ww: number
  wh: number
  currentY: number
}

export class ImagePlane {
  #bounds = {
    height: 0,
    left: 0,
    offset: 0,
    top: 0,
    width: 0,
  }

  constructor(private _mesh: Mesh, private _img: HTMLElement, currentY = 0) {
    this.resize(currentY)
  }

  update = (update: UpdateParams) => {
    const moveY = -update.currentY + this.#bounds.offset

    this._mesh.scale.x = this.#bounds.width
    this._mesh.scale.y = this.#bounds.height

    const x = this.#bounds.left - update.ww * 0.5 + this.#bounds.width * 0.5
    const y = -moveY + update.wh * 0.5 - this.#bounds.height * 0.5

    this._mesh.position.set(x, y, this._mesh.position.z)
  }

  resize = (currentY: number) => {
    const { top, left, width, height } = this._img.getBoundingClientRect()

    this.#bounds = {
      height,
      left,
      offset: top + currentY,
      top,
      width,
    }
  }
}
