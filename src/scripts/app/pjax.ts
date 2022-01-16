import Highway from '@dogstudio/highway'
import { gsap } from '@/lib'
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

const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

export { H }
