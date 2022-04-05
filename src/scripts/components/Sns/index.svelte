<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  export let useDOMRef: any

  function onToggle() {
    //
  }

  onMount(() => {
    console.log('mount', 'SNS')
  })

  onDestroy(() => {
    console.log('destroy')
  })
</script>

<button class="absolute inset-0" on:click={onToggle} />
