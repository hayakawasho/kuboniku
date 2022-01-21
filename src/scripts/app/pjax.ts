import Highway from '@dogstudio/highway'
import { PJAX_ENTER, PJAX_LEAVE } from '@/const'
import { gsap, emit } from '@/lib'
import { Utils } from '@/utils'

class Fade extends Highway.Transition {
  in = async ({ from, to, done }: any) => {
    from.remove()

    await Utils.nextTick()

    done()

    gsap.to(to, {
      ease: 'power1',
      duration: 0.35,
      autoAlpha: 1,
    })
  }

  out = ({ from, done }: any) => {
    gsap.to(from, {
      ease: 'power1',
      duration: 0.35,
      autoAlpha: 0,
      onComplete: () => done(),
    })
  }
}

const pjax = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

pjax.on('NAVIGATE_OUT', ({ from }: any) => {
  emit(PJAX_LEAVE, {
    from: from.view,
  })
})

pjax.on('NAVIGATE_IN', ({ to }: any) => {
  emit(PJAX_ENTER, {
    to: to.view,
  })
})

export { pjax }
