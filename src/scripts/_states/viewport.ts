import { map } from 'nanostores'
import type { Size } from '@/_foundation/const'

type WindowParams = Size

const { innerWidth, innerHeight } = window

export const viewport = map<WindowParams>({
  height: innerHeight,
  width: innerWidth,
})

export const viewportGetters = () => viewport.get()
export const viewportMutators = (update: WindowParams) => viewport.set(update)
