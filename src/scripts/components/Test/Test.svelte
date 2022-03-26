<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  export let total: number
  export let refs: HTMLElement[]

  onMount(() => {
    console.log(refs[0])
    console.log({ total })
  })

  onDestroy(() => {
    console.log('onDestroy')
  })
</script>
