<script lang="ts">
  import type { Context$ } from 'lake'
  import { useDomRef, useSlot, ref, readonly } from 'lake'
  import { getContext } from 'svelte'
  import MenuToggle from './toggle'
  import MenuClose from './close'
  import { Tween, nextTick } from '@/libs'

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

  const { refs } = useDomRef<Refs>(
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

  const openAnime = async () => {
    rootRef.classList.add('is-menuOpen', 'is-menuAnimating')

    Tween.kill([refs.menuLabel, refs.menuTrigger])

    await nextTick()

    Tween.serial(
      Tween.prop(refs.menuTrigger, {
        pointerEvents: 'none',
        rotation: 0,
      }),
      Tween.parallel(
        Tween.tween(refs.menuMask, 0.75, undefined, {
          opacity: 0.5,
        }),
        Tween.tween(refs.menuTrigger, 0.75, 'power2.inOut', {
          rotation: 180,
        }),
        Tween.tween(refs.burgerTL, 0.75, 'power2.inOut', {
          y: 2.5,
        }),
        Tween.tween(refs.burgerBL, 0.75, 'power2.inOut', {
          scaleX: 0,
        }),
        Tween.serial(
          Tween.prop(refs.menuLabel, {
            rotation: -7,
            y: '200%',
            opacity: 1,
          }),
          Tween.tween(refs.menuLabel, 0.75, 'power2.inOut', {
            rotation: 0,
            y: '0%',
            stagger: 0.065,
          })
        ),
        Tween.parallel(
          Tween.tween(CLIP_PATH, 0.85, 'power2.inOut', {
            x1: 0,
            onUpdate: updateMenuBg,
          }),
          Tween.tween(CLIP_PATH, 0.75, 'power2.inOut', {
            x2: 0,
          }).delay(0.1)
        )
      ),
      Tween.prop(refs.menuTrigger, {
        pointerEvents: 'auto',
      }),
      Tween.immediate(() => {
        rootRef.classList.remove('is-menuAnimating')
      })
    )
  }

  const closeAnime = async () => {
    rootRef.classList.add('is-menuAnimating')

    Tween.kill([refs.menuLabel, refs.menuTrigger])

    await nextTick()

    Tween.serial(
      Tween.prop(refs.menuTrigger, {
        pointerEvents: 'none',
        rotation: 180,
      }),
      Tween.parallel(
        Tween.tween(refs.menuMask, 0.75, undefined, {
          opacity: 0,
        }),
        Tween.tween(refs.menuTrigger, 0.75, 'power2.inOut', {
          rotation: 360,
        }),
        Tween.tween(refs.burgerTL, 0.75, 'power2.inOut', {
          y: 0,
        }),
        Tween.tween(refs.burgerBL, 0.75, 'power2.inOut', {
          scaleX: 32 / 40,
        }),
        Tween.serial(
          Tween.prop(refs.menuLabel, {
            rotation: 0,
            y: '0%',
          }),
          Tween.tween(refs.menuLabel, 0.65, 'power2.inOut', {
            rotation: 7,
            y: '-200%',
            stagger: 0.06,
          })
        ),
        Tween.parallel(
          Tween.tween(CLIP_PATH, 0.85, 'power2.inOut', {
            x1: 100,
            onUpdate: updateMenuBg,
          }),
          Tween.tween(CLIP_PATH, 0.75, 'power2.inOut', {
            x2: 100,
          }).delay(0.1)
        )
      ),
      Tween.prop(refs.menuTrigger, {
        pointerEvents: 'auto',
      }),
      Tween.immediate(() => {
        rootRef.classList.remove('is-menuOpen', 'is-menuAnimating')
      })
    )
  }

  let isOpen = ref<boolean | undefined>(undefined)

  $: isOpen.value === true && openAnime()
  $: isOpen.value === false && closeAnime()

  const { addChild } = useSlot()

  const onOpen = () => (isOpen.value = true)
  const onClose = () => (isOpen.value = false)
  const readonlyIsOpen = readonly(isOpen)

  addChild(refs.menuTrigger, MenuToggle, {
    isOpen: readonlyIsOpen,
    onOpen,
    onClose,
  })

  addChild(refs.menuMask, MenuClose, {
    onClose,
  })
</script>
