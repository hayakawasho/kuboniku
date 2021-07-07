import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import tw, { css } from 'twin.macro';
import { keyframes } from '@emotion/react';
import { useToggle } from '@/components/projects';
import { useUpdateEffect } from '@/components/projects';

const ToggleSns = () => {
  const [isOpen, toggle] = useToggle(false, true);
  const snsRef = [useRef(null), useRef(null)];
  const triggerRef = useRef(null);
  const tl = useMemo(() => gsap.timeline({ paused: true }), []);

  useEffect(() => {
    tl.add(
      gsap.to(triggerRef.current, 0.55, {
        rotation: 90,
        ease: 'power3.inOut',
      })
    ).add(
      gsap.fromTo(
        [snsRef[0].current, snsRef[1].current],
        {
          y: 20,
        },
        {
          duration: 0.5,
          autoAlpha: 1,
          y: 0,
          stagger: 0.07,
          force3D: true,
          ease: 'power3.out',
        }
      ),
      '-=.4'
    );
  }, []);

  useUpdateEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <div css={sns}>
      <ul css={snsList}>
        <li>
          <a href="https://www.facebook.com/k.b.nagisa" target="_blank" ref={snsRef[0]}>Fb</a>
        </li>
        <li>
          <a href="#" target="_blank" ref={snsRef[1]}>Tw</a>
        </li>
      </ul>
      <button
        type="button"
        css={plus}
        className={`${isOpen ? 'is-open' : ''}`}
        onClick={toggle}
        ref={triggerRef}
      >
        <div className="u-in">
          <div css={plus__x} />
          <div css={plus__y} />
        </div>
      </button>
    </div>
  );
};

export { ToggleSns };

const drawPlus = keyframes`
  0% {
    transform: scaleX(1);
  }

  50% {
    transform: scaleX(0);
  }

  100% {
    transform: scaleX(1);
  }
`;

const sns = css`
  ${tw`fixed text-center`}
  bottom: 1rem;
  left: 2rem;
  z-index: 99;

  @media (min-width: 640px) {
    bottom: 4rem;
    left: 4rem;
  }
`;

const snsList = css`
  margin-bottom: 2.5rem;

  > li {
    ${tw`overflow-hidden text-center`}
    margin-bottom: 2rem;

    &:last-child {
      ${tw`mb-0`}
    }

    a {
      ${tw`inline-block pointer-events-auto invisible opacity-0`}
      font-family: var(--font-en);
      font-size: 1.2rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      backface-visibility: hidden;

      @media (min-width: 640px) {
        font-size: 1.3rem;
      }
    }
  }
`;

const plus = css`
  position: relative;
  z-index: 2;
  display: inline-block;
  width: 16px;
  height: 16px;
  pointer-events: auto;
  cursor: pointer;
  padding: 1rem;
  box-sizing: content-box;
  backface-visibility: hidden;

  @media (min-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    box-sizing: border-box;
  }
`;

const plus__x = css`
  ${tw`absolute top-1/2 left-0`}
  width: 16px;
  height: 1px;
  background-color: var(--color-text-primary);
  backface-visibility: hidden;
  transform-origin: left;

  .is-hover & {
    animation: ${drawPlus} 0.6s;
  }
`;

const plus__y = css`
  ${tw`absolute top-1/2 left-0`}
  width: 16px;
  height: 1px;
  content: '';
  background-color: var(--color-text-primary);
  backface-visibility: hidden;
  transform: rotate(90deg);
  transform-origin: center;

  .is-hover & {
    animation: ${drawPlus} 0.6s 0.3s;
  }
`;
