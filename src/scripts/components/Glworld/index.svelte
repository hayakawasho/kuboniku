<script lang="ts">
  import { onMount } from 'svelte'
  import type { DOMRef } from '@/foundation'

  export let useDOMRef: DOMRef

  onMount(() => {
    //
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" />
</div>
