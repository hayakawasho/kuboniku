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
  import { createIObserver, Utils } from 'utils'
  import type { IWorksRepo } from '@/components/model/works'
  import type { ViewWork } from './model'

  export let posts: ViewWork[]
  export let total: number
  export let worksRepo: IWorksRepo

  const dispatch = createEventDispatcher()

  const PER_PAGE = 10
  const TOTAL_PAGE = Math.ceil(total / PER_PAGE)
  const MAX_RETRY = 3

  enum Status {
    IDLE = 'idle',
    LOADING = 'loading',
    RESOLVE = 'resolve',
    REJECT = 'reject',
    ERROR = 'error',
    DONE = 'done',
  }

  const fetchContext = (initialContext: any) => ({
    posts: initialContext.posts,
    loadCount: initialContext.loadCount,
    retryCount: initialContext.retryCount,
    error: initialContext.error,
  })

  const initialCount = 1
  const initialContext = {
    posts,
    loadCount: initialCount,
    retryCount: 0,
    error: undefined,
  }

  const loadWorks = async (ctx: { posts: ViewWork[]; loadCount: number }) => {
    const result = await worksRepo.findTen({ offset: ctx.loadCount })
    return result
      .map(value => {
        const newWorks = [...ctx.posts, ...(value as ViewWork[])]
        return newWorks
      })
      .mapErr(err => {
        return err
      })
  }

  const fetchMachine = createMachine(
    {
      [Status.IDLE]: state(on('fetch', Status.LOADING)),
      [Status.LOADING]: invoke(
        loadWorks,
        on(
          'done',
          Status.RESOLVE,
          reduce<any, any>((ctx, { data }) => ({
            ...ctx,
            posts: data.value,
            loadCount: ctx.loadCount + 1,
            retryCount: 0, // reset
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
        immediate(
          Status.DONE,
          guard<any, any>(ctx => ctx.loadCount === TOTAL_PAGE)
        ),
        immediate(Status.IDLE)
      ),
      [Status.REJECT]: state(
        immediate(
          Status.ERROR,
          guard<any, any>(ctx => ctx.retryCount === MAX_RETRY)
        ),
        immediate(Status.LOADING)
      ),
      [Status.ERROR]: fin(),
      [Status.DONE]: fin(),
    },
    fetchContext
  )

  const service = useMachine(fetchMachine, initialContext)
  const send = $service.send
  $: current = $service.machine.current

  const fetchIO = createIObserver({
    rootMargin: '0px 0px 25% 0px',
  })

  let dummy: HTMLElement

  onMount(() => {
    fetchIO.observe(dummy, entry => {
      if (entry.isIntersecting) {
        send('fetch')
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
          class="lazyload | filter grayscale-100 opacity-[.8]"
          width={i.eyecatch.pc.width}
          height={i.eyecatch.pc.height}
          decoding="async"
          alt=""
        />
        <div class="absolute bottom-[2rem] left-[-1.2rem]">
          <p class="works-entryNum">
            {Utils.zeroPadding(i.num, 2)}
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
