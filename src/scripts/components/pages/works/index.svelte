<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte'
  import { createMachine, assign } from 'xstate'
  import { useMachine } from '@xstate/svelte'
  import { createIObserver, Utils } from '@/utils'
  import type { IWorksRepo } from '../../works'
  import type { ViewWork } from './model'

  export let loadmore: ViewWork[]
  export let total: number
  export let worksRepo: IWorksRepo

  const totalpage = Math.ceil(total / 10)

  const dispatch = createEventDispatcher()

  const fetchMachine = createMachine(
    {
      id: 'fetch',
      initial: 'idle',
      context: {
        data: loadmore,
        loadCount: 1,
        attempts: 0,
        errorMessage: undefined,
      },
      states: {
        idle: {
          on: {
            FETCH: {
              target: 'loading',
              cond: ctx => {
                return totalpage > ctx.loadCount
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
                loadCount: (_: any, event: any) => event.loadCount + 1,
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
          // entry: send({ type: 'RETURN' }),
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
      actions: {},
      guards: {},
      delays: {
        TIMEOUT: 2000,
      },
    }
  )

  const { state, send, service } = useMachine(fetchMachine, {
    actions: {
      load: async () => {
        const { data, loadCount } = service.state.context
        const result = await worksRepo.findTen({
          offset: loadCount,
        })

        result
          .map(value => {
            const newWorks = [...data, ...(value as ViewWork[])]
            send({
              type: 'RESOLVE',
              data: newWorks,
              loadCount,
            } as any)
          })
          .mapErr(err => {
            if (err.code === 'DEADLINE_EXCEEDED') {
              send({ type: 'RETRY' })
            } else {
              send({ type: 'REJECT' })
            }
          })
      },
    },
  })

  const fetchIO = createIObserver({ rootMargin: '0px 0px 25% 0px' })
  let dummy: HTMLElement

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
          data-srcset={j.eyecatch.pc.srcset}
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
  <div>{$state.context.errorMessage}</div>
{/if}
