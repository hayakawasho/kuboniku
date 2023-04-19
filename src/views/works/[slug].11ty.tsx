import { css, keyframes } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Header } from '../components/Header'
import { PageContent } from '../components/PageContent'
import { PageWithHeader } from '../components/PageWithHeader'
import { ResponsiveImage } from '../components/ResponsiveImage'
import { Seo } from '../components/Seo'
// import { Progressbar } from '../components/Progressbar'
import { zeroPadding } from '../components/utils'
import { selectRole, selectYear, selectTitle } from '../components/works/selector'

module.exports = class {
  data() {
    return {
      pagination: {
        data: 'wp.works.items',
        size: 1,
        addAllPagesToCollections: true,
        alias: 'post',
      },
      permalink: (context: any) => `works/${context.post.slug}/index.html`,
    }
  }

  render(props: any) {
    const post = props.post
    const page = props.pagination.page
    const nextPost = page.last.id === post.id ? { ...page.first } : { ...page.next }

    const projectNumber = props.wp.works.total - props.pagination.pageNumber
    const pageTitle = selectTitle(post)

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        seo={<Seo title={pageTitle} pagePath={`/works/${post.slug}/`} />}
        header={<Header currentPath="/works/[slug]/" />}
      >
        <PageContent namespace="WorksDetail">
          <main data-component="WorksDetail" data-color={post.color}>
            <div data-ref="progressBar"></div>
            <div css={kv}>
              <div css={kv__cont}>
                <p css={project}>
                  {zeroPadding(projectNumber)}
                  <span className="ml-[.8rem]">Project</span>
                </p>
                <h1 css={heading} className="pr-[.5em]">
                  {pageTitle}
                </h1>
                <p css={sub} className="mt-[1rem] overflow-hidden">
                  <span className="inline-block origin-right">
                    {post.category}
                    <i className="icon-arrow_right ml-[.8rem]" />
                  </span>
                </p>
              </div>
              <ResponsiveImage
                pcSrc={post.eyecatch.src}
                pcW={post.eyecatch.width}
                pcH={post.eyecatch.height}
                spSrc={post.eyecatchMobile.src}
                spW={post.eyecatchMobile.width}
                spH={post.eyecatchMobile.height}
                className="opacity-40 object-cover fit2parent"
                alt=""
              />
              <div css={kv__scrollDown}>
                <div className="relative w-full h-full overflow-hidden">
                  <div css={kv__scrollLabel}>scroll</div>
                </div>
                <i className="icon-arrow_down || block mt-[1.4rem] text-[1.2rem] text-center" />
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
                {post.siteUrl && (
                  <a
                    css={intro__viewLink}
                    className="mt-[4rem]"
                    href={post.siteUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    View website
                    <div css={intro__viewLink__hr} />
                  </a>
                )}
              </div>
              {post.gallery && (
                <ul css={captchaList} className="mb-[10.5rem] sm:mx-auto sm:mb-[12rem]">
                  {post.gallery.map((item: any, index: number) => {
                    const css = {
                      '--aspect': `${item.width / item.height}`,
                      backgroundColor: post.color,
                    }
                    return (
                      <li key={index} className="relative bg-[#191918] mb-[2rem] sm:mb-[6rem]">
                        <div css={aspect} style={css} />
                        <figure className="fit2parent">
                          <img
                            src={item.src}
                            alt=""
                            width={item.width}
                            height={item.height}
                            decoding="async"
                          />
                        </figure>
                      </li>
                    )
                  })}
                </ul>
              )}
              <aside css={[kv, kvNext]}>
                <a href={`../${nextPost.slug}/`} className="fit2parent z-10">
                  <div css={kv__cont}>
                    <h2 css={heading}>Next Project</h2>
                    <p css={sub} className="mt-[1rem]">
                      {selectTitle(nextPost)}
                      <i className="icon-arrow_right ml-[.8rem]" />
                    </p>
                  </div>
                  <ResponsiveImage
                    pcSrc={nextPost.eyecatch.src}
                    pcW={nextPost.eyecatch.width}
                    pcH={nextPost.eyecatch.height}
                    spSrc={nextPost.eyecatchMobile.src}
                    spW={nextPost.eyecatchMobile.width}
                    spH={nextPost.eyecatchMobile.height}
                    className="opacity-40 filter grayscale-100 object-cover fit2parent"
                    alt=""
                  />
                </a>
              </aside>
            </div>
          </main>
        </PageContent>
      </PageWithHeader>
    )}`
  }
}

const imgFit = css`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const kv = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100vh;
  height: 100svh;
  // perspective: 1000px;
  background: #191918;

  @media (min-width: 640px) {
    height: 100vh;
  }
`

const kvNext = css`
  height: 100vh;
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

const project = css`
  position: absolute;
  top: calc(-1em - 1rem);
  font-weight: bold;
  font-family: var(--font-en);
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  color: var(--color-text-primary);

  > span {
    font-size: 70%;
    letter-spacing: 0.02em;
  }
`

const sub = css`
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  line-height: 1;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  padding-left: 1.4rem;

  .icon-arrow_right {
    font-size: 1rem;
    transform: scale(0.7);
    transform-origin: left;
    display: inline-block;
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
`

const front = keyframes`
  0%,
  70% {
    transform: translateZ(0);
  }

  100% {
    transform: translate3d(0, 2rem, 0);
  }
`

const back = keyframes`
  0%,
  70% {
    transform: translateZ(0) rotate(30deg) skewX(30deg);
  }

  100% {
    transform: translate3d(0, -5.2rem, 0) rotate(0) skewX(0);
  }
`

const kv__scrollLabel = css`
  display: inline-block;
  animation: ${front} 4s cubic-bezier(0.77, 0, 0.175, 1) infinite;

  &::before {
    position: absolute;
    display: block;
    transform-origin: right;
    bottom: -3.2rem;
    content: 'scroll';
    animation: ${back} 4s cubic-bezier(0.77, 0, 0.175, 1) infinite;
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
    // width: calc(3 / 8 * 100%);
    margin-bottom: 0;
  }
`

const dl = css`
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-family: var(--font-en);
`

const dt = css`
  color: var(--color-text-primary);
  line-height: calc(52 / 24);
  white-space: nowrap;

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
  opacity: 0.2;
`

const captchaList = css`
  padding: 0 var(--gap);

  @media (min-width: 640px) {
    width: calc(var(--grid) * 10);
    padding: 0;
  }
`
