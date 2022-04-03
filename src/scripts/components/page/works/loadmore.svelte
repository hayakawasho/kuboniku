<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte'
  import {
    createMachine,
    state,
    state as fin,
    transition as on,
    invoke,
    reduce,
    guard,
    action,
    immediate,
  } from 'robot3'
  import { useMachine } from 'svelte-robot-factory'
  import { createIO, Util } from '@/foundation'
  // import { unknown2Err } from '@/foundation'
  import type { IWorksRepo } from '@/components/model/works'
  import type { ViewWork } from './type'
  // import { match, __, not, select, when } from 'ts-pattern'

  export let posts: ViewWork[]
  export let total: number
  export let worksRepo: IWorksRepo
  export let initialCount: number

  const dispatch = createEventDispatcher()

  const PER_PAGE = 10
  const TOTAL_PAGE = Math.ceil(total / PER_PAGE)
  const MAX_RETRY = 3

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

  enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    RESOLVE = 'resolve',
    REJECT = 'reject',
    ERROR = 'error',
    DONE = 'done',
  }

  enum Send {
    FETCH = 'fetch',
  }

  type FetchContext = {
    posts: ViewWork[]
    loadCount: number
    retryCount: number
    error?: Error
  }

  const checkLoaded = ({ loadCount }: FetchContext) => loadCount >= TOTAL_PAGE

  const loadWorks = async ({ loadCount, posts }: FetchContext) => {
    const result = await worksRepo.findTen({ offset: loadCount })
    return result
      .map(value => [...posts, ...(value as ViewWork[])])
      .mapErr(err => err)
  }

  const fetchMachine = createMachine(
    {
      [Status.IDLE]: state(
        immediate(Status.DONE, guard<any, any>(checkLoaded)),
        on(Send.FETCH, Status.LOADING)
      ),
      [Status.LOADING]: invoke(
        loadWorks,
        on(
          'done',
          Status.RESOLVE,
          reduce<any, any>((ctx, { data }) => ({
            ...ctx,
            posts: data.value,
            loadCount: ctx.loadCount + 1,
            retryCount: 0,
            error: undefined,
          })),
          action(() => tick().then(() => dispatch('worksindex:updated')))
        ),
        on(
          'error',
          Status.REJECT,
          reduce<any, any>((ctx, { error }) => ({
            ...ctx,
            error,
            retryCount: ctx.retryCount + 1,
          }))
        )
      ),
      [Status.RESOLVE]: state(
        immediate(Status.DONE, guard<any, any>(checkLoaded)),
        immediate(Status.IDLE)
      ),
      [Status.REJECT]: state(
        immediate(
          Status.ERROR,
          guard<any, any>(ctx => ctx.retryCount >= MAX_RETRY)
        ),
        immediate(Status.LOADING)
      ),
      [Status.ERROR]: fin(),
      [Status.DONE]: fin(),
    },
    (initial: FetchContext) => ({
      posts: initial.posts,
      loadCount: initial.loadCount,
      retryCount: initial.retryCount,
      error: initial.error,
    })
  )

  const service = useMachine(fetchMachine, {
    posts,
    loadCount: initialCount,
    retryCount: 0,
    error: undefined,
  })

  const send = $service.send
  $: current = $service.machine.current

  const fetchIO = createIO({
    rootMargin: '0px 0px 25% 0px',
  })

  let dummy: HTMLElement | undefined

  onMount(() => {
    dummy &&
      fetchIO.observe(dummy, entry => {
        if (entry.isIntersecting) {
          send(Send.FETCH)
        }
      })
  })

  onDestroy(() => {
    fetchIO.destroy()
  })
</script>

{#if $service.context.posts.length}
  {#each $service.context.posts as i}
    <article class="o-grid__item | mb-[4rem]">
      <a href="./{i.slug}/" class="relative block">
        <img
          data-src={i.eyecatch.pc.src}
          data-srcset={i.eyecatch.pc.srcset}
          class="lazyload | grayscale-100 opacity-[.8] filter"
          width={i.eyecatch.pc.width}
          height={i.eyecatch.pc.height}
          decoding="async"
          alt=""
        />
        <div class="absolute bottom-[2rem] left-[-1.2rem]">
          <p class="works-entryNum">
            {Util.zeroPadding(i.index, 2)}
            <span class="ml-[.5em]">Project</span>
          </p>
          <h2 class="works-entryHeading">{@html i.title}</h2>
        </div>
      </a>
    </article>
  {/each}
{/if}

{#if current !== Status.DONE}
  <div bind:this={dummy} />
{/if}

{#if current === Status.LOADING}
  <div>Loading...</div>
{:else if current === Status.ERROR}
  <div>{$service.context.error}</div>
{/if}
