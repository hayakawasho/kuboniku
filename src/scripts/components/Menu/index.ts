import { defineComponent, withSvelte, useDOMRef } from 'lake'
import { enablePageScroll, disablePageScroll } from 'scroll-lock'
import MenuTrigger from './MenuTrigger.svelte'
import { TWEEN, EASE } from '@/foundation'

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

    const onOpen = () => {
      el.classList.add('is-menuOpen')
      disablePageScroll()

      TWEEN.serial(
        TWEEN.parallel(
          TWEEN.tween(refs.menuTrigger, 0.8, EASE._3_CubicInOut).rotation(180),
          TWEEN.tween(refs.burgerTopLine, 0.8, EASE._3_CubicInOut).y(2.5),
          TWEEN.tween(refs.burgerBottomLine, 0.8, EASE._3_CubicInOut).scaleX(0)
        )
      ).play()
    }

    const onClose = () => {
      TWEEN.serial(
        TWEEN.parallel(
          TWEEN.tween(refs.menuTrigger, 0.8, EASE._3_CubicInOut).rotation(360),
          TWEEN.tween(refs.burgerTopLine, 0.8, EASE._3_CubicInOut).y(0),
          TWEEN.tween(refs.burgerBottomLine, 0.8, EASE._3_CubicInOut).scaleX(32 / 40)
        )
      )
        .onComplete(() => {
          el.classList.remove('is-menuOpen')
          enablePageScroll()
        })
        .play()
    }

    return {
      onOpen,
      onClose,
    }
  },
})
