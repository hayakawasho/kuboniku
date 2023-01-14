<script lang="ts">
  import { onMount } from 'svelte'
  import { createBgCanvas, resize } from './main'

  let canvas: HTMLCanvasElement

  onMount(() => {
    createBgCanvas(canvas)
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" bind:this={canvas} />
</div>

<svelte:window on:resize={resize} />
