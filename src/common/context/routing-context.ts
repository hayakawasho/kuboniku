import constate from "constate"
import { useState, useCallback } from "react"

type ILocation = {
  hash: string
  host: string
  hostname: string
  href: string
  origin: string
  pathname: string
  port: string
  protocol: string
  search: string
}

const createUseRouting = ({ location }: { location: ILocation }) => {
  const [isRoutingActive, setIsRoutingActive] = useState(false)

  const handleRouteUpdate = useCallback(() => {
    console.log(location, "route")
  }, [])

  return {
    location,
    handleRouteUpdate,
  }
}

export const [RoutingProvider, useRoutingContext] = constate(createUseRouting)
