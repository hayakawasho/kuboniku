<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { Context$ } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    targets: HTMLElement[]
  }

  const { useDOMRef, rootRef } = getContext<Context$>('$')
  const { refs } = useDOMRef<Refs>(new Set(['target']))

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
