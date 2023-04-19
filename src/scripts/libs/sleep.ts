import { gsap } from 'gsap'

export const sleep = (time: number): Promise<void> => {
  return new Promise(resolve => {
    gsap.to(
      {
        val: 0,
      },
      {
        val: 1,
        duration: time,
        onComplete: resolve,
      }
    )
  })
}

export const nextTick = (): Promise<void> => {
  return new Promise(resolve => gsap.ticker.add(() => resolve(), true))
}
