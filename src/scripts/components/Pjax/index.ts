import Highway from '@dogstudio/highway'
import { PJAX_ENTER, PJAX_LEAVE } from '@/const'
import { TWEEN, EASE, eventbus, onCleanup } from '@/foundation'

class Fade extends Highway.Transition {
  in({ from, to, done }: any) {
    from.remove()
    done()

    TWEEN.tween(to, 0.35, EASE._2_QuadOut).opacity(1).play()
  }

  out({ from, done }: any) {
    TWEEN.tween(from, 0.35, EASE._2_QuadOut)
      .opacity(0)
      .onComplete(() => {
        done()
        onCleanup()
      })
      .play()
  }
}

const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

H.on('NAVIGATE_OUT', ({ from }: any) => {
  eventbus.emit(PJAX_LEAVE, {
    from: from.view,
  })
})

H.on('NAVIGATE_IN', ({ to }: any) => {
  eventbus.emit(PJAX_ENTER, {
    to: to.view,
  })
})

export { H }
