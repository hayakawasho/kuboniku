<script lang="ts">
  import { onMount } from 'svelte'
  import type { DOMRef } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    trigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  export let useDOMRef: DOMRef

  const refmap = new Set(['trigger', 'icon'])
  const { refs } = useDOMRef<Refs>(refmap)

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.trigger.addEventListener('click', onToggle)

    return () => {
      refs.trigger.removeEventListener('click', onToggle)
    }
  })
</script>
