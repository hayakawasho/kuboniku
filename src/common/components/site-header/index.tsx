import Link from 'next/link';
import * as React from 'react';
import { ToggleMenu } from './toggle-menu';
import { ToggleSns } from './toggle-sns';

const Header = () => {
  return (
    <header className="fixed">
      <Link href="/">
        <a className="fixed block pointer-events-auto brandLogo">
          <i className="icon-logo" />
        </a>
      </Link>
      <ToggleMenu />
      <ToggleSns />
      <small className="fixed inline-block pointer-events-none copyright">
        &copy; KuboNiku.com
      </small>
    </header>
  );
};

export { Header };

/*
const brandLogo = css`
  top: 1.5rem;
  left: 2rem;
  z-index: 99;
  font-size: 2.6rem;
  line-height: 1;
  color: var(--color-text-primary);

  @media (min-width: 640px) {
    font-size: 3.6rem;
    top: 2.4rem;
    left: 2.4rem;
  }
`;

const copyright = css`
  right: 3rem;
  bottom: 2.5rem;
  font-family: var(--font-en);
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.2em;
  z-index: 99;

  @media (min-width: 640px) {
    font-size: 1rem;
    right: 4rem;
    bottom: 4rem;
  }
`;
*/
