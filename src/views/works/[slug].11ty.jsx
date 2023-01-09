const { renderToStaticMarkup: r } = require('react-dom/server')
const { PageWithProgressbar } = require('../components/PageWithProgressbar')
const { css } = require('@emotion/react')

exports.data = {
  pagination: {
    data: 'wp.works.items',
    size: 1,
    alias: 'post',
  },
  permalink: context => `works/${context.post.slug}/index.html`,
}

exports.render = function (props) {
  const total = props.wp.works.total
  const projectNumber = total - props.pagination.pageNumber
  const post = props.post

  return `<!DOCTYPE html>
  ${r(
    <PageWithProgressbar title={post.title} env={props.build.env}>
      <div css={kv}>
        <div css={kv__cont} data-target="skew.item">
          <p className="">
            {projectNumber.toString().padStart(2, '0')}
            <span className="">Project</span>
          </p>
          <h1 css={heading}>
            <div tw="inline-block overflow-hidden">
              <span tw="inline-block origin-right">{post.title}</span>
            </div>
          </h1>
          <p css={sub} tw="overflow-hidden">
            <span tw="inline-block origin-right">
              {post.category}
              <i className="icon-arrow-right" />
            </span>
          </p>
        </div>
        {
          //<Picture src={props.eyecatch.src} mobile={props.eyecatch.mobile} />
        }
        <div css={kv__scrollDown}>
          <div tw="relative w-full h-full overflow-hidden">
            <div css={kv__scrollLabel}>scroll</div>
          </div>
          <i className="icon-arrow-down" />
        </div>
      </div>
      <div css={worksContent} data-target="skew.item">
        <div css={intro}>
          <div css={intro__info}>
            <dl css={dl}>
              <dt css={dt}>Year :</dt>
              <dd css={dd}>
                {
                  //format(props.createAt, 'MMMM d, yyyy')
                }
              </dd>
            </dl>
            <dl css={dl}>
              <dt css={dt}>Role :</dt>
              <dd css={dd}>
                <ul>{post.role && post.role?.map((item, i) => <li key={i}>{item}</li>)}</ul>
              </dd>
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
                <li tw="relative" key={i}>
                  <div className="c-aspect" style={css} />
                  <div tw="absolute w-full h-full top-0 left-0">
                    {
                      // <Img src={item.src} alt="" width={item.width} height={item.height} />
                    }
                  </div>
                </li>
              )
            })}
          </ul>
        )}
        {/*
          props.prev && (
            <aside css={[kv, kvNext]} className="is-next">
              <Link scroll={false} href={'/works/' + props.prev.slug}>
                <a tw="absolute w-full h-full z-10" />
              </Link>
              <div css={kv__cont}>
                <h2 css={heading}>Next Project</h2>
                <p css={sub}>
                  {props.prev.title}
                  <i className="icon-arrow-right" />
                </p>
              </div>
              <Picture src={props.prev.eyecatch.src} mobile={props.prev.eyecatch.mobile} />
            </aside>
          )
          */}
      </div>
    </PageWithProgressbar>
  )}`
}

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
  z-index: 2;
  padding-left: var(--grid);
  color: #fff;
`

const heading = css`
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
    margin-top: 1.2rem;
  }
`

const kv__scrollLabel = css`
  animation: front 6s cubic-bezier(0.77, 0, 0.175, 1) infinite;

  &::before {
    bottom: -30px;
    content: 'scroll';
    animation: back 6s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }
`

const worksContent = css`
  backface-visibility: hidden;
`

const intro = css`
  padding: 6rem calc(var(--gap) * 2) 7rem;

  @media (min-width: 640px) {
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
  line-height: calc(52 / 24);
  letter-spacing: 0.08em;
  color: #cbcbcb;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }

  > ul {
    &:after {
      content: "";
      display: block
      clear: both;
    }

    > li {
      float: left;

      + li {
        &:before {
          content: "/";
          margin: 0 .5em;
        }
      }
    }
  }
`

const intro__viewLink = css`
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
  top: 0.7em;
  width: 1.75em;
  content: '';
  border: solid;
  border-width: 1px 0 0;

  @media (min-width: 640px) {
    border-top-width: 2px;
  }
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
