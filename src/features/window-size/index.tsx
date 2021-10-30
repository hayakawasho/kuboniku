import constate from 'constate';
import { useState, useCallback } from 'react';

const useWindowSize = () => {
  return {};
};

export const [WindowSizeProvider, useWindowSizeContext] = constate(
  useWindowSize
);
