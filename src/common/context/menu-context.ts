import constate from 'constate';
import { useState, useCallback, useRef } from 'react';
import { useUpdateEffect } from '@/common/hooks';
const scrollLock = require('scroll-lock'); // eslint-disable-line @typescript-eslint/no-var-requires

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), []);

  const onMenuToggle = useCallback(() => {
    isMenuOpen ? onMenuClose() : onMenuOpen();
  }, [isMenuOpen]);

  useUpdateEffect(() => {
    isMenuOpen ? scrollLock.disablePageScroll() : scrollLock.enablePageScroll();
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    onMenuOpen,
    onMenuClose,
    onMenuToggle,
  };
};

export const [MenuProvider, useMenuContext] = constate(useMenu);
