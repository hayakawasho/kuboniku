import cn from "classnames"
import { gsap } from "gsap"
import * as React from "react"
import { useMenuContext } from "@/common/context"
import { useUpdateEffect, useSelector } from "@/common/hooks"

const ToggleMenu = () => {
  const { isMenuOpen, onMenuToggle } = useMenuContext()

  const [q, triggerRef] = useSelector()

  useUpdateEffect(() => {
    isMenuOpen ? openAnim() : closeAnim()
  }, [isMenuOpen])

  const openAnim = () => {
    if (!triggerRef.current) {
      return
    }

    gsap.to(triggerRef.current, {
      duration: 0.8,
      rotation: 180,
      ease: "power3.inOut",
    })

    gsap.to(q(".js-burgerLine--1"), {
      y: 2.5,
      duration: 0.8,
      ease: "power3.inOut",
    })

    gsap.to(q(".js-burgerLine--2"), {
      duration: 0.8,
      scaleX: 0,
      ease: "power3.inOut",
    })
  }

  const closeAnim = () => {
    if (!triggerRef.current) {
      return
    }

    gsap.fromTo(
      triggerRef.current,
      {
        rotation: 180,
      },
      {
        duration: 0.8,
        rotation: 360,
        clearProps: "transform",
        ease: "power3.inOut",
      }
    )

    gsap.to(q(".js-burgerLine--1"), {
      duration: 0.8,
      y: 0,
      ease: "power3.inOut",
    })

    gsap.to(q(".js-burgerLine--2"), {
      duration: 0.8,
      scaleX: 32 / 40,
      ease: "power3.inOut",
    })
  }

  return (
    <button
      type="button"
      className={cn({ "is-open": isMenuOpen }) + " burger u-mobile"}
      onClick={onMenuToggle}
      ref={triggerRef}
    >
      <div className="relative w-full h-full my-0 mx-auto transform-gpu flex items-center justify-center flex-col z-10">
        <div className="burger__line js-burgerLine--1" />
        <div className="burger__line js-burgerLine--2" />
      </div>
    </button>
  )
}

export { ToggleMenu }
