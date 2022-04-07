<script lang="ts">
  import { onMount, getContext } from 'svelte'
  import type { ContextProps$ } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    menuTrigger: HTMLButtonElement
  }

  const { useDOMRef, rootRef: _ } = getContext<ContextProps$>('$')

  const refmap = new Set(['menuTrigger'])
  const { refs } = useDOMRef<Refs>(refmap)

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.menuTrigger.addEventListener('click', onToggle)
  })
</script>
