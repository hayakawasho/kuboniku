import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './nav.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { uiSelector, SET_MENU_ANIMATING, CLOSE_MENU } from '~/state/ui';
import { gsap } from 'gsap';
import Utils from '~/foundation/utils/Utils';
import { qsa } from '~/foundation/utils/dom';

const clip = {
  x1: 100,
  x2: 100,
};

/**
                      +1
                      |
                      |
                      |
                      |
                      |
  -1 ------------------------------------ +1
                      |
                      |
                      |
                      |
                      |
                      -1
  */

const Component = React.memo(() => {
  const [initialState, setInitialState] = useState(false);
  const { menuOpen, menuAnimating } = useSelector(uiSelector);
  const dispatch = useDispatch();
  const navRef = useRef(null);

  const toggleMenu = () => {
    if (menuOpen) {
      show();
    } else {
      hide();
    }
  };

  const show = async () => {
    const mount = navRef.current;
    const navLinksDOM = qsa('.js-navLink');

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
      navLinksDOM,
      {
        skewY: -20,
        y: 60,
        scale: 0.9,
        opacity: 1,
      },
      {
        duration: 0.8,
        skewY: 0,
        y: 0,
        scale: 1,
        stagger: 0.1,
        ease: 'power3.inOut',
      },
      '-=0.9'
    );

    await Utils.nextTick();

    tl.play(0);
  };

  const hide = async () => {
    const mount = navRef.current;
    const navLinksDOM = qsa('.js-navLink');

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
      navLinksDOM.reverse(),
      {
        duration: 0.6,
        skewY: 20,
        y: -60,
        scale: 0.9,
        opacity: 0,
        stagger: 0.085,
        ease: 'power3.inOut',
      },
      '-=1.0'
    );

    dispatch(SET_MENU_ANIMATING(true));

    await Utils.nextTick();

    tl.play(0);
  };

  const updateClip = () => {
    const mount = navRef.current;

    mount.style.clipPath = `polygon(
      ${clip.x1}% 0px,
      100% 0px,
      100% calc(var(--vh) * 100),
      ${clip.x2}% calc(var(--vh) * 100)
    )`;

    mount.style.webkitClipPath = `polygon(
      ${clip.x1}% 0px,
      100% 0px,
      100% calc(var(--vh) * 100),
      ${clip.x2}% calc(var(--vh) * 100)
    )`;
  };

  const closeMenu = () => {
    dispatch(CLOSE_MENU());
  };

  useEffect(() => {
    !initialState && setInitialState(true);
    initialState && toggleMenu();
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`${styles.navMenu} ${menuOpen ? 'is-open' : ''} ${
          menuAnimating ? 'is-animating' : ''
        }`}
      >
        <div className="u-in">
          <div
            className={`${styles.navMenu__mask} u-mobile`}
            onClick={closeMenu}
          />
          <div className={`${styles.navMenu__bg} u-mobile`} ref={navRef} />
          <ul className={styles.menuList}>
            <li>
              <Link href="/works">
                <a className={`${styles.link} js-navLink`} onClick={closeMenu}>
                  Works
                </a>
              </Link>
            </li>
            <li>
              <a
                className={`${styles.link} js-navLink`}
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
