<script lang="ts">
  import { onMount } from 'svelte'
  // import { resize } from './scene'

  let canvas: HTMLCanvasElement

  function onResize() {
    // resize()
  }

  onMount(() => {
    console.log(canvas)
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" bind:this={canvas} />
</div>

<svelte:window on:resize={onResize} />
