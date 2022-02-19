import { ValueObject } from './vo'

export class Point extends ValueObject<{ x: number; y: number }> {
  set(x: number, y: number) {
    this.value.x = x
    this.value.y = y
  }

  copy(p: Point) {
    this.value.x = p.value.x
    this.value.y = p.value.y
  }
}
