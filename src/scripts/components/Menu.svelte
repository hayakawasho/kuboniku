<script lang="ts">
  import { onMount, getContext } from 'svelte'
  import type { Context$ } from '@/foundation'
  // import { TWEEN } from '@/foundation'

  type Refs = {
    menuTrigger: HTMLButtonElement
  }

  const { useDOMRef, rootRef: _ } = getContext<Context$>('$')
  const { refs } = useDOMRef<Refs>(new Set(['menuTrigger']))

  function onToggle(e: Event) {
    e.preventDefault()
  }

  onMount(() => {
    refs.menuTrigger.addEventListener('click', onToggle)
  })
</script>
