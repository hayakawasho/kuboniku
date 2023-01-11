<script lang="ts">
  // import { TWEEN } from '@/foundation'
  import { getContext } from 'svelte'
  import type { Context$, ReadonlyRef } from 'lake'

  export let skewY: ReadonlyRef<number>
  let isInView = false

  const { rootRef } = getContext<Context$>('$')

  $: switch (isInView) {
    case true:
      rootRef.style.transform = `translate3d(0, 0, 0) skewY(${skewY.value}deg)`
      break
    default:
      break
  }

  let innerWidth = window.innerWidth
  let innerHeight = window.innerHeight
  let y = 0

  function onScroll() {
    //
  }

  function onResize() {
    //
  }

  function transform() {
    //
  }
</script>

<svelte:window bind:scrollY={y} bind:innerWidth bind:innerHeight />
