import { ValueObject } from './vo'

export class Img extends ValueObject<{
  src: string
  width: number
  height: number
}> {}
