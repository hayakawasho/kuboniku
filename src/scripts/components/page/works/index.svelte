<script lang="ts">
  import {
    onMount,
    onDestroy,
    createEventDispatcher as __,
    tick as _tick,
  } from 'svelte'
  import {
    createMachine,
    state,
    transition,
    invoke,
    reduce,
    guard,
    action as _action,
    immediate as _immediate,
  } from 'robot3'
  import { useMachine } from 'svelte-robot-factory'
  import { createIObserver, Utils } from 'utils'
  import type { IWorksRepo } from '@/components/model/works'
  import type { ViewWork } from './model'

  export let posts: ViewWork[]
  export let total: number
  export let worksRepo: IWorksRepo

  // const dispatch = createEventDispatcher()

  const PER_PAGE = 10
  const TOTAL_PAGE = Math.ceil(total / PER_PAGE)

  const loadWorks = async (ctx: { posts: ViewWork[]; loadCount: number }) => {
    const offset = ctx.loadCount
    const result = await worksRepo.findTen({ offset })

    return result
      .map(value => {
        const newWorks = [...[], ...(value as ViewWork[])]
        return newWorks
      })
      .mapErr(err => {
        return err
      })
  }

  enum Status {
    IDLE = 'idel',
    LOADING = 'loading',
    DONE = 'done',
    ERROR = 'error',
  }

  const fetchMachine = createMachine(
    {
      [Status.IDLE]: state(transition('fetch', Status.LOADING)),
      [Status.LOADING]: invoke(
        loadWorks,
        transition(
          'done',
          Status.DONE,
          reduce<any, any>((ctx, { data }) => ({
            ...ctx,
            posts: data.value,
            loadCount: ctx.loadCount + 1,
          })),
          guard<any, any>(ctx => TOTAL_PAGE > ctx.loadCount)
        ),
        transition(
          'error',
          'error',
          reduce<any, any>((ctx, ev) => ({
            ...ctx,
            error: ev.data,
          }))
        )
      ),
      [Status.DONE]: state(),
    },
    event => ({
      posts: (event as any).posts,
      loadCount: (event as any).loadCount,
    })
  )

  const service = useMachine(fetchMachine, {
    posts,
    loadCount: 1,
  })

  const send = $service.send
  $: current = $service.machine.current

  const fetchIO = createIObserver({
    rootMargin: '0px 0px 25% 0px',
  })

  let dummy: HTMLElement

  onMount(() => {
    fetchIO.observe(dummy, entry => {
      if (entry.isIntersecting) {
        send({ type: 'fetch' })
      }
    })
  })

  onDestroy(() => {
    fetchIO.destroy()
  })
</script>

{#if $service.context.posts?.length}
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
  <div />
{/if}
