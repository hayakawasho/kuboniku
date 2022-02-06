<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte'
  import { createMachine, assign } from 'xstate'
  import { useMachine } from '@xstate/svelte'
  import { createIObserver, Utils } from '@/utils'
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

  const totalpage = Math.ceil(total / 10)

  const dispatch = createEventDispatcher()

  let dummy: HTMLElement
  let errorMessage: string

  const fetchIO = createIObserver()
  // let ioListener: any

  const fetchMachine = createMachine(
    {
      id: 'fetch',
      initial: 'idle',
      context: {
        data: loadmore,
        count: 1,
        attempts: 0,
        errorMessage: undefined,
      },
      states: {
        idle: {
          on: {
            FETCH: {
              target: 'loading',
              cond: ctx => {
                return totalpage > ctx.count
              },
            },
          },
        },
        loading: {
          entry: ['load'],
          after: {
            TIMEOUT: 'failure',
          },
          on: {
            RESOLVE: {
              target: 'success',
              actions: assign<any, any>({
                data: (_: any, event: any) => event.data,
                count: (_: any, event: any) => event.count + 1,
              }),
            },
            REJECT: 'failure',
          },
        },
        failure: {
          on: {
            RETRY: 'loading',
          },
        },
        success: {
          entry: () => {
            tick().then(() => dispatch('worksindex:updated'))
          },
          on: {
            RETURN: 'idle',
            DONE: 'done',
          },
        },
        error: {
          on: {},
        },
        done: {
          exit: 'final',
        },
      },
    },
    {
      guards: {},
      delays: {
        TIMEOUT: 2000,
      },
    }
  )

  const { state, send, service } = useMachine(fetchMachine, {
    actions: {
      load: async () => {
        const { data, count } = service.state.context

        const result = await repository.findTen({
          offset: count,
        })

        result
          .map(value => {
            const newValue = [...data, ...(value as ViewWork[])]

            send({
              type: 'RESOLVE',
              data: newValue,
              count,
            } as any)

            send({ type: 'RETURN' })
          })
          .mapErr(_err => {
            send({ type: 'REJECT' })
          })
      },
    },
  })

  onMount(() => {
    fetchIO.observe(dummy, entry => {
      if (entry.isIntersecting) {
        send({ type: 'FETCH' })
      }
    })
  })

  onDestroy(() => {
    fetchIO.destroy()
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
            {Utils.zeroPadding(j.num, 2)}
            <span class="ml-[.5em]">Project</span>
          </p>
          <h2 class="works-entryHeading">{@html j.title}</h2>
        </div>
      </a>
    </article>
  {/each}
{/if}

{#if $state.matches('done') === false}
  <div bind:this={dummy} />
{/if}

{#if $state.matches('loading')}
  <div>Loading...</div>
{:else if $state.matches('failure')}
  <div>{errorMessage}</div>
{/if}
