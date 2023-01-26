<script lang="ts">
  import { onMount } from 'svelte'
  import { useGl } from './useGl'
  import { debounce } from '@/libs'

  let wrap: HTMLDivElement
  let canvas: HTMLCanvasElement

  onMount(() => {
    const { resize } = useGl(canvas, window.innerWidth, window.innerHeight)

    const ro = new ResizeObserver(
      debounce(([entry]) => {
        const { width, height } = entry.contentRect
        resize(width, height)
      }, 250)
    )

    ro.observe(wrap)
  })
</script>

<div class="fixed inset-0" bind:this={wrap}>
  <canvas class="h-screen w-screen" bind:this={canvas} />
</div>
