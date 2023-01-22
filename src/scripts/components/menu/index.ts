import { defineComponent, withSvelte, useDOMRef, useEvent } from 'lake'
import MenuTrigger from './menu-trigger.svelte'
import { TWEEN, EASE, nextTick } from '@/libs'

type Refs = {
  menuTrigger: HTMLButtonElement
  burgerTL: HTMLElement
  burgerBL: HTMLElement
  menuBody: HTMLElement
  menuMask: HTMLElement
  menuBg: HTMLElement
  menuLabel: HTMLAnchorElement[]
}

const CLIP_PATH = {
  x1: 100,
  x2: 100,
}

export default defineComponent({
  components: {
    '#js-menu__onOff': withSvelte(MenuTrigger),
  },

  setup(el) {
    const { refs } = useDOMRef<Refs>(
      'menuTrigger',
      'burgerTL',
      'burgerBL',
      'menuBody',
      'menuMask',
      'menuBg',
      'menuLabel'
    )

    const updateMenuBg = () => {
      refs.menuBg.style.clipPath = `polygon(
        ${CLIP_PATH.x1}% 0px,
        100% 0px,
        100% 100vh,
        ${CLIP_PATH.x2}% 100vh
      )`
    }

    return {
      async onOpen() {
        el.classList.add('is-menuOpen', 'is-menuAnimating')

        await nextTick()

        TWEEN.serial(
          TWEEN.prop(refs.menuTrigger).pointerEvents(false),
          TWEEN.parallel(
            TWEEN.tween(refs.menuMask, 0.75).opacity(0.5),
            TWEEN.tween(refs.menuTrigger, 0.75, EASE.cubicInOut).rotation(180),
            TWEEN.tween(refs.burgerTL, 0.75, EASE.cubicInOut).y(2.5),
            TWEEN.tween(refs.burgerBL, 0.75, EASE.cubicInOut).scaleX(0),
            TWEEN.parallel(
              TWEEN.tween(refs.menuLabel, 0).rotation(-6).y('180%').opacity(1),
              TWEEN.lag(
                0.065,
                TWEEN.tween(refs.menuLabel, 0.75, EASE.cubicInOut).rotation(0).y('0%')
              )
            ),
            TWEEN.parallel(
              TWEEN.tween(CLIP_PATH, 0.85, EASE.cubicInOut, { x1: 0 }),
              TWEEN.tween(CLIP_PATH, 0.75, EASE.cubicInOut, { x2: 0 }).delay(0.1)
            ).onUpdate(updateMenuBg)
          ),
          TWEEN.prop(refs.menuTrigger).pointerEvents(true)
        )
          .onComplete(() => {
            el.classList.remove('is-menuAnimating')
          })
          .play()
      },
      async onClose() {
        el.classList.add('is-menuAnimating')

        await nextTick()

        TWEEN.serial(
          TWEEN.prop(refs.menuTrigger).pointerEvents(false),
          TWEEN.parallel(
            TWEEN.tween(refs.menuMask, 0.75).opacity(0),
            TWEEN.tween(refs.menuTrigger, 0.75, EASE.cubicInOut).rotation(360),
            TWEEN.tween(refs.burgerTL, 0.75, EASE.cubicInOut).y(0),
            TWEEN.tween(refs.burgerBL, 0.75, EASE.cubicInOut).scaleX(32 / 40),
            TWEEN.parallel(
              TWEEN.tween(refs.menuLabel, 0).rotation(0).y('0%'),
              TWEEN.lag(
                0.065,
                TWEEN.tween(refs.menuLabel, 0.65, EASE.cubicInOut).rotation(6).y('-180%')
              )
            ),
            TWEEN.parallel(
              TWEEN.tween(CLIP_PATH, 0.9, EASE.cubicInOut, { x1: 100 }),
              TWEEN.tween(CLIP_PATH, 0.75, EASE.cubicInOut, { x2: 100 }).delay(0.1)
            ).onUpdate(updateMenuBg)
          ),
          TWEEN.prop(refs.menuTrigger).pointerEvents(true)
        )
          .onComplete(() => {
            el.classList.remove('is-menuOpen', 'is-menuAnimating')
          })
          .play()
      },
    }
  },
})
