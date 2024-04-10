// import { useUnmount } from "lake";
import E from "@unseenco/e";

type ElementEventListener<K extends keyof HTMLElementEventMap = keyof HTMLElementEventMap> = (
  this: HTMLElement,
  ev: HTMLElementEventMap[K]
) => unknown;

export const useDelegate = <T extends keyof HTMLElementEventMap = keyof HTMLElementEventMap>(
  selectors: string,
  eventType: T,
  listener: ElementEventListener<T>
) => {
  E.delegate(eventType, selectors, listener);
};
