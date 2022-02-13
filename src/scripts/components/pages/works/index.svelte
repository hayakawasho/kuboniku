<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte'
  import {
    createMachine,
    state,
    transition,
    invoke,
    reduce,
    guard as _guard,
    action as _action,
    immediate as _immediate,
  } from 'robot3'
  import { useMachine } from 'svelte-robot-factory'
  import { createIObserver, Utils } from '@/utils'
  import type { IWorksRepo } from '../../works'
  import type { ViewWork } from './model'

  export let posts: ViewWork[]
  export let total: number
  export let worksRepo: IWorksRepo

  const dispatch = createEventDispatcher()

  const PER_PAGE = 10
  const totalpage = Math.ceil(total / PER_PAGE)

  console.log({ totalpage, dispatch, tick, Utils })

  const loadWorks = async () => {
    const result = await worksRepo.findTen({
      offset: 1,
    })

    return result
      .map(value => {
        const newWorks = [...[], ...(value as ViewWork[])]
        return newWorks
      })
      .mapErr(err => {
        return err
      })
  }

  const fetchMachine = createMachine({
    idle: state(transition('fetch', 'loading')),
    loading: invoke(
      loadWorks,
      transition(
        'done',
        'loaded',
        reduce<any, any>((ctx, ev) => {
          return {
            ...ctx,
            posts: ev.data,
            loadCount: 1,
          }
        })
        // guard<any, any>(ctx => totalpage > ctx.loadCount)
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
    loaded: state(),
  })

  const service = useMachine(fetchMachine, () => ({
    posts,
    loadCount: 1,
  }))

  const fetchIO = createIObserver({
    rootMargin: '0px 0px 25% 0px',
  })

  let dummy: HTMLElement

  onMount(() => {
    fetchIO.observe(dummy, entry => {
      if (entry.isIntersecting) {
        $service.send({ type: 'fetch' })
      }
    })
  })

  onDestroy(() => {
    fetchIO.destroy()
  })
</script>

{#if $service.context.posts?.value.length}
  {#each $service.context.posts.value as i}
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

<div bind:this={dummy} />

<!--

{#if $state.matches('done') === false}
  <div bind:this={dummy} />
{/if}

{#if $state.matches('loading')}
  <div>Loading...</div>
{:else if $state.matches('failure')}
  <div>{$state.context.errorMessage}</div>
{/if}

-->
