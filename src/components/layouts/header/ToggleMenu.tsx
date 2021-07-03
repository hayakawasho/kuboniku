import React, { useState, useEffect, useRef } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { gsap } from 'gsap';
import tw, { css } from 'twin.macro';
import { useMenuContext } from '@/context'

const ToggleMenu = () => {
  const { isMenuOpen, isMenuAnimating } = useMenuContext();
  const ref = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  /*
  const [initialState, setInitialState] = useState(false);
  // const { menuOpen, menuAnimating } = useSelector(uiSelector);
  // const dispatch = useDispatch();
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
  */

  return (
    <>
      <button
        type="button"
        css={menu}
        //className={`u-mobile ${menuOpen ? 'is-open' : ''} ${menuAnimating ? 'is-animating' : ''}`}
        aria-label="menu-toggle"
        //onClick={handleClick}
        ref={ref}
      >
        <div css={burger}>
          <div css={burger__line} ref={topRef} />
          <div css={burger__line} ref={bottomRef} />
        </div>
      </button>
    </>
  );
};

export { ToggleMenu };

const menu = css`
  ${tw`fixed`}
  top: .8rem;
  right: 1rem;
  width: 4rem;
  height: 4rem;
  z-index: 101;

  &.is-animating {
    pointer-events: none;
  }
`;

const burger = css`
  ${tw`relative w-full h-full my-0 mx-auto transform-gpu flex items-center justify-center flex-col`}
  z-index: 2;
  transform: translateZ(0);
`;

const burger__line = css`
  width: 20px;
  height: 1px;
  background-color: #fff;
  transform-origin: left;

  &:nth-of-type(2) {
    margin: 5px 0 0;
    transform: scaleX(calc(32 / 40));
  }
`;
