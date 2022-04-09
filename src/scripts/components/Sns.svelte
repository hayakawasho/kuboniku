<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { refKeySet, getContext$, TWEEN as __ } from '@/foundation'

  type Refs = {
    trigger: HTMLButtonElement
    icon: HTMLAnchorElement[]
  }

  const { useDOMRef } = getContext$()
  const { refs } = useDOMRef<Refs>(refKeySet('trigger', 'icon'))

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.trigger.addEventListener('click', onToggle)
  })

  onDestroy(() => {
    refs.trigger.removeEventListener('click', onToggle)
  })
</script>
