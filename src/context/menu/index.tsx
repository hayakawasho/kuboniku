import { useState, useCallback, useRef } from 'react';
import constate from 'constate';

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), []);
  const isMenuAnimating = useRef(false);
  const onMenuAnimating = useCallback(() => setIsMenuOpen(false), []);

  return { isMenuOpen, isMenuAnimating: isMenuAnimating.current, onMenuOpen, onMenuClose };
};

export const [MenuProvider, useMenuContext] = constate(useMenu);
