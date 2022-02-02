<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { createMachine } from 'xstate'
  import { useMachine } from '@xstate/svelte'
  import { findWorks } from './findWorks'
  import { useIObserver } from '@/utils'

  type ViewWork = {
    ttl: string
    slug: string
    src: string
    width: number
    height: number
    num: string
  }

  export let metadata: ViewWork[]
  let el: HTMLElement
  let errorMessage: string

  const { observe, destroy } = useIObserver()

  const fetchMachine = createMachine({
    id: 'fetch',
    initial: 'idle',
    context: {
      data: undefined,
      cnt: 0,
    },
    states: {
      idle: {
        on: { FETCH: 'loading' }
      },
      loading: {
        entry: ['load'],
        on: {
          RESOLVE: {
            target: 'success',
            // actions: assign({
            //   data: (_, e: typeof fetchMachine.context) => e.data,
            //   cnt: (_, e: typeof fetchMachine.context) => e.cnt++
            // })
          },
          REJECT: 'error'
        }
      },
      success: {
        on: {
          IDLE: 'idle',
          DONE: 'done',
        }
      },
      error: {

      },
      done: {
        exit: 'final',
      },
    }
  })

  const { state, send } = useMachine(fetchMachine, {
    actions: {
      load: async () => {
        const result = await findWorks({
          offset: 0,
        })

        result
          .map(value => {
            send({ type: "RESOLVE", data: value })
          })
          .mapErr(err => {
            send({ type: "REJECT", data: err })
          })
      }
    }
  })

  onMount(() => {
    observe(el, () => {
      //
    })
  })

  onDestroy(() => {
    destroy()
  })
</script>

{#each metadata as j}
  <article class="o-grid__item | mb-[4rem]">
    <a href="./{ j.slug }/" class="relative block">
      <img class="works-entryImg | opacity-[.8]"
        src="{ j.src }"
        width="{ j.width }"
        height="{ j.height }"
        decoding="async"
        loading="lazy"
        alt=""
      />
      <div class="absolute bottom-[2rem] left-[-1.2rem]">
        <p class="works-entryNum">
          { j.num }<span class="ml-[.5em]">Project</span>
        </p>
        <h2 class="works-entryHeading">{ j.ttl }</h2>
      </div>
    </a>
  </article>
{/each}

{#if $state.matches('idle')}
  <div bind:this={el}></div>
{:else if $state.matches('loading')}
  <div>Loading...</div>
{:else if $state.matches('error')}
  <div>{errorMessage}</div>
{/if}
