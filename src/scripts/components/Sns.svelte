<script lang="ts">
  import {
    refKeySet,
    getContext$,
    useEvent,
    TWEEN,
    EASE,
    REVERSE,
  } from '@/foundation'

  type Refs = {
    toggleTrigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { useDOMRef } = getContext$()
  const { refs } = useDOMRef<Refs>(refKeySet('toggleTrigger', 'icon'))

  let isOpen: boolean | undefined

  $: isOpen && onOpen()
  $: isOpen === false && onClose()

  function onOpen() {
    TWEEN.parallel(
      TWEEN.tween(refs.toggleTrigger, 0.55, EASE._3_CubicInOut).rotation(90),
      TWEEN.serial(
        TWEEN.prop(refs.icon).y(20).opacity(0),
        TWEEN.lag(
          0.07,
          TWEEN.tween(refs.icon, 0.5, EASE._3_CubicOut).y(0).opacity(1)
        )
      )
    ).play()
  }

  function onClose() {
    TWEEN.parallel(
      TWEEN.tween(refs.toggleTrigger, 0.55, EASE._3_CubicInOut).rotation(0),
      TWEEN.lagSort(
        0.07,
        REVERSE,
        TWEEN.tween(refs.icon, 0.5, EASE._3_CubicOut).y(20).opacity(0)
      )
    ).play()
  }

  useEvent(refs.toggleTrigger, 'click', evt => {
    evt.preventDefault()
    isOpen = !isOpen
  })
</script>
