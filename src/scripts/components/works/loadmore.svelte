<script lang="ts">
  import { onMount } from 'svelte'
  import { useIntersectionWatch, useDOMRef, useSlot } from 'lake'
  import Hover from './hover'
  // import { match, P } from 'ts-pattern'

  export let totalPage: number

  const posts: any[] = []

  let refFetcher: HTMLElement

  console.log(totalPage)

  onMount(() => {
    const { refs } = useDOMRef<{ project: HTMLElement[] }>('project')

    const { addChild } = useSlot()

    addChild(Hover, refs.project)

    useIntersectionWatch(
      refFetcher,
      ([_entry]) => {
        //
      },
      {
        rootMargin: '0px 0px 25% 0px',
      }
    )
  })
</script>

{#if posts.length > 0}
  {#each posts as i}
    <article class="o-grid__item">
      <a href="./{i.slug}/" data-ref="project" data-color={i.color}>
        <div class="u-absolute u-pos-tl u-fit" data-scroll-skew>
          <div class="works-eyecatch">
            <img
              src={i.eyecatch.pc.src}
              srcset={i.eyecatch.pc.srcset}
              class="grayscale-100 opacity-[.8] filter"
              width={i.eyecatch.pc.width}
              height={i.eyecatch.pc.height}
              loading="lazy"
              alt=""
            />
          </div>
          <div class="works-entry__hgroup">
            <p>
              <!--{// zeroPadding(i.index, 2)}-->
              <span>Project</span>
            </p>
            <h2>
              {@html i.title}
            </h2>
          </div>
        </div>
      </a>
    </article>
  {/each}
{/if}

<div class="refFetcher" bind:this={refFetcher} />

<style>
  .refFetcher {
    position: absolute;
    bottom: 0;
  }
</style>
