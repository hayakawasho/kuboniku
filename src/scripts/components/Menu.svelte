<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { refKeySet, TWEEN as __, getContext$ } from '@/foundation'

  type Refs = {
    menuTrigger: HTMLButtonElement
  }

  const { useDOMRef, rootRef: _ } = getContext$()
  const { refs } = useDOMRef<Refs>(refKeySet('menuTrigger'))

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.menuTrigger.addEventListener('click', onToggle)
  })

  onDestroy(() => {
    refs.menuTrigger.removeEventListener('click', onToggle)
  })
</script>
