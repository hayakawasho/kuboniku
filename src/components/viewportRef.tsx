import ResizeObserverHandler from '../foundation/utils/resizeObserverHandler'
import E from '../foundation/utils/E'
import debounce from 'lodash.debounce'
import { EVENTS } from '../foundation/constants/const'

const Component = () => {
  const viewportRef = (div: HTMLDivElement) => {
    if (!div) {
      return
    }

    setSize(window.innerWidth, window.innerHeight);

    new ResizeObserverHandler({
      el: div,
      callback: debounce((entry: ResizeObserverEntry) => handleResize(entry), 200)
    }).init();

    function handleResize(entry: ResizeObserverEntry) {
      const rect = entry.contentRect
      const { width, height } = rect;

      setSize(width, height)
    }

    function setSize(width: number, height: number) {
      E.emit(EVENTS.RESIZE, { width, height })
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }

  return (
    <>
      <div ref={viewportRef} />
      <style jsx>{`
        div {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          visibility: hidden;
          z-index: -1;
        }
      `}</style>
    </>
  )
}

export default Component;
