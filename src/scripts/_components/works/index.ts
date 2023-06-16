import { withSvelte as _, defineComponent, useSlot, useDomRef, useMount, useUnmount } from 'lake'
import { Tween } from '@/_libs'
import ClipImage from './clip-image'
import SkewScrollContainer from '../skew-scroll'
import type { GlobalContext } from '@/_foundation/const'
// import More from './more.svelte'

// const PER_PAGE = 10

export default defineComponent({
  setup(el, { initialLoad }: GlobalContext) {
    const { addChild } = useSlot()
    const { refs } = useDomRef<{
      index: HTMLElement
      project: HTMLElement[]
    }>('index', 'project')

    // const total = Number(refs.index.dataset.total)
    // const totalPage = Math.ceil(total / PER_PAGE)

    // addChild(refs.index, withSvelte(More, 'More'), {
    //   totalPage,
    // })
    addChild(el, SkewScrollContainer)
    addChild(refs.project, ClipImage)

    useMount(() => {
      if (initialLoad) {
        return
      }

      console.log('[mount] /')

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(0.2),
        Tween.tween(el, 0.55, 'power3.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      console.log('[unmount] /')

      Tween.tween(el, 0.55, 'power3.out', {
        opacity: 0,
      })
    })
  },
  tagName: 'Works',
})
