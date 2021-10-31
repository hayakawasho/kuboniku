import type ASScroll from "@ashthornton/asscroll"
import constate from "constate"
import { gsap } from "gsap"
import {
  useRef,
  useCallback,
  useState,
  useEffect,
  MutableRefObject,
} from "react"
import { useRoutingContext } from "@/common/context"
import { useUpdateEffect } from "@/common/hooks"

type IProps = {
  containerRef: MutableRefObject<HTMLDivElement | null>
}

const createUseScroll = ({ containerRef }: IProps) => {
  const scrollRef = useRef<ASScroll | null>(null)
  const [isReady, setIsReady] = useState(false)
  const { location } = useRoutingContext()

  useEffect(() => {
    ;(async () => {
      try {
        const ASScroll = (await import("@ashthornton/asscroll")).default

        scrollRef.current = new ASScroll({
          containerElement: "[data-scroll]",
          scrollElements: "[data-scroll-item]",
          ease: 0.2,
          disableRaf: true,
        })

        gsap.ticker.add(scrollRef.current.update)

        setIsReady(true)
      } catch (error) {
        throw Error(`asscroll: ${error}`)
      }
    })()

    return () => {
      scrollRef.current?.disable()
      setIsReady(false)
    }
  }, [])

  const restart = (newScrollElements: Element[]) => {
    if (!scrollRef.current) {
      return
    }
    scrollRef.current.enable({ newScrollElements, reset: true })
  }

  const resume = useCallback(() => {
    if (!scrollRef.current) {
      return
    }
    scrollRef.current.enable({ restore: true })
  }, [scrollRef.current])

  const disable = useCallback(() => {
    if (!scrollRef.current) {
      return
    }
    scrollRef.current.disable()
  }, [scrollRef.current])

  useUpdateEffect(() => {
    disable()

    const q = gsap.utils.selector(containerRef.current)
    restart(q("[data-scroll-item]"))
  }, [location])

  return {
    ctx: scrollRef.current,
    isReady,
    resume,
    disable,
  }
}

export const [ScrollProvider, useScrollContext] = constate(createUseScroll)
