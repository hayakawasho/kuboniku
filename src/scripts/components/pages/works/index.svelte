<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte'
  import { createMachine, assign } from 'xstate'
  import { useMachine } from '@xstate/svelte'
  import { createIObserver } from '@/utils'
  import type { IWorksRepo } from '@/domain/works'

  type ViewWork = {
    title: string
    slug: string
    eyecatch: {
      pc: {
        src: string
        width: number
        height: number
      }
    }
    num: string
  }

  export let loadmore: ViewWork[]
  export let total: number
  export let repository: IWorksRepo

  let fetchTrigger: HTMLElement
  let errorMessage: string

  const dispatch = createEventDispatcher()
  const io = createIObserver()
  const fetchMachine = createMachine({
    id: 'fetch',
    initial: 'idle',
    context: {
      data: loadmore,
      count: 1,
    },
    states: {
      idle: {
        on: { FETCH: 'loading' },
      },
      loading: {
        entry: ['load'],
        on: {
          RESOLVE: {
            target: 'success',
            actions: assign<any, any>({
              data: (_: any, event: any) => event.data,
              count: (_: any, event: any) => event.count++,
            }),
          },
          REJECT: 'failure',
        },
      },
      success: {
        on: {
          IDLE: 'idle',
          DONE: 'done',
        },
      },
      failure: {
        on: {
          RETRY: 'loading',
        },
      },
      done: {
        exit: 'final',
      },
    },
  })

  const { state, send, service } = useMachine(fetchMachine, {
    actions: {
      load: async () => {
        const { count } = service.state.context
        const result = await repository.findTen({
          offset: count,
        })

        result
          .map(value => {
            send({ type: 'RESOLVE', data: value })
            tick().then(() => dispatch('works:updated'))
          })
          .mapErr(err => {
            send({ type: 'REJECT', data: err.message })
          })
      },
    },
  })

  onMount(() => {
    io.observe(fetchTrigger, e => {
      if (e.isIntersecting) {
        send({ type: 'FETCH' })
      }
    })
  })

  onDestroy(() => {
    io.destroy()
  })
</script>

{#if $state.context.data.length}
  {#each $state.context.data as j}
    <article class="o-grid__item | mb-[4rem]">
      <a href="./{j.slug}/" class="relative block">
        <img
          data-src={j.eyecatch.pc.src}
          class="lazyload | filter grayscale-100 opacity-[.8]"
          width={j.eyecatch.pc.width}
          height={j.eyecatch.pc.height}
          decoding="async"
          alt=""
        />
        <div class="absolute bottom-[2rem] left-[-1.2rem]">
          <p class="works-entryNum">
            {j.num}
            <span class="ml-[.5em]">Project</span>
          </p>
          <h2 class="works-entryHeading">{@html j.title}</h2>
        </div>
      </a>
    </article>
  {/each}
{/if}

{#if $state.matches('idle')}
  <div bind:this={fetchTrigger} />
{:else if $state.matches('loading')}
  <div>Loading...</div>
{:else if $state.matches('error')}
  <div>{errorMessage}</div>
{/if}
