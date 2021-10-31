import Link from "next/link"
import * as React from "react"
import { ToggleMenu } from "./toggle-menu"
import { ToggleSns } from "./toggle-sns"

const Header = () => {
  return (
    <header className="fixed">
      <Link href="/">
        <a className="fixed block pointer-events-auto brandLogo">
          <i className="icon-logo" />
        </a>
      </Link>
      <ToggleMenu />
      <ToggleSns />
      <small className="fixed inline-block pointer-events-none copyright">
        &copy; KuboNiku.com
      </small>
    </header>
  )
}

export { Header }
