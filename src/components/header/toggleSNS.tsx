import React, { useState, useRef, useEffect, useMemo } from 'react';
import headerCSS from './header.module.scss';
import { gsap } from 'gsap';

const Component: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = [useRef(null), useRef(null)];
  const btnRef = useRef(null);
  const tl = useMemo(() => gsap.timeline({ paused: true }), []);

  useEffect(() => {
    tl.add(
      gsap.to(btnRef.current, 0.6, {
        rotation: -90,
        ease: 'expo.out',
      })
    ).add(
      gsap.to([ref[0].current, ref[1].current], 0.2, {
        autoAlpha: 1,
        y: -20,
        stagger: 0.07,
      }),
      '-=.5'
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  return (
    <>
      <div className={`${headerCSS.sns} u-text-center`}>
        <ul className={`${headerCSS.snsList}`}>
          <li ref={ref[0]}>
            <a href="https://www.facebook.com/k.b.nagisa" target="_blank">
              Fb
            </a>
          </li>
          <li ref={ref[1]}>
            <a href="#" target="_blank">
              Tw
            </a>
          </li>
        </ul>
        <button
          type="button"
          className={`${headerCSS.plus} ${isOpen ? 'is-open' : ''}`}
          onClick={() => setOpen(!isOpen)}
          ref={btnRef}
        >
          <div className="u-in">
            <div className={headerCSS.plus__x} />
            <div className={headerCSS.plus__y} />
          </div>
        </button>
      </div>
    </>
  );
};

export default Component;
