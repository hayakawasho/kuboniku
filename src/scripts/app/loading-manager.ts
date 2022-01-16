import type { IManifestProps } from './manifest'
import { EVENTS } from '@/const'
import { gsap, emit } from '@/lib'
import { Utils } from '@/utils'

const TIMEOUT = 4000
const state = {
  clock: 0,
  isTimeOuted: false,
  progress: {
    now: 0,
    before: 0,
  },
}

const handleProgress = (e: any) => {
  gsap.killTweensOf(state.progress)
  gsap.to(state.progress, {
    duration: 0.3,
    now: (e.progress as number) * 100,
    onUpdate: () => {
      if (state.progress.now <= state.progress.before) {
        return
      }

      const val = Math.round(state.progress.now)
      state.progress.before = val
      emit(EVENTS.LOADING_PROGRESS, { progress: val })
    },
  })
}

const handleFileLoaed = (e: any) => {
  const elapsedTime = Utils.checkElapsedTime(state.clock)

  if (elapsedTime > TIMEOUT && !state.isTimeOuted) {
    state.isTimeOuted = true

    // タイムアウト内（直後）で最後に読み込んだファイルID
    emit(EVENTS.LOADING_TIMEOUT, {
      id: e.item.id,
    })
  }
}

const handleComplete = async (e: any) => {
  if (state.isTimeOuted) {
    return
  }

  await Utils.wait(300) // progressのduration分待機
  emit(EVENTS.LOADING_END)

  e.target.removeEventListener('progress', handleProgress)
  e.target.removeEventListener('fileload', handleFileLoaed)
  e.target.removeEventListener('complete', handleComplete)
}

const loadQueue = new createjs.LoadQueue(true)
loadQueue.setMaxConnections(6)
loadQueue.addEventListener('progress', handleProgress)
loadQueue.addEventListener('fileload', handleFileLoaed)
loadQueue.addEventListener('complete', handleComplete)

class LoadingManager {
  loadStart(now: number, manifest: IManifestProps[]) {
    state.clock = now
    loadQueue.loadManifest(manifest)
  }

  callLoadedFile = <T>(id: string) => {
    return loadQueue.getResult(id) as T
  }
}

const loadingManager = new LoadingManager()
export { loadingManager }
