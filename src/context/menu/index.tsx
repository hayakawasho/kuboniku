import { useState, useCallback } from 'react';
import constate from 'constate';

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), []);

  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  return { isMenuOpen, onMenuOpen, onMenuClose };
};

export const [MenuProvider, useMenuContext] = constate(useMenu);
