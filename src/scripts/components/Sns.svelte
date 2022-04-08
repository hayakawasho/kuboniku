<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { Context$ } from '@/foundation'
  import { refKeySet, TWEEN as __ } from '@/foundation'

  type Refs = {
    trigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { useDOMRef } = getContext<Context$>('$')
  const { refs } = useDOMRef<Refs>(refKeySet('trigger', 'icon'))

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.trigger.addEventListener('click', onToggle)
  })

  onDestroy(() => {
    refs.trigger.removeEventListener('click', onToggle)
  })
</script>
