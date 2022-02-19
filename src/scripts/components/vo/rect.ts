import { ValueObject } from './vo'

export class Rect extends ValueObject<{
  width: number
  height: number
  x: number
  y: number
}> {}
