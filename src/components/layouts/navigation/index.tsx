import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSelector, useDispatch } from 'react-redux';
import { uiSelector, SET_MENU_ANIMATING, CLOSE_MENU } from '~/state/ui';
import { gsap } from 'gsap';
import Utils from '~/foundation/utils/Utils';
import { qsa } from '~/foundation/utils/dom';
import tw, { css } from 'twin.macro';

const clip = {
  x1: 100,
  x2: 100,
};

const Component = React.memo(() => {
  const [initialState, setInitialState] = useState(false);
  const { menuOpen, menuAnimating } = useSelector(uiSelector);
  const dispatch = useDispatch();
  const navRef = useRef(null);

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

  return (
    <>
      <nav
        css={navMenu}
        className={`${menuOpen ? 'is-menuOpen' : ''} ${
          menuAnimating ? 'is-menuAnimating' : ''
        }`}
      >
        <div tw="w-full h-full relative">
          <div css={navMenu__mask} className="u-mobile" onClick={closeMenu} />
          <div css={navMenu__bg} className="u-mobile" ref={navRef} />
          <ul css={menuList}>
            <li>
              <Link scroll={false} href="/profile">
                <a css={link} className="js-navLabel" onClick={closeMenu}>
                  Profile
                </a>
              </Link>
            </li>
            <li>
              <Link scroll={false} href="/works">
                <a css={link} className="js-navLabel" onClick={closeMenu}>
                  Works
                </a>
              </Link>
            </li>
            <li>
              <a
                css={link}
                className="js-navLabel"
                href="mailto:k.bo.n10.05@gmail.com"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
});

export default Component;

const navMenu__mask = css`
  ${tw`absolute w-full h-full top-0 left-0 opacity-0`}
  background-color: #000000;
  transition: opacity 0.8s;

  .is-menuOpen & {
    opacity: 0.5;
  }

  is-menuAnimating & {
    will-change: opacity;
  }
`;

const navMenu__bg = css`
  ${tw`absolute w-full h-screen top-0 right-0`}
  width: calc(46rem * 0.5);
  background-color: #000;
  clip-path: polygon(
    100% 0px,
    100% 0px,
    100% calc(var(--vh) * 100),
    100% calc(var(--vh) * 100)
  );
  backface-visibility: hidden;

  is-menuAnimating & {
    will-change: clip-path;
  }
`;

const menuList = css`
  ${tw`absolute w-full h-screen top-0 right-0 text-right`}
  padding-top: 7rem;
  padding-right: 3rem;

  @media (min-width: 640px) {
    padding-top: 4rem;
    padding-right: 4rem;
  }

  > li {
    ${tw`overflow-hidden`}
  }
`;

const link = css`
  ${tw`inline-block align-top pointer-events-auto opacity-0`}
  font-family: var(--font-en);
  font-weight: 500;
  font-size: 1.4rem;
  line-height: calc(86 / 28);
  letter-spacing: 0.41em;
  color: #fff;

  @media (min-width: 640px) {
    font-size: 1.3rem;
    line-height: calc(52 / 26);
  }

  is-menuAnimating & {
    will-change: transform, opacity;
  }
`;

const navMenu = css`
  ${tw`fixed w-full h-screen overflow-hidden pointer-events-none top-0 left-0`}
  z-index: 100;

  &.is-menuOpen {
    pointer-events: all;
  }

  &is-menuAnimating {
    pointer-events: none;
  }
`;
