<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { DOMRef } from '@/foundation'

  type RefVal = {
    icon: HTMLAnchorElement[]
    trigger: HTMLButtonElement
  }

  export let useDOMRef: DOMRef

  const { refs } = useDOMRef<RefVal>({
    icon: null,
    trigger: null,
  })

  onMount(() => {
    console.log('onMount:Sns', refs)
  })

  onDestroy(() => {
    console.log('onDestroy:Sns')
  })
</script>
