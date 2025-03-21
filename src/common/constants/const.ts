export const EVENTS = {
  DOM_READY: "EVENT.DOM_READY",
  ROUTE_START: "EVENT.ROUTE_START",
  ROUTE_UPDATE: "EVENT.ROUTE_UPDATE",
  ENTER_MOBILE_VIEWPORT: "EVENT.ENTER_MOBILE_VIEWPORT",
  ENTER_PC_VIEWPORT: "EVENT.ENTER_PC_VIEWPORT",
  NATIVE_SCROLL: "NATIVE_SCROLL",
  WHEEL: "NATIVE_WHEEL",
  MOUSE_MOVE: "EVENT.MOUSE_MOVE",
  RESIZE: "EVENT.RESIZE",
  SCROLL: "EVENT.SCROLL",
  TICK: "EVENT.TICK",
  CLICK: "EVENT.CLICK",
  OPEN_MENU: "EVENT.OPEN_MENU",
  CLOSE_MENU: "EVENT.CLOSE_MENU",
}

export const SIZES = {
  DEFAULT: 640,
}

export const WP_API_END_POINT =
  process.env.WP_API_END_POINT || "https://wp.kuboniku.com/graphql"
