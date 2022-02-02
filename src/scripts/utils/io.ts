const defaults = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 1],
}

const useIObserver = (opts = defaults) => {
  const handlers = new Set()
  const io = new IntersectionObserver(([_entry]) => {
    // handlers.forEach(i => )),
  }, opts)

  const observe = (el: HTMLElement, cb: () => unknown) => {
    const handler = {
      el,
      cb,
    }

    handlers.add(handler)
    io.observe(el)

    return {
      remove() {
        handlers.delete(handler)
        io.unobserve(el)
      },
    }
  }

  const destroy = () => {
    handlers.clear()
    io.disconnect()
  }

  return {
    observe,
    destroy,
  }
}

export { useIObserver }
