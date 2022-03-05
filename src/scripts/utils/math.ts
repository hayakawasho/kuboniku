export const mapRange = (
  val: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  if (val <= inputMin) {
    return outputMin
  }

  if (val >= inputMax) {
    return outputMax
  }

  const p = (outputMax - outputMin) / (inputMax - inputMin)
  return (val - inputMin) * p + outputMin
}

export const normalize = (val: number, min: number, max: number) => {
  return mapRange(val, min, max, 0, 1)
}

export class MathUtil {
  static lerp = (start: number, end: number, p: number) => {
    return start + (end - start) * p
  }

  static hypot = (n: number, m: number) => {
    return Math.sqrt(n * n + m * m)
  }

  static deg2rad = (n: number) => {
    return (n * Math.PI) / 180
  }

  static rad2deg = (n: number) => {
    return (180 * n) / Math.PI
  }
}
