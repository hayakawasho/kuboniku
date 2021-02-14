import React, { useEffect, useRef } from 'react';
import ResizeObserverHandler from '~/foundation/utils/resizeObserverHandler';
import debounce from 'lodash.debounce';
import { EVENTS } from '~/foundation/constants/const';

let E;

if (process.browser) {
  E = require('~/foundation/utils/E').default;
}

const Component = React.memo(() => {
  const ref = useRef(null);

  useEffect(() => {
    function setSize(width: number, height: number) {
      E.emit(EVENTS.RESIZE, { width, height });
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    function handleResize(entry: ResizeObserverEntry) {
      const rect = entry.contentRect;
      const { width, height } = rect;
      setSize(width, height);
    }

    setSize(window.innerWidth, window.innerHeight);

    new ResizeObserverHandler({
      el: ref.current,
      callback: debounce(
        (entry: ResizeObserverEntry) => handleResize(entry),
        30
      ),
    }).init();

    setSize(window.innerWidth, window.innerHeight);
  });

  return (
    <>
      <div ref={ref} className="viewport" />
    </>
  );
});

export default Component;
