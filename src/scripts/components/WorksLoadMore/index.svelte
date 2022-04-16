<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    console.log('GLWorld: mounted')
  })

  // import { createIntersectionWatch } from '@/foundation'
  // import { unknown2Err } from '@/foundation'
  // import type { IWorksRepo } from '@/components/model/works'
  // import type { ViewWork } from './types'
  // import { match, __, not, select, when } from 'ts-pattern'

  // export let posts: ViewWork[]
  // export let total: number
  // export let worksRepo: IWorksRepo
  // export let initialCount: number

  // const PER_PAGE = 10
  // const TOTAL_PAGE = Math.ceil(total / PER_PAGE)
  // const MAX_RETRY = 3

  //type FetchStatus =
  //  | { status: 'idle' }
  //  | { status: 'loading'; startTime: number }
  //  | { status: 'success'; data: string }
  //  | { status: 'error'; error: Error }
  //
  //type FetchEvent =
  //  | { type: 'fetch' }
  //  | { type: 'success'; data: string }
  //  | { type: 'error'; error: Error }
  //  | { type: 'cancel' }

  /*
  const reducer = (state: FetchStatus, event: FetchEvent): FetchStatus => {
    return match<[FetchStatus, FetchEvent], FetchStatus>([state, event])
      .with([{ status: 'loading' }, { type: 'success' }], ([, event]) => ({
        status: 'success',
        data: event.data,
      }))
      .with(
        [{ status: 'loading' }, { type: 'error', error: select() }],
        error => ({
          status: 'error',
          error,
        })
      )
      .with([{ status: not('loading') }, { type: 'fetch' }], () => ({
        status: 'loading',
        startTime: Date.now(),
      }))
      .with(
        [
          { status: 'loading', startTime: when(t => t + 2000 < Date.now()) },
          { type: 'cancel' },
        ],
        () => ({
          status: 'idle',
        })
      )
      .with(__, () => state)
      .exhaustive()
  }
  */

  // let fetchTrigger: HTMLElement

  // const worksFetchIO = createIntersectionWatch({
  //   rootMargin: '0px 0px 25% 0px',
  // })

  // onMount(() => {
  //   worksFetchIO.observe(fetchTrigger, entry => {
  //     if (entry.isIntersecting) {
  //       //
  //     }
  //   })
  //   return () => {
  //     worksFetchIO.destroy()
  //   }
  // })

  // onDestroy(() => {})
</script>
