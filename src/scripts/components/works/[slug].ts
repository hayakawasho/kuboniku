import { defineComponent, useSlot, useMount, useUnmount } from 'lake'
import SkewScrollContainer from '../skew-scroll'
import type { GlobalContext } from '@/const'
import { Tween } from '@/libs'
import { colorCodeMutators } from '@/states/color'

type Props = GlobalContext

export default defineComponent({
  tagName: 'WorksDetail',
  setup(el, { initialLoad }: Props) {
    const { addChild } = useSlot()

    const colorCode = el.dataset.color!
    colorCodeMutators(colorCode)

    addChild(el, SkewScrollContainer)

    useMount(() => {
      if (initialLoad) {
        return
      }

      Tween.serial(
        Tween.prop(el, {
          opacity: 0,
        }),
        Tween.wait(500),
        Tween.tween(el, 1, 'expo.out', {
          opacity: 1,
        })
      )
    })

    useUnmount(() => {
      Tween.tween(el, 1, 'expo.out', {
        opacity: 0,
      })
    })
  },
})
