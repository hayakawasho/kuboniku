import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import styles from './nav.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { uiSelector, SET_MENU_ANIMATING, CLOSE_MENU } from '~/state/ui';
import { gsap } from 'gsap';
import Utils from '~/foundation/utils/Utils';

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

    dispatch(SET_MENU_ANIMATING(true));

    mount.style.willChange = 'clip-path';

    await Utils.nextTick();

    tl.play(0);
  };

  const hide = async () => {
    const mount = navRef.current;
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

    dispatch(SET_MENU_ANIMATING(true));

    mount.style.willChange = 'clip-path';

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
          <div className={`${styles.navMenu__mask} u-mobile`} />
          <div className={`${styles.navMenu__bg} u-mobile`} ref={navRef} />
          <ul className={styles.menuList}>
            <li>
              <Link href="/works">
                <a className={styles.link} onClick={closeMenu}>
                  Works
                </a>
              </Link>
            </li>
            <li>
              <a className={styles.link} href="mailto:k.bo.n10.05@gmail.com">
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
