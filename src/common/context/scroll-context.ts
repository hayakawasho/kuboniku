import type ASScroll from "@ashthornton/asscroll"
import constate from "constate"
import { gsap } from "gsap"
import { useRef, useState, useEffect, MutableRefObject } from "react"
import { useUpdateEffect } from "@/common/hooks"

type IProps = {
  containerRef: MutableRefObject<HTMLDivElement | null>
  pathname: string
}

const useScroll = ({ containerRef, pathname }: IProps) => {
  const scrollRef = useRef<ASScroll | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const ASScroll = (await import("@ashthornton/asscroll")).default

        scrollRef.current = new ASScroll({
          containerElement: "[data-scroll]",
          scrollElements: "[data-scroll-item]",
          ease: 0.22,
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

  useUpdateEffect(() => {
    scrollRef.current?.disable()

    const q = gsap.utils.selector(containerRef.current)
    scrollRef.current?.enable({
      newScrollElements: q("[data-scroll-item]"),
      reset: true,
    })
  }, [pathname])

  return {
    scroll: scrollRef.current,
    isReady,
  }
}

export const [ScrollProvider, useScrollContext] = constate(useScroll)
