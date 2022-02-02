export class Img {
  readonly src: string
  readonly width: number
  readonly height: number

  constructor({
    src,
    width,
    height,
  }: {
    src: string
    width: number
    height: number
  }) {
    this.src = src
    this.width = width
    this.height = height
  }
}
