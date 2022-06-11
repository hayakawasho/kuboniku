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

  export let total: number
  export let repository: any

  const dispatch = createEventDispatcher()

  const PER_PAGE = 10
  const TOTAL_PAGE = Math.ceil(total / PER_PAGE)
  const MAX_RETRY = 3

  const enum Status {
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

  const checkLoaded = ({ loadCount }: { loadCount: number }) => loadCount >= TOTAL_PAGE

  const machine = createMachine(
    {
      [Status.IDLE]: state(
        immediate(Status.DONE, guard(checkLoaded)),
        on(Send.FETCH, Status.LOADING)
      ),
      [Status.LOADING]: invoke(
        ({ loadCount, posts }: FetchContext) => {
          return repository.findTen({ offset: loadCount }).then(res => {
            return res.map(value => [...posts, ...(value as ViewWork[])]).mapErr(err => err)
          })
        },
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
      [Status.RESOLVE]: state(immediate(Status.DONE, guard(checkLoaded)), immediate(Status.IDLE)),
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
    (state: FetchContext) => ({
      posts: state.posts,
      loadCount: state.loadCount,
      retryCount: state.retryCount,
      error: state.error,
    })
  )

  const fetchService = useMachine(machine, {
    posts: [],
    loadCount: 1,
    retryCount: 0,
    error: undefined,
  })

  let refFetch: HTMLElement

  // const send = $fetchService.send
  const posts = $fetchService.context.posts

  $: current = $fetchService.machine.current

  onMount(() => {
    console.log(refFetch)
  })

  onDestroy(() => {})
</script>

{#if posts.length}
  {#each posts as i}
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
            <!--{// zeroPadding(i.index, 2)}-->
            <span class="ml-[.5em]">Project</span>
          </p>
          <h2 class="works-entryHeading">{@html i.title}</h2>
        </div>
      </a>
    </article>
  {/each}
{/if}

{#if current !== Status.DONE}
  <div bind:this={refFetch} />
{/if}

{#if current === Status.LOADING}
  <div>Loading...</div>
{:else if current === Status.ERROR}
  <div>{$fetchService.context.error}</div>
{/if}
