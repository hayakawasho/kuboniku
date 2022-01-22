const defaults = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: [0],
}

const useIO = (cb: IntersectionObserverCallback, opts = defaults) => {
  const io = new IntersectionObserver(cb, opts)

  return {
    io,
  }
}

export { useIO }
