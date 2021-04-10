import React, { useEffect, useRef, useCallback } from 'react';
import ResizeObserverHandler from '~/foundation/utils/resizeObserverHandler';
import debounce from 'lodash.debounce';
import { EVENTS } from '~/foundation/constants/const';
import { useDispatch } from 'react-redux';
import { SET_DOC_HEIGHT, SET_WINDOW_HEIGHT } from '~/state/app';

let E;

if (process.browser) {
  E = require('~/foundation/utils/E').default;
}

const Component = React.memo(() => {
  const docRef = useRef(null);
  const dispatch = useDispatch();

  const updateVh = useCallback(height => {
    const vh = height * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const setSize = (width: number, height: number) => {
    E.emit(EVENTS.RESIZE, { width, height });
  };

  useEffect(() => {
    setSize(window.innerWidth, window.innerHeight);

    const docObserve = new ResizeObserverHandler({
      el: docRef.current,
      callback: debounce((entry: ResizeObserverEntry) => {
        const rect = entry.contentRect;
        const { width, height } = rect;
        const wh = window.innerHeight;
        setSize(width, wh);
        dispatch(SET_DOC_HEIGHT(height));
        dispatch(SET_WINDOW_HEIGHT(wh));
        updateVh(wh);
      }, 30),
    });

    docObserve.init();

    return () => {
      docObserve.destroy();
    };
  }, [updateVh]);

  return <div ref={docRef} className="docSizeRef" />;
});

export default Component;
