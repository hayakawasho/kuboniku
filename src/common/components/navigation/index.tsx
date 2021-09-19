import { useCallback, useRef } from 'react';
import Link from 'next/link';
import { useMenuContext } from '@/common/context';
import tw, { css } from 'twin.macro';
import { Utils, qsa } from '@/common/utils';
import { useUpdateEffect } from 'react-use';
import { gsap } from 'gsap';

const CLIP_PATH = {
  x1: 100,
  x2: 100,
};

const Navigation = () => {
  const {
    isMenuOpen,
    isMenuAnimating,
    onMenuClose,
    setMenuAnimationStart,
    setMenuAnimationEnd,
  } = useMenuContext();

  const navMenuRef = useRef(null);

  const updateClipPath = useCallback(() => {
    navMenuRef.current.style.clipPath = `polygon(
      ${CLIP_PATH.x1}% 0px,
      100% 0px,
      100% 100vh,
      ${CLIP_PATH.x2}% 100vh
    )`;
  }, [CLIP_PATH.x1, CLIP_PATH.x2]);

  useUpdateEffect(() => {
    isMenuOpen ? showMenu() : hideMenu();
  }, [isMenuOpen]);

  const showMenu = useCallback(async () => {
    const navLabelDoms = qsa('.js-navLabel');

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        updateClipPath();
      },
      onComplete: () => {
        navMenuRef.current.style.willChange = '';
        setMenuAnimationEnd();
      },
    });

    tl.fromTo(
      CLIP_PATH,
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
      CLIP_PATH,
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

    setMenuAnimationStart();

    await Utils.nextTick();

    tl.play(0);
  }, []);

  const hideMenu = useCallback(() => {
    const navLabelDoms = qsa('.js-navLabel');

    const tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        updateClipPath();
      },
      onComplete: () => {
        navMenuRef.current.style.willChange = '';
        navMenuRef.current.style.clipPath = '';
        setMenuAnimationEnd();
      },
    });

    tl.fromTo(
      CLIP_PATH,
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
      CLIP_PATH,
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

    setMenuAnimationStart();

    tl.play(0);
  }, []);

  return (
    <nav
      css={navMenu}
      className={`${isMenuOpen ? 'is-menuOpen' : ''} ${
        isMenuAnimating ? 'is-menuAnimating' : ''
      }`}
    >
      <div tw="w-full h-full relative">
        <div css={navMenu__mask} className="u-mobile" onClick={onMenuClose} />
        <div css={navMenu__bg} className="u-mobile" ref={navMenuRef} />
        <ul css={menuList}>
          <li>
            <Link scroll={false} href="/profile">
              <a css={link} className="js-navLabel" onClick={onMenuClose}>
                Profile
              </a>
            </Link>
          </li>
          <li>
            <Link scroll={false} href="/works">
              <a css={link} className="js-navLabel" onClick={onMenuClose}>
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
  );
};

export { Navigation };

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
  ${tw`absolute h-screen top-0 right-0 text-right`}
  width: calc(46rem * 0.5);
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
  ${tw`inline-block align-top opacity-0`}
  font-family: var(--font-en);
  font-weight: 500;
  font-size: 1.4rem;
  line-height: calc(86 / 28);
  letter-spacing: 0.41em;
  color: #fff;

  @media (min-width: 640px) {
    font-size: 1.3rem;
    line-height: calc(52 / 26);
    opacity: 1;
    pointer-events: auto;
  }

  is-menuAnimating & {
    will-change: transform, opacity;
  }

  is-menuOpen & {
    pointer-events: auto;
  }
`;
