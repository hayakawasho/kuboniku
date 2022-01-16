import mitt from 'mitt'
import type { Handler, EventType } from 'mitt'

const events = new Map()
const { on, off, emit } = mitt(events)

const once = (name: EventType, callback: Handler) => {
  const _once = () => {
    off(name, _once)
    callback(name)
  }

  return on(name, _once)
}

export { events, on, off, emit, once }
