<script lang="ts">
  import { onMount } from 'svelte'
  import { createScene, resize } from './scene'

  let canvas: HTMLCanvasElement

  onMount(() => {
    createScene(canvas)
  })
</script>

<div class="fixed inset-0">
  <canvas class="h-screen w-screen" bind:this={canvas} />
</div>

<svelte:window on:resize={resize} />
