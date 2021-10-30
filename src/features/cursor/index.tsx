import constate from 'constate';
import { useState, useCallback } from 'react';

const useMousePos = () => {
  return {};
};

export const [MousePositionProvider, useMousePositionContext] = constate(
  useMousePos
);
