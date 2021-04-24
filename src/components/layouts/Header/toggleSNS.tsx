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
      gsap.to(btnRef.current, 0.55, {
        rotation: 90,
        ease: 'power3.inOut',
      })
    ).add(
      gsap.fromTo(
        [ref[0].current, ref[1].current],
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

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <>
      <div className={`${headerCSS.sns} u-text-center`}>
        <ul className={`${headerCSS.snsList}`}>
          <li>
            <a
              href="https://www.facebook.com/k.b.nagisa"
              target="_blank"
              ref={ref[0]}
            >
              Fb
            </a>
          </li>
          <li>
            <a href="#" target="_blank" ref={ref[1]}>
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
