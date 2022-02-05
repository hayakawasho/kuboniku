export class ImgValue {
  readonly src: string
  readonly width: number
  readonly height: number

  private constructor({
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

  static create(src: string, width: number, height: number) {
    return new ImgValue({ src, width, height })
  }
}
