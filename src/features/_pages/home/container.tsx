import { motion } from "framer-motion"
import Link from "next/link"
import * as React from "react"
import { ProgressBar } from "@/common/components"
import { Utils } from "@/common/utils"

interface IProps {
  posts: {
    title: string
    slug: string
    category: string
    index: number | string
    eyecatch: {
      src: string
      // srcSet: string;
      mobile: string
    }
  }[]
  loading: boolean
  errorMessage: string
}

const Component = (props: IProps) => {
  /*
  const [result] = useHttp<IData>(GET_POSTS, {
    initialData: props.initialData,
  });

  const posts = result.posts.nodes;
  const total = result.posts.pageInfo.offsetPagination.total;
  const now = 1;
  const max = posts.length;
  const [currentProjectIndex, setCurrentProjectIndex] = useState(total - now);
  const progressRef = useRef(null);
  const slidesRef = useRef(null);
  */

  return (
    <>
      {/*
        //data && <Canvas domRef={slidesRef} />

      <div className={slides} ref={slidesRef}>
        {posts.map((item, i) => (
          <div
            key={i}
            className={slide}
            data-gl-texture={item.acf.eyecatchMobile.sourceUrl}
          ></div>
        ))}
      </div>

      <div className="homeScreen" tw="opacity-0">
        <ul className="homeWorksList">
          {posts.map((item, i) => (
            <li key={i}>
              <div className="homeEntry">
                <Link scroll={false} href={`/works/${item.slug}`}>
                  <a className="homeGroup u-z-10">
                    <p>
                      {Utils.zeroPadding(total - i, 2)}
                      <span>Project</span>
                    </p>
                    <h2 className={heading}>{item.title}</h2>
                    <p className={sub}>
                      {item.acf.category.name}
                      <i className="icon-arrow-right" />
                    </p>
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <button type="button" className={case__scrollDown}>
          <div className="u-in u-ovh">
            <div className={case__scrollLabel}>
              {currentProjectIndex}
              <span>Project</span>
            </div>
          </div>
          <i className="icon-arrow-down" />
        </button>

        <ProgressBar
          bar={
            <div className="c-progressBar">
              <span className="c-progressBar__l" ref={progressRef} />
            </div>
          }
          index={posts.map((_, i) => Utils.zeroPadding(i + 1, 2))}
          max={Number(Utils.zeroPadding(max, 2))}
        />
      </div>
        */}
    </>
  )
}

export default Component

/*
const slides = css`
  ${tw`fixed top-0 left-0 w-screen h-screen overflow-hidden`}
  user-select: none;
  cursor: grab;
  z-index: 2;
`;

const slide = css`
  ${tw`w-full h-full invisible`}// margin: 100px 0;
`;

const kv = css`
  ${tw`relative w-full overflow-hidden block`}
  height: calc(var(--vh) * 100);
  perspective: 1000px;

  @media (min-width: 640px) {
    ${tw`h-screen`}
  }
`;

const case__cont = css`
  ${tw`absolute top-1/2 left-0 w-full`}
  z-index: 2;
  padding-left: var(--grid);
  color: #fff;
`;

const heading = css`
  ${tw`font-semibold`}
  padding-left: 1.2rem;
  font-family: var(--font-roboto);
  font-size: 3.9rem;
  line-height: 1;
  color: #fff;

  @media (min-width: 640px) {
    font-size: 7rem;
  }
`;

const sub = css`
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  padding-left: 1.2rem;
  margin-top: 1rem;

  .icon-arrow-right {
    font-size: 0.7rem;
    margin-left: 0.8rem;
  }
`;

const case__scrollDown = css`
  ${tw`absolute left-1/2 overflow-hidden transform -translate-x-1/2 font-bold`}
  bottom: 5rem;
  font-family: var(--font-en);
  font-size: 1rem;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.02em;
  z-index: 2;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }

  .icon-arrow-down {
    ${tw`block text-center`}
    margin-top: 1.2rem;
  }
`;

const case__scrollLabel = css`
  ${tw`inline-block`}
`;
*/
