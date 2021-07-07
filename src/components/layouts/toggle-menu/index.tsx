import { useRef } from 'react';
import { gsap } from 'gsap';
import tw, { css } from 'twin.macro';
import { useMenuContext } from '@/context';
import { useUpdateEffect } from '@/components/projects';

const ToggleMenu = () => {
  const { isMenuOpen, isMenuAnimating, onMenuToggle } = useMenuContext();
  const triggerRef = useRef(null);
  const borderRef = [useRef(null), useRef(null)];

  useUpdateEffect(() => {
    isMenuOpen ? open() : close();
  }, [isMenuOpen]);

  const open = () => {
    gsap.to(triggerRef.current, 0.8, {
      rotation: 180,
      ease: 'power3.inOut',
    });

    gsap.to(borderRef[0].current, 0.8, {
      y: 2.5,
      ease: 'power3.inOut',
    });

    gsap.to(borderRef[1].current, 0.8, {
      scaleX: 0,
      ease: 'power3.inOut',
    });
  };

  const close = () => {
    gsap.fromTo(
      triggerRef.current,
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

    gsap.to(borderRef[0].current, 0.8, {
      y: 0,
      ease: 'power3.inOut',
    });

    gsap.to(borderRef[1].current, 0.8, {
      scaleX: 32 / 40,
      ease: 'power3.inOut',
    });
  };

  return (
    <button
      type="button"
      css={menuTrigger}
      className={`u-mobile ${isMenuOpen ? 'is-open' : ''} ${
        isMenuAnimating ? 'is-animating' : ''
      }`}
      aria-label="menu-toggle"
      onClick={onMenuToggle}
      ref={triggerRef}
    >
      <div css={burger}>
        <div css={burger__line} ref={borderRef[0]} />
        <div css={burger__line} ref={borderRef[1]} />
      </div>
    </button>
  );
};

export { ToggleMenu };

const menuTrigger = css`
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
