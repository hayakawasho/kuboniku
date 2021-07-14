import { useState, useCallback } from 'react';
import constate from 'constate';

const useWindowScroll = () => {
  return {};
};

export const [WindowScrollProvider, useWindowScrollContext] = constate(
  useWindowScroll
);
