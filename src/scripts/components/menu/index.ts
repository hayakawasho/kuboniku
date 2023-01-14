import { defineComponent, withSvelte, useDOMRef } from 'lake'
// import { enablePageScroll, disablePageScroll } from 'scroll-lock'
import MenuTrigger from './menu-trigger.svelte'
import { TWEEN, EASE } from '@/libs'

type Refs = {
  menuTrigger: HTMLButtonElement
  burgerTopLine: HTMLElement
  burgerBottomLine: HTMLElement
  menuBody: HTMLElement
  menuMask: HTMLElement
  menuBg: HTMLElement
  menuLabel: HTMLAnchorElement[]
}

export default defineComponent({
  components: {
    '.js-menu__onOff': withSvelte(MenuTrigger),
  },

  setup(el) {
    const { refs } = useDOMRef<Refs>(
      'menuTrigger',
      'burgerTopLine',
      'burgerBottomLine',
      'menuBody',
      'menuMask',
      'menuBg',
      'menuLabel'
    )

    return {
      onOpen: () => {
        // refs.menuBody.showModal()

        el.classList.add('is-menuOpen')

        TWEEN.serial(
          TWEEN.parallel(
            TWEEN.tween(refs.menuTrigger, 0.8, EASE.cubicInOut).rotation(180),
            TWEEN.tween(refs.burgerTopLine, 0.8, EASE.cubicInOut).y(2.5).willChange(),
            TWEEN.tween(refs.burgerBottomLine, 0.8, EASE.cubicInOut).scaleX(0).willChange()
          )
        ).play()
      },
      onClose: () => {
        TWEEN.serial(
          TWEEN.parallel(
            TWEEN.tween(refs.menuTrigger, 0.8, EASE.cubicInOut).rotation(360),
            TWEEN.tween(refs.burgerTopLine, 0.8, EASE.cubicInOut).y(0).willChange(),
            TWEEN.tween(refs.burgerBottomLine, 0.8, EASE.cubicInOut)
              .scaleX(32 / 40)
              .willChange()
          )
        )
          .onComplete(() => {
            el.classList.remove('is-menuOpen')

            // refs.menuBody.close()
          })
          .play()
      },
    }
  },
})
