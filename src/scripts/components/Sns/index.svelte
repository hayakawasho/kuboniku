<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { DOMRef } from '@/foundation'

  type Refs = {
    trigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  export let useDOMRef: DOMRef

  const refsMap = new Set(['trigger', 'icon'])
  const { refs } = useDOMRef<Refs>(refsMap)

  onMount(() => {
    console.log('onMount:Sns', refs)
  })

  onDestroy(() => {
    console.log('onDestroy:Sns')
  })
</script>
