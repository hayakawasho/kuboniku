export interface IComponent {
  init(
    el: HTMLElement,
    props: {
      [key: string]: any
    }
  ): void
  destroy(): void
}
