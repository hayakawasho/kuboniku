<script lang="ts">
  import { onMount, onDestroy, getContext } from 'svelte'
  import type { Context$ } from '@/foundation'
  import { refKeySet, TWEEN as __ } from '@/foundation'

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
