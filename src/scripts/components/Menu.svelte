<script lang="ts">
  import { refKeySet, getContext$, useEvent, TWEEN, EASE } from '@/foundation'
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
    refKeySet(
      'menuTrigger',
      'burgerTopLine',
      'burgerBottomLine',
      'menuBody',
      'menuMask',
      'menuBg',
      'menuLabel'
    )
  )

  let isOpen: boolean | undefined // 初期描画しないように初期値はundefinedにする

  const CLIP_PATH = {
    x1: 100,
    x2: 100,
  }

  $: isOpen && onOpen()
  $: isOpen === false && onClose()

  useEvent(refs.menuTrigger, 'click', evt => {
    evt.preventDefault()
    isOpen = !isOpen
  })

  // domBg.style.clipPath = `polygon(
  //   ${CLIP_PATH.x1}% 0px,
  //   100% 0px,
  //   100% 100vh,
  //   ${CLIP_PATH.x2}% 100vh
  // )`;

  function onOpen() {
    rootRef.classList.add('is-menuOpen')
    disablePageScroll()

    TWEEN.serial(
      TWEEN.prop(CLIP_PATH, {
        x1: 100,
      }),
      TWEEN.parallel(
        //TWEEN.tween(CLIP_PATH, 0.8, EASE._3_CubicInOut).onUpdate(() => {
        //  CLIP_PATH.x1 = 100
        //}),
        TWEEN.tween(refs.menuTrigger, 0.8, EASE._3_CubicInOut).rotation(180),
        TWEEN.tween(refs.burgerTopLine, 0.8, EASE._3_CubicInOut).y(2.5),
        TWEEN.tween(refs.burgerBottomLine, 0.8, EASE._3_CubicInOut).scaleX(0)
      )
    ).play()
  }

  function onClose() {
    TWEEN.serial(
      TWEEN.prop(CLIP_PATH, {
        x1: 100,
      }),
      TWEEN.parallel(
        //TWEEN.tween(CLIP_PATH, 0.8, EASE._3_CubicInOut).onUpdate(() => {
        //  CLIP_PATH.x1 = 100
        //}),
        TWEEN.tween(refs.menuTrigger, 0.8, EASE._3_CubicInOut).rotation(360),
        TWEEN.tween(refs.burgerTopLine, 0.8, EASE._3_CubicInOut).y(0),
        TWEEN.tween(refs.burgerBottomLine, 0.8, EASE._3_CubicInOut).scaleX(
          32 / 40
        )
      )
    )
      .onComplete(() => {
        enablePageScroll()
        rootRef.classList.remove('is-menuOpen')
      })
      .play()
  }
</script>
