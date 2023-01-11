import { withSvelte, defineComponent, q } from 'lake'
import { match, P } from 'ts-pattern'
import WorksLoadmore from './loadmore.svelte'
// import { worksFetcher } from './worksFetcher'

type Metadata = any

type Result =
  | { status: 'idle' }
  | { status: 'loading'; startTime: number }
  | { status: 'success'; data: Metadata }
  | { status: 'error'; error: Error }

type Event =
  | { type: 'fetch' }
  | { type: 'ok'; data: Metadata }
  | { type: 'error'; error: Error }
  | { type: 'cancel' }

export default defineComponent({
  components: {
    '#js-works': withSvelte(WorksLoadmore),
  },

  setup(el) {
    const { total } = q('#js-works', el)[0].dataset

    const reducer = (state: Result, event: Event): Result => {
      return match<[Result, Event], Result>([state, event])
        .with([{ status: 'loading' }, { type: 'ok' }], ([, event]) => ({
          status: 'success',
          data: event.data,
        }))
        .with([{ status: 'loading' }, { type: 'error', error: P.select() }], error => ({
          status: 'error',
          error,
        }))
        .with([{ status: P.not('loading') }, { type: 'fetch' }], () => ({
          status: 'loading',
          startTime: Date.now(),
        }))
        .with(
          [
            {
              status: 'loading',
              startTime: P.when(t => t + 2000 < Date.now()),
            },
            { type: 'cancel' },
          ],
          () => ({
            status: 'idle',
          })
        )
        .with(P._, () => state)
        .exhaustive()
    }

    return {
      total: Number(total),
      reducer,
    }
  },
})
