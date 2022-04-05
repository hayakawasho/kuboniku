<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { DOMRef } from '../../@lake'

  type Refs = {
    icon: HTMLLIElement
  }

  export let useDOMRef: DOMRef

  const refs = useDOMRef<Refs>({
    icon: 'icon',
  })

  console.log(refs)

  onMount(() => {
    console.log('onMount:Sns')
  })

  onDestroy(() => {
    console.log('onDestroy:Sns')
  })
</script>
