<script lang="ts">
  import { TWEEN, EASE } from '@/foundation'
  import { getContext$, useEvent } from 'lake'
  import { enablePageScroll, disablePageScroll } from 'scroll-lock'

  type Refs = {
    menuTrigger: HTMLButtonElement
    burgerTopLine: HTMLElement
    burgerBottomLine: HTMLElement
    menuBody: HTMLElement
    menuMask: HTMLElement
    menuBg: HTMLElement
    menuLabel: HTMLAnchorElement[]
  }

  const { useDOMRef, rootRef } = getContext$()

  const { refs } = useDOMRef<Refs>(
    'menuTrigger',
    'burgerTopLine',
    'burgerBottomLine',
    'menuBody',
    'menuMask',
    'menuBg',
    'menuLabel'
  )

  let isOpen: boolean | undefined // 初期描画しないように初期値はundefinedにする

  $: switch (isOpen) {
    case true:
      onOpen()
      break
    case false:
      onClose()
      break
  }

  useEvent(refs.menuTrigger, 'click', evt => {
    evt.preventDefault()
    isOpen = !isOpen
  })

  function onOpen() {
    rootRef.classList.add('is-menuOpen')
    disablePageScroll()

    TWEEN.serial(
      TWEEN.parallel(
        TWEEN.tween(refs.menuTrigger, 0.8, EASE._3_CubicInOut).rotation(180),
        TWEEN.tween(refs.burgerTopLine, 0.8, EASE._3_CubicInOut).y(2.5),
        TWEEN.tween(refs.burgerBottomLine, 0.8, EASE._3_CubicInOut).scaleX(0)
      )
    ).play()
  }

  function onClose() {
    TWEEN.serial(
      TWEEN.parallel(
        TWEEN.tween(refs.menuTrigger, 0.8, EASE._3_CubicInOut).rotation(360),
        TWEEN.tween(refs.burgerTopLine, 0.8, EASE._3_CubicInOut).y(0),
        TWEEN.tween(refs.burgerBottomLine, 0.8, EASE._3_CubicInOut).scaleX(32 / 40)
      )
    )
      .onComplete(() => {
        rootRef.classList.remove('is-menuOpen')
        enablePageScroll()
      })
      .play()
  }
</script>
