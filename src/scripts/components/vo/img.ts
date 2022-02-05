export class Img {
  readonly src: string
  readonly width: number
  readonly height: number

  private constructor(args: { src: string; width: number; height: number }) {
    this.src = args.src
    this.width = args.width
    this.height = args.height
  }

  static create(src: string, width: number, height: number) {
    return new Img({ src, width, height })
  }
}
