export { gsap } from 'https://cdn.skypack.dev/pin/gsap@v3.9.0-V6xusepdSv0ZKWTqA3ie/mode=imports,min/optimized/gsap.js'

class Anime {
  tween(target: gsap.TweenTarget, to: gsap.TweenVars) {
    return gsap.to(target, to)
  }

  set(target: gsap.TweenTarget, to: gsap.TweenVars) {
    return gsap.set(target, to)
  }

  kill(target: gsap.TweenTarget) {
    gsap.killTweensOf(target)
  }

  serial(...args: gsap.core.TimelineChild[]) {
    const tl = gsap.timeline()
    args.forEach(i => tl.add(i))
    return tl
  }

  parallel(...args: any[]) {
    return gsap.timeline().add(args)
  }
}

const anime = new Anime()

export { anime }
