import { gsap } from "gsap"
import { useRef, useMemo } from "react"

// https://greensock.com/react-advanced/#useSelector

const useSelector = () => {
  const ref = useRef<any>(null)
  const q = useMemo(() => gsap.utils.selector(ref), [ref])
  return [q, ref] as const
}

export { useSelector }
