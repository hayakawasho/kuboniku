import { map } from 'nanostores'
import type { Size } from '@/const'

type WindowParams = Size

const { innerWidth, innerHeight } = window

export const viewport = map<WindowParams>({
  width: innerWidth,
  height: innerHeight,
})

export const viewportGetters = () => viewport.get()
export const viewportMutators = (update: WindowParams) => viewport.set(update)
