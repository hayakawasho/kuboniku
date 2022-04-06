<script lang="ts">
  import { onMount } from 'svelte'
  import type { DOMRef } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    menuTrigger: HTMLButtonElement
  }

  export let useDOMRef: DOMRef

  const refmap = new Set(['menuTrigger'])
  const { refs: _ } = useDOMRef<Refs>(refmap)

  onMount(() => {})
</script>
