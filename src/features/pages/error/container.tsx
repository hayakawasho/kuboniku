import Link from 'next/link';
import tw, { css } from 'twin.macro';

const ErrorScreen = ({ headingNode }: { headingNode: React.ReactNode }) => {
  return (
    <div tw="fixed w-full top-1/2 left-0">
      <h1 css={heading}>{headingNode}</h1>
      <Link scroll={false} href="/">
        <a css={sub}>
          BACK TO TOP
          <i className="icon-arrow-right" />
        </a>
      </Link>
    </div>
  );
};

export { ErrorScreen };

const heading = css`
  ${tw`font-semibold`}
  padding-left: calc(var(--grid) + 1.2rem);
  font-family: var(--font-roboto);
  font-size: 3.9rem;
  line-height: 1;
`;

const sub = css`
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  padding-left: calc(var(--grid) + 1.2rem);
  margin-top: 1rem;
  display: block;

  .icon-arrow-right {
    font-size: 0.7rem;
    margin-left: 0.8rem;
  }
`;
