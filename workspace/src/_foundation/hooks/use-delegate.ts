// import { useUnmount } from "lake";
// const delegate = require("delegate");

export const useDelegate = (
  selectors: string,
  eventType: keyof HTMLElementEventMap,
  handler: (event: keyof HTMLElementEventMap & { delegateTarget: HTMLElement }) => void
) => {
  // const delegation = delegate(selectors, eventType, handler, false);
  // useUnmount(() => {
  //   delegation.destroy();
  // });
};
