import React from 'react';
import Link from 'next/link';
import ToggleMenu from './toggleMenu';
import ToggleSNS from './toggleSNS';
import tw, { css } from 'twin.macro';

const Component: React.FC = React.memo(() => {
  return (
    <>
      <header>
        <Link scroll={false} href="/">
          <a css={logo}>
            <i className="icon-logo" />
          </a>
        </Link>
        <ToggleMenu />
        <ToggleSNS />
        <small css={copy}>&copy; KuboNiku.com</small>
      </header>
    </>
  );
});

export default Component;

const logo = css`
  ${tw`fixed block pointer-events-auto`}
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
`

const copy = css`
  ${tw`fixed inline-block pointer-events-none`}
  right: 3rem;
  bottom: 2.5rem;
  font-family: var(--font-en);
  font-size: .8rem;
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
`
