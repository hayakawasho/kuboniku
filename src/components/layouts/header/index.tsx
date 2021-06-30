import Link from 'next/link';
import { ToggleMenu } from './ToggleMenu';
import { ToggleSNS } from './ToggleSNS';
import tw, { css } from 'twin.macro';

const Component = () => {
  return (
    <>
      <header>
        <Link href="/">
          <a css={logo}>
            <i className="icon-logo" />
          </a>
        </Link>
        <ToggleMenu />
        <ToggleSNS />
        <small css={copyright}>&copy; KuboNiku.com</small>
      </header>
    </>
  );
};

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
`;

const copyright = css`
  ${tw`fixed inline-block pointer-events-none`}
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
