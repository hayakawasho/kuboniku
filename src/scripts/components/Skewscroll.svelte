<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { getContext$, TWEEN as __ } from '@/foundation'

  type Refs = {
    target: HTMLElement[]
  }

  const { useDOMRef, rootRef } = getContext$()
  const { refs } = useDOMRef<Refs>('target')

  onMount(() => {
    console.log('skew mounted', refs.target, rootRef)
  })

  onDestroy(() => {
    //
  })
</script>
