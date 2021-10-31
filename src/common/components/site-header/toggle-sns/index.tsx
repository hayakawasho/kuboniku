import useToggle from "@react-hook/toggle"
import cn from "classnames"
import { gsap } from "gsap"
import { useMemo } from "react"
import { useUpdateEffect, useDidMount, useSelector } from "@/common/hooks"

const ToggleSns = () => {
  const [q, ref] = useSelector()
  const [isOpen, toggle] = useToggle(false, true)
  const tl = useMemo(() => gsap.timeline({ paused: true }), [])

  useDidMount(() => {
    tl.add(
      gsap.to(q(".js-snsTrigger"), {
        duration: 0.55,
        rotation: 90,
        ease: "power3.inOut",
      })
    ).add(
      gsap.fromTo(
        q(".js-snsLink"),
        {
          y: 20,
        },
        {
          duration: 0.5,
          autoAlpha: 1,
          y: 0,
          stagger: 0.07,
          force3D: true,
          ease: "power3.out",
        }
      ),
      "-=.4"
    )
  })

  useUpdateEffect(() => {
    isOpen ? tl.play() : tl.reverse()
  }, [isOpen])

  return (
    <div className="sns" ref={ref}>
      <ul className="snsList">
        <li className="snsList__item">
          <a
            href="https://www.facebook.com/k.b.nagisa"
            target="_blank"
            className="snsList__a js-snsLink"
          >
            Fb
          </a>
        </li>
        <li className="snsList__item">
          <a href="#" target="_blank" className="snsList__a js-snsLink">
            Tw
          </a>
        </li>
      </ul>
      <button
        type="button"
        className={"plus js-snsTrigger " + cn({ "is-open": isOpen })}
        onClick={toggle}
      >
        <div className="u-in">
          <div className="plus__x absolute top-1/2 left-0" />
          <div className="plus__y absolute top-1/2 left-0" />
        </div>
      </button>
    </div>
  )
}

export { ToggleSns }
