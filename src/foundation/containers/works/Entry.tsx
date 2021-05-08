import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { SET_UI_COLOR } from '~/state/ui';
import tw, { css } from 'twin.macro';
import { IWorks } from '~/domain/works';

interface IProps {
  data: {
    title: string;
    slug: string;
    acf: IWorks['post']['acf'];
  };
  index: number | string;
}

const Component: React.FC<IProps> = React.memo(({ data, index }) => {
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);

  const handlePointerDown = () => {
    setHover(true);
    dispatch(SET_UI_COLOR(data.acf.themeColor));
  };

  const handlePointerUp = () => {
    setHover(false);
  };

  return (
    <>
      <Link scroll={false} href={'/works/' + data.slug}>
        <a
          css={entry}
          className={`${isHover ? 'is-hover' : ''}`}
          onMouseEnter={handlePointerDown}
          onTouchStart={handlePointerDown}
          onMouseLeave={handlePointerUp}
          onTouchEnd={handlePointerUp}
        >
          <div className="c-aspect" />
          <div css={entry__g}>
            <div css={eyecatch}>
              <img src={data.acf.eyecatch.sourceUrl} alt="" loading="lazy" />
            </div>
            <div css={entry__hgroup}>
              <p css={num}>
                {index}
                <span>Project</span>
              </p>
              <h2 css={heading}>{data.title}</h2>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
});

export default Component;

const heading = css`
  font-family: var(--font-roboto);
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1;
  color: #e3e3e3;

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`;

const num = css`
  font-family: var(--font-en);
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 1.9rem;
    margin-bottom: 2rem;
  }

  > span {
    font-size: 1rem;
    letter-spacing: 0.02em;
    margin-left: 0.8rem;
    letter-spacing: 0.02em;

    @media (min-width: 640px) {
      font-size: 1.3rem;
    }
  }
`;

const eyecatch = css`
  ${tw`absolute inset-0 opacity-80`}
  backface-visibility: hidden;

  > img {
    ${tw`absolute top-0 left-0 w-full h-full object-cover object-center`}
    filter: grayscale(1);
    backface-visibility: hidden;
    transition: filter 1s;
  }
`;

const entry__g = css`
  ${tw`absolute top-0 left-0 w-full h-full`}
`;

const entry__hgroup = css`
  ${tw`absolute`}
  bottom: 2rem;
  left: -1.2rem;
  z-index: 2;

  @media (min-width: 640px) {
    bottom: 4rem;
    left: -3.6rem;
    padding-right: 3.6rem;
  }
`;

const entry = css`
  ${tw`relative block`}

  @media (min-width: 640px) {
    ${tw`ml-0`}
  }

  .c-aspect {
    ${tw`opacity-20`}
    --aspect: calc(960 / 1536 * 100%);
  }

  &.is-hover {
    img {
      filter: grayscale(0);
    }
  }
`;
