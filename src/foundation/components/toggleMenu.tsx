import React, { useState, useEffect } from 'react';
import headerCSS from './header.module.scss';
import { uiSelector, OPEN_MENU, CLOSE_MENU } from '~/state/ui';
import { useSelector, useDispatch } from 'react-redux';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const Component = React.memo(() => {
  const [initialState, setInitialState] = useState(false);
  const { menuOpen, menuAnimating } = useSelector(uiSelector);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    if (menuOpen) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
  };

  const handleClick = evt => {
    if (menuOpen) {
      dispatch(CLOSE_MENU());
    } else {
      dispatch(OPEN_MENU());
    }
  };

  useEffect(() => {
    !initialState && setInitialState(true);
    initialState && toggleMenu();
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        className={`${headerCSS.menu} u-mobile ${menuOpen ? 'is-open' : ''} ${
          menuAnimating ? 'is-animating' : ''
        }`}
        aria-label="menu-toggle"
        onClick={handleClick}
      >
        <div className="c-burger">
          <div className="c-burger__line || js-burger__line" />
          <div className="c-burger__line || js-burger__line" />
        </div>
      </button>
    </>
  );
});

export default Component;
