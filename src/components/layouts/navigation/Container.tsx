import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { uiSelector, SET_MENU_ANIMATING, CLOSE_MENU } from '~/state/ui';
import { gsap } from 'gsap';
import Utils from '~/foundation/utils/Utils';
import { qsa } from '~/foundation/utils/dom';
import tw, { css } from 'twin.macro';
import Presenter from './Presenter';

const clip = {
  x1: 100,
  x2: 100,
};

const Component = React.memo(() => {
  const [initialState, setInitialState] = useState(false);
  const { menuOpen, menuAnimating } = useSelector(uiSelector);
  const dispatch = useDispatch();
  const navRef = useRef(null);
  const [isMenuOpen, isMenuAnimating, { closeMenu }] = useContext();

  const toggleMenu = useCallback(() => {
    if (menuOpen) {
      show();
    } else {
      hide();
    }
  }, [menuOpen]);

  const show = useCallback(async () => {
    const mount = navRef.current;
    const navLabelDoms = qsa('.js-navLabel');

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        updateClip();
      },
      onComplete: () => {
        mount.style.willChange = '';
        dispatch(SET_MENU_ANIMATING(false));
      },
    });

    tl.fromTo(
      clip,
      0.8,
      {
        x1: 100,
      },
      {
        x1: 0,
        ease: 'power3.inOut',
      }
    );

    tl.fromTo(
      clip,
      0.9,
      {
        x2: 100,
      },
      {
        x2: 0,
        ease: 'power3.inOut',
      },
      '-=0.8'
    );

    tl.fromTo(
      navLabelDoms,
      {
        skewY: -15,
        y: 40,
        scale: 0.9,
        opacity: 1,
      },
      {
        duration: 0.8,
        skewY: 0,
        y: 0,
        scale: 1,
        stagger: 0.06,
        ease: 'power3.inOut',
      },
      '-=0.9'
    );

    dispatch(SET_MENU_ANIMATING(true));

    await Utils.nextTick();

    tl.play(0);
  }, []);

  const hide = useCallback(() => {
    const mount = navRef.current;
    const navLabelDoms = qsa('.js-navLabel');

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        updateClip();
      },
      onComplete: () => {
        mount.style.willChange = '';
        mount.style.clipPath = '';
        mount.style.webkitClipPath = '';
        dispatch(SET_MENU_ANIMATING(false));
      },
    });

    tl.fromTo(
      clip,
      0.8,
      {
        x1: 0,
      },
      {
        x1: 100,
        ease: 'power3.inOut',
      }
    );

    tl.fromTo(
      clip,
      0.9,
      {
        x2: 0,
      },
      {
        x2: 100,
        ease: 'power3.inOut',
      },
      '-=0.8'
    );

    tl.to(
      navLabelDoms.reverse(),
      {
        duration: 0.8,
        skewY: 15,
        y: -40,
        scale: 0.9,
        opacity: 0,
        stagger: 0.06,
        ease: 'power3.inOut',
      },
      '-=.9'
    );

    dispatch(SET_MENU_ANIMATING(true));

    tl.play(0);
  }, []);

  const updateClip = useCallback(() => {
    const mount = navRef.current;

    mount.style.clipPath = `polygon(
      ${clip.x1}% 0px,
      100% 0px,
      100% 100vh,
      ${clip.x2}% 100vh
    )`;

    mount.style.webkitClipPath = `polygon(
      ${clip.x1}% 0px,
      100% 0px,
      100% 100vh,
      ${clip.x2}% 100vh
    )`;
  }, [clip.x1, clip.x2]);

  const closeMenu = useCallback(() => {
    dispatch(CLOSE_MENU());
  }, []);

  useEffect(() => {
    !initialState && setInitialState(true);
    initialState && toggleMenu();
  }, [menuOpen]);

  return <Presenter />;
});

export default Component;
