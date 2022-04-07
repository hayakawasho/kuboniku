<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { ContextProps$ } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    targets: HTMLElement[]
  }

  const { useDOMRef, rootRef } = getContext<ContextProps$>('$')

  const refmap = new Set(['target'])
  const { refs } = useDOMRef<Refs>(refmap)

  onMount(() => {
    console.log('skew mounted', refs.targets, rootRef)

    return () => {
      console.log('skew mounted return')
    }
  })

  onDestroy(() => {
    console.log('skew destroy')
  })
</script>
