import { useState, useCallback } from 'react';
import constate from 'constate';

const useMousePos = () => {
  return {};
};

export const [MousePositionProvider, useMousePositionContext] = constate(
  useMousePos
);
