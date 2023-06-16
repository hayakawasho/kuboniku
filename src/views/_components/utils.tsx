export const zeroPadding = (num: number, p = 2) => {
  return num.toString().padStart(p, '0')
}
