<script lang="ts">
  import { onMount } from 'svelte'
  import { useIntersectionWatch } from 'lake'
  // import { match, P } from 'ts-pattern'

  export let total: number

  const PER_PAGE = 10
  const TOTAL_PAGE = Math.ceil(total / PER_PAGE)
  const MAX_RETRY = 3

  const posts: any[] = []

  let refFetchTrigger: HTMLElement

  onMount(() => {
    const MAX = TOTAL_PAGE - 1
    console.log(MAX, MAX_RETRY)
    // let count = 0

    const { unwatch: _ } = useIntersectionWatch(
      refFetchTrigger,
      ([_entry]) => {
        //
      },
      {
        rootMargin: '0px 0px 25% 0px',
      }
    )

    return () => {
      //
    }
  })
</script>

{#if posts.length > 0}
  {#each posts as i}
    <article class="o-grid__item">
      <a href="./{i.slug}/">
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

<div class="works-loader" bind:this={refFetchTrigger} />
