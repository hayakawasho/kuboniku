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
    dispatch(SET_WINDOW_HEIGHT(height));
    updateVh(height);
  };

  useEffect(() => {
    setSize(window.innerWidth, window.innerHeight);

    new ResizeObserverHandler({
      el: docRef.current,
      callback: debounce((entry: ResizeObserverEntry) => {
        const rect = entry.contentRect;
        const { width, height } = rect;
        dispatch(SET_DOC_HEIGHT(height));
        setSize(width, window.innerHeight);
      }, 30),
    }).init();
  }, [updateVh]);

  return (
    <>
      <div className="viewport" />
      <div ref={docRef} className="docSize" />
    </>
  );
});

export default Component;
