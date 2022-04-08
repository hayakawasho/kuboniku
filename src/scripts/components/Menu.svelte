<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { Context$ } from '@/foundation'
  import { refKeySet } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    menuTrigger: HTMLButtonElement
  }

  const { useDOMRef, rootRef: _ } = getContext<Context$>('$')
  const { refs } = useDOMRef<Refs>(refKeySet('menuTrigger'))

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.menuTrigger.addEventListener('click', onToggle)
  })

  onDestroy(() => {
    refs.menuTrigger.removeEventListener('click', onToggle)
  })
</script>
