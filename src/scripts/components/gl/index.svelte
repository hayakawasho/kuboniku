<script lang="ts">
  import { onMount } from 'svelte'
  import { useGl } from './useGl'
  import { useTick } from '@/libs'

  let wrap: HTMLDivElement
  let canvas: HTMLCanvasElement

  let w = 0
  let h = 0

  onMount(() => {
    const { render, resize } = useGl(canvas, w, h)

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      resize(width, height)
    })

    ro.observe(wrap)

    useTick(({ timestamp }) => {
      render(timestamp)
    })
  })
</script>

<div class="fixed inset-0" bind:this={wrap}>
  <canvas class="h-screen w-screen" bind:this={canvas} />
</div>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
