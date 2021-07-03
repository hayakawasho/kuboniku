import { useEffect, useState, useRef, useCallback, useContext } from 'react';
import Presenter from './Presenter';
import { useMenuContext } from '@/context';
import { useEffectIf } from '@/foundation/utils';

const Component = () => {
  const { isMenuOpen, isMenuAnimating } = useMenuContext();

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      // show();
    } else {
      // hide();
    }
  }, [isMenuOpen]);


  useEffectIf(() => {
    // !initialState && setInitialState(true);
    // initialState && toggleMenu();
  }, [isMenuOpen], false);

  const props = {
    toggleMenu
  }

  return <Presenter {...props} />;
};

export default Component;
