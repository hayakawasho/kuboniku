<script lang="ts">
  import { onMount } from 'svelte'
  import { useSlot } from 'lake'
  import BgCanvas from './main'

  let canvas: HTMLCanvasElement

  let w = 0
  let h = 0

  const { addChild } = useSlot()

  onMount(() => {
    addChild(canvas, BgCanvas, {
      w,
      h,
    })
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" bind:this={canvas} />
</div>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
