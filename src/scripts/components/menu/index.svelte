<script lang="ts">
  import type { Context$ } from 'lake'
  import { useDOMRef, useSlot, ref, readonly } from 'lake'
  import { getContext } from 'svelte'
  import MenuToggle from './toggle'
  import MenuClose from './close'
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

  const { refs } = useDOMRef<Refs>(
    'menuTrigger',
    'burgerTL',
    'burgerBL',
    'menuBody',
    'menuMask',
    'menuBg',
    'menuLabel'
  )

  const { rootRef } = getContext<Context$>('$')

  const updateMenuBg = () => {
    refs.menuBg.style.clipPath = `polygon(
      ${CLIP_PATH.x1}% 0px,
      100% 0px,
      100% 100vh,
      ${CLIP_PATH.x2}% 100vh
    )`
  }

  const _open = async () => {
    rootRef.classList.add('is-menuOpen', 'is-menuAnimating')

    await nextTick()

    TWEEN.serial(
      TWEEN.prop(refs.menuTrigger).pointerEvents(false),
      TWEEN.parallel(
        TWEEN.tween(refs.menuMask, 0.75).opacity(0.5),
        TWEEN.tween(refs.menuTrigger, 0.75, EASE.cubicInOut).rotation(180),
        TWEEN.tween(refs.burgerTL, 0.75, EASE.cubicInOut).y(2.5),
        TWEEN.tween(refs.burgerBL, 0.75, EASE.cubicInOut).scaleX(0),
        TWEEN.serial(
          TWEEN.tween(refs.menuLabel, 0).rotation(-7).y('200%').opacity(1),
          TWEEN.lag(0.065, TWEEN.tween(refs.menuLabel, 0.75, EASE.cubicInOut).rotation(0).y('0%'))
        ),
        TWEEN.parallel(
          TWEEN.tween(CLIP_PATH, 0.85, EASE.cubicInOut, { x1: 0 }),
          TWEEN.tween(CLIP_PATH, 0.75, EASE.cubicInOut, { x2: 0 }).delay(0.1)
        ).onUpdate(updateMenuBg)
      ),
      TWEEN.prop(refs.menuTrigger).pointerEvents(true)
    )
      .onComplete(() => {
        rootRef.classList.remove('is-menuAnimating')
      })
      .play()
  }

  const _close = async () => {
    rootRef.classList.add('is-menuAnimating')

    await nextTick()

    TWEEN.serial(
      TWEEN.prop(refs.menuTrigger).pointerEvents(false),
      TWEEN.parallel(
        TWEEN.tween(refs.menuMask, 0.75).opacity(0),
        TWEEN.tween(refs.menuTrigger, 0.75, EASE.cubicInOut).rotation(360),
        TWEEN.tween(refs.burgerTL, 0.75, EASE.cubicInOut).y(0),
        TWEEN.tween(refs.burgerBL, 0.75, EASE.cubicInOut).scaleX(32 / 40),
        TWEEN.serial(
          TWEEN.tween(refs.menuLabel, 0).rotation(0).y('0%'),
          TWEEN.lag(0.06, TWEEN.tween(refs.menuLabel, 0.65, EASE.cubicInOut).rotation(7).y('-200%'))
        ),
        TWEEN.parallel(
          TWEEN.tween(CLIP_PATH, 0.85, EASE.cubicInOut, { x1: 100 }),
          TWEEN.tween(CLIP_PATH, 0.75, EASE.cubicInOut, { x2: 100 }).delay(0.1)
        ).onUpdate(updateMenuBg)
      ),
      TWEEN.prop(refs.menuTrigger).pointerEvents(true)
    )
      .onComplete(() => {
        rootRef.classList.remove('is-menuOpen', 'is-menuAnimating')
      })
      .play()
  }

  let isOpen = ref<boolean | undefined>(undefined)

  $: isOpen.value === true && _open()
  $: isOpen.value === false && _close()

  const { addChild } = useSlot()

  const onOpen = () => (isOpen.value = true)
  const onClose = () => (isOpen.value = false)
  const readonlyIsOpen = readonly(isOpen)

  addChild(MenuToggle, refs.menuTrigger, {
    isOpen: readonlyIsOpen,
    onOpen,
    onClose,
  })

  addChild(MenuClose, refs.menuMask, {
    onClose,
  })
</script>
