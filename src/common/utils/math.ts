const lerp = (start: number, end: number, p: number) => {
  return start + (end - start) * p
}

const map = (
  val: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  if (val <= inputMin) return outputMin
  if (val >= inputMax) return outputMax

  const p = (outputMax - outputMin) / (inputMax - inputMin)

  return (val - inputMin) * p + outputMin
}

const norm = (val: number, min: number, max: number) => {
  return map(val, min, max, 0, 1)
}

const hypot = (n: number, m: number) => {
  return Math.sqrt(n * n + m * m)
}

const deg2rad = (n: number) => {
  return (n * Math.PI) / 180
}

const rad2deg = (n: number) => {
  return (180 * n) / Math.PI
}

export { lerp, map, norm, hypot, deg2rad, rad2deg }
