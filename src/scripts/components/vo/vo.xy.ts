export class Xy {
  x!: number
  y!: number

  private constructor() {
    //
  }

  copy(value: { x: number; y: number }) {
    this.x = value.x
    this.y = value.y
  }

  static create() {
    return new Xy()
  }
}
