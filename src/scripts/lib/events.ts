import mitt from 'mitt'
import {
  LOADING_PROGRESS,
  LOADING_DONE,
  LOADING_TIMEOUT,
  AFTER_PAGE_READY,
  PJAX_ENTER,
  PJAX_LEAVE,
} from '@/const'

type Events = {
  [LOADING_PROGRESS]: {
    progress: number
  }
  [LOADING_DONE]: {
    done: number
  }
  [LOADING_TIMEOUT]: {
    id: string
    timeout: number
  }
  [AFTER_PAGE_READY]: undefined
  [PJAX_LEAVE]: {
    from: HTMLElement
  }
  [PJAX_ENTER]: {
    to: HTMLElement
  }
}

const { on, off, emit } = mitt<Events>()

export { on, off, emit }
