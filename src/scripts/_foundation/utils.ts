export const zeroPadding = (num: number, p = 2) => {
  return num.toString().padStart(p, '0')
}

export const debounce = <T extends (...args: any[]) => unknown>(
  callback: T,
  delay = 250
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout

  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), delay)
  }
}

export const searchParamsToString = (q: Record<string, any>) => {
  const params = new URLSearchParams(q)
  return params.toString()
}
