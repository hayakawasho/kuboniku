<script lang="ts">
  import type { Context$ } from 'lake'
  import { TWEEN, EASE, SORT, nextTick } from '@/libs'
  import { useEvent, useDomRef } from 'lake'
  import { getContext } from 'svelte'

  type Refs = {
    toggleTrigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { rootRef } = getContext<Context$>('$')
  const { refs } = useDomRef<Refs>('toggleTrigger', 'icon')

  let isOpen: boolean | undefined

  useEvent(refs.toggleTrigger, 'click', e => {
    e.preventDefault()
    isOpen = !isOpen
  })

  $: isOpen === true && _open()
  $: isOpen === false && _close()

  const _open = async () => {
    rootRef.classList.add('is-animating')

    await nextTick()

    TWEEN.serial(
      TWEEN.prop(refs.icon).y(20).opacity(0).style('visibility', 'visible'),
      TWEEN.parallel(
        TWEEN.tween(refs.toggleTrigger, 0.55, EASE.cubicInOut).rotation(90),
        TWEEN.lag(0.07, TWEEN.tween(refs.icon, 0.5, EASE.cubicOut).y(0).opacity(1))
      )
    )
      .onComplete(() => {
        rootRef.classList.remove('is-animating')
      })
      .play()
  }

  const _close = async () => {
    rootRef.classList.add('is-animating')

    await nextTick()

    TWEEN.serial(
      TWEEN.parallel(
        TWEEN.lagSort(
          0.07,
          SORT.reverse,
          TWEEN.tween(refs.icon, 0.5, EASE.cubicIn).y(20).opacity(0)
        ),
        TWEEN.tween(refs.toggleTrigger, 0.55, EASE.cubicInOut).rotation(0)
      ),
      TWEEN.prop(refs.icon).y(20).opacity(0).style('visibility', 'hidden')
    )
      .onComplete(() => {
        rootRef.classList.remove('is-animating')
      })
      .play()
  }
</script>
