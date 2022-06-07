<script lang="ts">
  import { TWEEN, EASE, REVERSE } from '@/foundation'
  import { getContext$, useEvent } from 'lake'

  type Refs = {
    toggleTrigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { useDOMRef } = getContext$()
  const { refs } = useDOMRef<Refs>('toggleTrigger', 'icon')

  let isOpen: boolean | undefined

  $: switch (isOpen) {
    case true:
      onOpen()
      break
    case false:
      onClose()
      break
  }

  useEvent(refs.toggleTrigger, 'click', evt => {
    evt.preventDefault()
    isOpen = !isOpen
  })

  function onOpen() {
    TWEEN.serial(
      TWEEN.prop(refs.icon).y(20).opacity(0).style('visibility', 'visible'),
      TWEEN.parallel(
        TWEEN.tween(refs.toggleTrigger, 0.55, EASE._3_CubicInOut).rotation(90),
        TWEEN.lag(0.07, TWEEN.tween(refs.icon, 0.5, EASE._3_CubicOut).y(0).opacity(1))
      ).willChange()
    ).play()
  }

  function onClose() {
    TWEEN.serial(
      TWEEN.parallel(
        TWEEN.lagSort(0.07, REVERSE, TWEEN.tween(refs.icon, 0.5, EASE._3_CubicIn).y(20).opacity(0)),
        TWEEN.tween(refs.toggleTrigger, 0.55, EASE._3_CubicInOut).rotation(0)
      ).willChange(),
      TWEEN.prop(refs.icon).y(20).opacity(0).style('visibility', 'hidden')
    ).play()
  }
</script>
