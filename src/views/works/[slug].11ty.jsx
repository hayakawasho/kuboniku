const { css, keyframes } = require('@emotion/react')
const { renderToStaticMarkup: r } = require('react-dom/server')
const { PageWithProgressbar } = require('../components/PageWithProgressbar')
const { selectRole, selectYear, zeroPadding } = require('../components/works/converter')

function WorksSlug(props) {
  const total = props.wp.works.total
  const projectNumber = total - props.pagination.pageNumber

  const post = props.post

  const page = props.pagination.page
  const isLast = page.last.id === post.id

  const next = {
    title: isLast ? page.first.title : page.next.title,
    slug: isLast ? page.first.slug : page.next.slug,
    eyecatch: isLast ? page.first.eyecatch : page.next.eyecatch,
    eyecatchMobile: isLast ? page.first.eyecatchMobile : page.next.eyecatchMobile,
  }

  return `<!DOCTYPE html>
  ${r(
    <PageWithProgressbar title={post.title} env={props.build.env} progressbar={<div></div>}>
      <div css={kv}>
        <div css={kv__cont}>
          <p className="">
            {zeroPadding(projectNumber)}
            <span className="">Project</span>
          </p>
          <h1 css={heading}>
            <div className="inline-block overflow-hidden">
              <span className="inline-block origin-right">{post.title}</span>
            </div>
          </h1>
          <p css={sub} className="overflow-hidden">
            <span className="inline-block origin-right">
              {post.category}
              <i className="icon-arrow-right" />
            </span>
          </p>
        </div>
        <picture>
          <source srcSet={post.eyecatch.src} media="(min-width: 640px)" />
          <img src={post.eyecatchMobile.src} />
        </picture>
        <div css={kv__scrollDown}>
          <div className="relative w-full h-full overflow-hidden">
            <div css={kv__scrollLabel}>scroll</div>
          </div>
          <i className="icon-arrow_down" />
        </div>
      </div>

      <div css={body}>
        <div css={intro}>
          <div css={intro__info}>
            <dl css={dl}>
              <dt css={dt}>Year :</dt>
              <dd css={dd}>{selectYear(post)}</dd>
            </dl>
            <dl css={dl}>
              <dt css={dt}>Role :</dt>
              <dd css={dd}>{selectRole(post)}</dd>
            </dl>
          </div>
          {post.viewWebsite && (
            <a css={intro__viewLink} href={post.viewWebsite} target="_blank" rel="noopener">
              View website
              <div css={intro__viewLink__hr} />
            </a>
          )}
        </div>
        {post.gallery && (
          <ul css={captchaList}>
            {post.gallery?.map((item, i) => {
              const aspect = Math.round((item.height / item.width) * 100)
              const css = {
                '--aspect': `${aspect}%`,
                backgroundColor: `transparent`,
              }
              return (
                <li className="relative" key={i}>
                  <div css={aspect} style={css} />
                  <div className="absolute w-full h-full top-0 left-0">
                    {
                      // <Img src={item.src} alt="" width={item.width} height={item.height} />
                    }
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        <aside css={[kv, kvNext]} className="is-next">
          <a href={'/works/' + next.slug} className="absolute w-full h-full z-10"></a>
          <div css={kv__cont}>
            <h2 css={heading}>Next Project</h2>
            <p css={sub}>
              {next.title}
              <i className="icon-arrow-right" />
            </p>
          </div>
          <picture>
            <source srcSet={next.eyecatchMobile.src} media="(min-width: 640px)" />
            <img src={next.eyecatchMobile.src} />
          </picture>
        </aside>
      </div>
    </PageWithProgressbar>
  )}`
}

exports.data = {
  pagination: {
    data: 'wp.works.items',
    size: 1,
    alias: 'post',
  },
  permalink: context => `works/${context.post.slug}/index.html`,
}

exports.render = WorksSlug

const kv = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100svh;
  perspective: 1000px;

  @media (min-width: 640px) {
    height: 100vh;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const kvNext = css`
  height: 100vh;

  a {
    z-index: 3;
  }
  img {
    filter: grayscale(1);
  }
`

const kv__cont = css`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  z-index: 2;
  padding-left: var(--grid);
  color: #fff;
`

const heading = css`
  font-weight: 600;
  padding-left: 1.2rem;
  font-family: var(--font-roboto);
  font-size: 3.9rem;
  line-height: 1;
  color: #fff;

  @media (min-width: 640px) {
    font-size: 7rem;
  }
`

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
`

const kv__scrollDown = css`
  position: absolute;
  left: 50%;
  bottom: 5rem;
  overflow: hidden;
  transform: translateX(-50%);
  font-weight: bold;
  font-family: var(--font-en);
  font-size: 1rem;
  line-height: 1;
  color: #fff;
  letter-spacing: 0.02em;
  z-index: 2;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }

  .icon-arrow_down {
    margin-top: 1.2rem;
  }
`

const front = keyframes`
  0%,
  70% {
    transform: translateZ(0);
  }

  100% {
    transform: translate3d(0, 20px, 0);
  }
`

const back = keyframes`
  0%,
  70% {
    transform: translateZ(0) rotate(30deg) skewX(30deg);
  }

  100% {
    transform: translate3d(0, -50px, 0) rotate(0) skewX(0);
  }
`

const kv__scrollLabel = css`
  display: inline-block;
  animation: ${front} 6s cubic-bezier(0.77, 0, 0.175, 1) infinite;

  &::before {
    position: absolute;
    display: block;
    transform-origin: right;
    bottom: -30px;
    content: 'scroll';
    animation: ${back} 6s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
`

const body = css`
  backface-visibility: hidden;
`

const intro = css`
  position: relative;
  width: 100%;
  padding: 6rem calc(var(--gap) * 2) 7rem;

  @media (min-width: 640px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0 auto;
    width: calc(var(--grid) * 10);
    padding: 10rem var(--grid) 9rem;
  }
`

const intro__info = css`
  @media (min-width: 640px) {
    width: calc(3 / 8 * 100%);
    margin-bottom: 0;
  }
`

const dl = css`
  display: grid;
  grid-template-columns: 3.25em 1fr;
  font-size: 1.2rem;
  font-family: var(--font-en);
`

const dt = css`
  color: var(--color-text-primary);
  line-height: calc(52 / 24);

  @media (min-width: 640px) {
    font-size: 1.1rem;
  }
`

const dd = css`
  font-weight: 300;
  line-height: calc(52 / 24);
  letter-spacing: 0.08em;
  color: #cbcbcb;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }
`

const intro__viewLink = css`
  position: relative;
  display: inline-block;
  font-weight: bold;
  margin-top: 4rem;
  padding-left: 2.6em;
  font-family: var(--font-en);
  font-size: 1.2rem;
  line-height: 1.5;
  letter-spacing: 0.02em;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`

const intro__viewLink__hr = css`
  position: absolute;
  left: 0;
  display: block;
  height: 0;
  top: 0.7em;
  width: 1.75em;
  content: '';
  border: solid;
  border-width: 1px 0 0;

  @media (min-width: 640px) {
    border-top-width: 2px;
  }
`

const aspect = css`
  aspect-ratio: var(--aspect);
  background-color: 'transparent';
`

const captchaList = css`
  padding: 0 var(--gap);
  margin-bottom: 10.5rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 10);
    padding: 0;
    margin: 0 auto 12rem;
  }

  > li {
    margin-bottom: 2rem;

    @media (min-width: 640px) {
      margin-bottom: 6rem;
    }

    .c-aspect {
      opacity: 0.2;
    }
  }
`
