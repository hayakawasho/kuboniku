<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { ContextProps$ } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    trigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { useDOMRef } = getContext<ContextProps$>('$')

  const refmap = new Set(['trigger', 'icon'])
  const { refs } = useDOMRef<Refs>(refmap)

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
