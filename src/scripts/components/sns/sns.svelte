<script lang="ts">
  import { TWEEN, EASE, REVERSE } from '@/libs'
  import { useEvent, useDOMRef } from 'lake'
  import { match } from 'ts-pattern'

  type Refs = {
    toggleTrigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { refs } = useDOMRef<Refs>('toggleTrigger', 'icon')

  let isOpen: boolean | undefined

  $: match(isOpen)
    .with(true, onOpen)
    .with(false, onClose)
    .otherwise(() => {})

  useEvent(refs.toggleTrigger, 'click', e => {
    e.preventDefault()
    isOpen = !isOpen
  })

  const onOpen = () => {
    TWEEN.serial(
      TWEEN.prop(refs.icon).y(20).opacity(0).style('visibility', 'visible'),
      TWEEN.parallel(
        TWEEN.tween(refs.toggleTrigger, 0.55, EASE.cubicInOut).rotation(90),
        TWEEN.lag(0.07, TWEEN.tween(refs.icon, 0.5, EASE.cubicOut).y(0).opacity(1))
      )
    ).play()
  }

  const onClose = () => {
    TWEEN.serial(
      TWEEN.parallel(
        TWEEN.lagSort(0.07, REVERSE, TWEEN.tween(refs.icon, 0.5, EASE.cubicIn).y(20).opacity(0)),
        TWEEN.tween(refs.toggleTrigger, 0.55, EASE.cubicInOut).rotation(0)
      ),
      TWEEN.prop(refs.icon).y(20).opacity(0).style('visibility', 'hidden')
    ).play()
  }
</script>
