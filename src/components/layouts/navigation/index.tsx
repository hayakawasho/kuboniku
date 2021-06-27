import { useState, useCallback } from 'react';
import constate from 'constate';

const useMenu = ({ initialValue = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(initialValue);
  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), []);

  return { isMenuOpen, onMenuOpen, onMenuClose };
};

export const [MenuProvider, useMenuContext] = constate(useMenu);
