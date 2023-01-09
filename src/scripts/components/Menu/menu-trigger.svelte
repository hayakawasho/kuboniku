<script lang="ts">
  import type { Context$ } from 'lake'
  import { useEvent } from 'lake'
  import { getContext } from 'svelte'
  import { match } from 'ts-pattern'

  export let onOpen: () => void
  export let onClose: () => void

  let isOpen: boolean | undefined

  const { rootRef } = getContext<Context$>('$')

  useEvent(rootRef as HTMLElement, 'click', e => {
    e.preventDefault()
    isOpen = !isOpen
  })

  $: match(isOpen)
    .with(true, onOpen)
    .with(false, onClose)
    .otherwise(() => {})
</script>
