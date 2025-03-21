import { keyframes } from "@emotion/react"
import useIntersectionObserver from "@react-hook/intersection-observer"
import { useRef, useEffect } from "react"
// import tw, { css } from 'twin.macro';
import { WorkEntry } from "./work-entry"
// import { useSkewScroll } from '@/features/skew-scroll';

interface IProps {
  posts: {
    slug: string
    title: string
    index: number | string
    eyecatch: {
      src: string
      width: number
      height: number
    }
  }[]
  totalPosts: number
  handleLoadMore: () => void
}

const Component = (props: IProps) => {
  const entryLoaderRef = useRef(null)
  const { isIntersecting } = useIntersectionObserver(entryLoaderRef, {
    rootMargin: "200px 0px",
  })

  useEffect(() => {
    if (isIntersecting) {
      props.handleLoadMore()
    }
  }, [isIntersecting])

  return (
    <div className="wrk-container">
      <h1 className="wrk-heading">
        <div>
          Works<sup className="wrk-heading__total">{props.totalPosts}</sup>
        </div>
      </h1>
      <div className="o-grid wrk-entryList">
        {props.posts.map((post, i) => (
          <article className="o-grid__item" key={i}>
            <WorkEntry
              href={"/works/" + post.slug}
              title={post.title}
              index={post.index}
              img={{
                src: post.eyecatch.src,
                width: post.eyecatch.width,
                height: post.eyecatch.height,
              }}
            />
          </article>
        ))}
      </div>
      <div className="wrk-entryLoader" ref={entryLoaderRef}>
        {
          <div className="wrk-entryLoader__bounce">
            <div />
          </div>
        }
        {
          // <div className={entryLoader__error}>{props.errorMessage}</div>
        }
      </div>
    </div>
  )
}

export default Component

/*
const container = css`
  padding-top: 10rem;

  @media (min-width: 640px) {
    padding-top: 15rem;
  }
`;

const heading = css`
  ${tw`relative font-bold`}
  padding: 0 calc(var(--gap) * 2);
  margin: 0 0 6rem;
  font-family: var(--font-roboto);
  font-size: 5.3rem;
  line-height: 1;

  @media (min-width: 640px) {
    ${tw`mt-0 mx-auto`}
    left: 2rem;
    width: calc(var(--grid) * 10);
    padding: 0 0 0 calc(var(--grid) * 0.5 + var(--gutter));
    margin-bottom: 3.6rem;
    font-size: 7.6rem;
  }
`;

const heading__total = css`
  ${tw`absolute`}
  top: 0.5em;
  margin-left: 0.5em;
  font-family: var(--font-en);
  font-size: calc(26.6 / 106.4 * 100%);
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: 0.41em;
`;

const entryList = css`
  padding: 0 calc(var(--gap) * 2);

  @media (min-width: 640px) {
    ${tw`flex flex-wrap justify-between my-0 mx-auto p-0`}
    width: calc(var(--grid) * 10);
  }

  .o-grid__item {
    margin-bottom: 4rem;

    @media (min-width: 640px) {
      width: calc(var(--grid) * 4);
      margin-bottom: 6.4rem;

      &:nth-of-type(2n - 1) {
        margin-top: 9.6rem;
        margin-left: 3.4rem;
      }
    }
  }
`;

const entryLoader = css`
  ${tw`flex justify-center`}
  padding-bottom: 6.4rem;
`;

const bounce = keyframes`
  from {
    transform: translateY(75%);
  }
  to {
    transform: translateY(-75%);
  }
`;

const entryLoader__bounce = css`
  display: flex;

  > div {
    width: 6px;
    height: 6px;
    background-color: var(--color-theme);
    border-radius: 50%;
    animation: ${bounce} 0.4s cubic-bezier(0.19, 0.57, 0.3, 0.98) infinite
      alternate;

    &:nth-of-type(2) {
      animation-delay: 0.1s;
      opacity: 0.8;
      margin: 0 3px;
    }

    &:nth-of-type(3) {
      animation-delay: 0.2s;
      opacity: 0.6;
    }
  }
`;

const entryLoader__error = css`
  ${tw`text-center font-bold`}
  font-family: var(--font-en);
  font-size: 1.5rem;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);
`;
*/
