import { useState, useCallback } from 'react';
import constate from 'constate';
import Presenter from './Presenter';
import { useMenuContext } from '@/context';

const Component = ({ initialValue = false }) => {
  const { isMenuOpen, isMenuAnimating } = useMenuContext();


  return <Presenter />;
};

export default Component;
