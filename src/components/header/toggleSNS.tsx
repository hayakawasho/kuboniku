import React, { useState, useEffect } from 'react';
import headerCSS from './header.module.scss';
import { gsap } from 'gsap';

const Component: React.FC = () => {
  const [initialState, setInitialState] = useState(false);

  return (
    <>
      <div className={`${headerCSS.sns} u-text-center`}>
        <ul className={`${headerCSS.snsList}`}>
          <li>
            <a href="https://www.facebook.com/k.b.nagisa" target="_blank">
              Fb
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              Tw
            </a>
          </li>
        </ul>
        <button type="button" className={headerCSS.plus}>
          <div className={headerCSS.plus__x} />
          <div className={headerCSS.plus__y} />
        </button>
      </div>
    </>
  );
};

export default Component;
