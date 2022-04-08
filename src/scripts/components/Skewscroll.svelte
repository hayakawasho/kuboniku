<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { Context$ } from '@/foundation'
  import { refKeySet } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    target: HTMLElement[]
  }

  const { useDOMRef, rootRef } = getContext<Context$>('$')
  const { refs } = useDOMRef<Refs>(refKeySet('target'))

  onMount(() => {
    console.log('skew mounted', refs.target, rootRef)
  })

  onDestroy(() => {
    //
  })
</script>
