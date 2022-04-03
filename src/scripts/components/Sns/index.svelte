<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  function onToggle(e) {
    console.log('Toggle', e)
  }

  onMount(() => {
    console.log('mount', 'SNS')
  })

  onDestroy(() => {
    console.log('destroy')
  })
</script>

<button class="absolute inset-0" on:click={onToggle} />
