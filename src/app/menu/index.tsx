import { useState, useCallback, useRef } from 'react';
import constate from 'constate';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { useUpdateEffect } from 'react-use';

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const onMenuClose = useCallback(() => setIsMenuOpen(false), []);
  const isMenuAnimating = useRef(false);

  const setMenuAnimationStart = useCallback(
    () => (isMenuAnimating.current = true),
    [isMenuAnimating.current]
  );

  const setMenuAnimationEnd = useCallback(
    () => (isMenuAnimating.current = false),
    [isMenuAnimating.current]
  );

  const onMenuToggle = useCallback(() => {
    isMenuOpen ? onMenuClose() : onMenuOpen();
  }, [isMenuOpen]);

  useUpdateEffect(() => {
    isMenuOpen ? disablePageScroll() : enablePageScroll();
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    isMenuAnimating: isMenuAnimating.current,
    onMenuOpen,
    onMenuClose,
    onMenuToggle,
    setMenuAnimationStart,
    setMenuAnimationEnd,
  };
};

export const [MenuProvider, useMenuContext] = constate(useMenu);
