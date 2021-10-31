import cn from "classnames"
import Link from "next/link"
import { useRef } from "react"

interface IProps {
  href: string
  index: string | number
  title: string
  img: {
    src: string
    width: number
    height: number
  }
}

const WorkEntry = (props: IProps) => {
  const ref = useRef(null)
  // const [isHovering, toggle] = useToggle(false, true);

  return (
    <Link scroll={false} href={props.href}>
      <a ref={ref} className={"wrk-entry" + cn({ "is-hovering": false })}>
        <div className="c-aspect" />
        <div className="wrk-entry__g">
          <div className="wrk-entry__eyecatch">
            <img
              src={props.img.src}
              width={props.img.width}
              height={props.img.height}
              loading="lazy"
              alt=""
            />
          </div>
          <div className="wrk-entry__hgroup">
            <p className="wrk-entry__num">
              {props.index}
              <span>Project</span>
            </p>
            <h2 className="wrk-entry__heading">{props.title}</h2>
          </div>
        </div>
      </a>
    </Link>
  )
}

export { WorkEntry }

/*
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

  div {
    width: 100%;
    height: 100%;
  }

  img {
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

  &.is-hovering {
    img {
      filter: grayscale(0);
    }
  }
`;
*/
