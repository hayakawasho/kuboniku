import React, { useState, useEffect, useRef } from 'react';
import headerCSS from './header.module.scss';
import { uiSelector, OPEN_MENU, CLOSE_MENU } from '~/state/ui';
import { useSelector, useDispatch } from 'react-redux';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { gsap } from 'gsap';

const Component: React.FC = React.memo(() => {
  const [initialState, setInitialState] = useState(false);
  const { menuOpen, menuAnimating } = useSelector(uiSelector);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const handleClick = evt =>
    menuOpen ? dispatch(CLOSE_MENU()) : dispatch(OPEN_MENU());

  const toggleMenu = () => {
    if (menuOpen) {
      disablePageScroll();
      show();
    } else {
      enablePageScroll();
      hide();
    }
  };

  const show = () => {
    gsap.to(ref.current, 0.8, {
      rotation: 180,
      ease: 'power3.inOut',
    });

    gsap.to(topRef.current, 0.8, {
      y: 2.5,
      ease: 'power3.inOut',
    });

    gsap.to(bottomRef.current, 0.8, {
      scaleX: 0,
      ease: 'power3.inOut',
    });
  };

  const hide = () => {
    gsap.fromTo(
      ref.current,
      {
        rotation: 180,
      },
      {
        duration: 0.8,
        rotation: 360,
        clearProps: 'transform',
        ease: 'power3.inOut',
      }
    );

    gsap.to(topRef.current, 0.8, {
      y: 0,
      ease: 'power3.inOut',
    });

    gsap.to(bottomRef.current, 0.8, {
      scaleX: 32 / 40,
      ease: 'power3.inOut',
    });
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
        ref={ref}
      >
        <div className="c-burger">
          <div className="c-burger__line" ref={topRef} />
          <div className="c-burger__line" ref={bottomRef} />
        </div>
      </button>
    </>
  );
});

export default Component;
