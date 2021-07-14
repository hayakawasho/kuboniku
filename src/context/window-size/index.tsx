import { useState, useCallback } from 'react';
import constate from 'constate';

const useWindowSize = () => {
  return {};
};

export const [WindowSizeProvider, useWindowSizeContext] = constate(
  useWindowSize
);
