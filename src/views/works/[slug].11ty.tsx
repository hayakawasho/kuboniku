import { css, keyframes } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Header } from '../_components/header'
import { PageContent } from '../_components/page-content'
import { PageWithHeader } from '../_components/page-with-header'
import { ResponsiveImage } from '../_components/responsive-image'
import { Seo } from '../_components/seo'
import { zeroPadding } from '../_components/utils'
import { selectRole, selectYear, selectTitle } from '../_components/works/selector'

module.exports = class {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: true,
        alias: 'post',
        data: 'wp.works.items',
        size: 1,
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
        header={<Header current="WORKS_DETAIL" />}
        seo={<Seo pagePath={`/works/${post.slug}/`} title={pageTitle} />}
      >
        <PageContent namespace="WORKS_DETAIL">
          <main data-color={post.color} data-component="WorksDetail">
            <div data-ref="progressBar"></div>
            <div css={kv}>
              <div css={kv__cont}>
                <p css={project}>
                  {zeroPadding(projectNumber)}
                  <span className="ml-[.8rem]">Project</span>
                </p>
                <h1 className="pl-[1.1rem] pr-[.5em]" css={heading}>
                  {pageTitle}
                </h1>
                <p className="pl-[1.3rem] mt-[.8rem] overflow-hidden" css={sub}>
                  <span className="inline-block origin-right">
                    {post.category}
                    <i className="icon-arrow_right ml-[.8rem]" />
                  </span>
                </p>
              </div>
              <ResponsiveImage
                alt=""
                className="opacity-40 object-cover fit2parent"
                pcH={post.eyecatch.height}
                pcSrc={post.eyecatch.src}
                pcW={post.eyecatch.width}
                spH={post.eyecatchMobile.height}
                spSrc={post.eyecatchMobile.src}
                spW={post.eyecatchMobile.width}
              />
              <div css={kv__scrollDown}>
                <div className="relative w-full h-full overflow-hidden">
                  <div css={kv__scrollLabel} data-text="scroll">
                    scroll
                  </div>
                </div>
                <i className="icon-arrow_down | block mt-[1.4rem] text-[1.2rem] text-center" />
              </div>
            </div>

            <div css={body}>
              <div className="my-[6rem] | sm:mt-[10rem] sm:mb-[9rem]" css={introLayout}>
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
                      className="mt-[2rem] | sm:mt-0"
                      css={intro__viewLink}
                      href={post.siteUrl}
                      rel="noopener"
                      target="_blank"
                    >
                      View website
                      <div css={intro__viewLinkLine} />
                    </a>
                  )}
                </div>
              </div>
              {
                <div className="mb-[10.5rem] | sm:mx-auto sm:mb-[18.2rem]" css={captchaItems}>
                  {post.gallery.length > 0 && (
                    <ul>
                      {post.gallery.map((item: any, index: number) => {
                        return (
                          <li className="mb-[2rem] sm:mb-[6rem]" key={index}>
                            <img
                              alt=""
                              decoding="async"
                              height={item.height}
                              src={item.src}
                              width={item.width}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  {post.showreel && (
                    <video
                      autoPlay
                      className="w-full"
                      loop
                      muted
                      playsInline
                      preload="none"
                      src={post.showreel.url}
                    ></video>
                  )}
                </div>
              }
              <aside css={[kv, kvNext]}>
                <a className="fit2parent z-10" href={`../${nextPost.slug}/`}>
                  <div css={kv__cont}>
                    <h2 className="pl-[1.1rem] pr-[.5em]" css={heading}>
                      Next Project
                    </h2>
                    <p className="pl-[1.3rem] mt-[.8rem] overflow-hidden" css={sub}>
                      {selectTitle(nextPost)}
                      <i className="icon-arrow_right ml-[.8rem]" />
                    </p>
                  </div>
                  <ResponsiveImage
                    alt=""
                    className="opacity-40 filter grayscale-100 object-cover fit2parent"
                    pcH={nextPost.eyecatch.height}
                    pcSrc={nextPost.eyecatch.src}
                    pcW={nextPost.eyecatch.width}
                    spH={nextPost.eyecatchMobile.height}
                    spSrc={nextPost.eyecatchMobile.src}
                    spW={nextPost.eyecatchMobile.width}
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

const kv = css`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
  height: 100vh;
  height: 100svh;
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
  top: calc(-1em - 2rem);
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
  color: #e3e3e3;
  letter-spacing: 0.02em;
  z-index: 2;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }
`

const front = keyframes`
  0%,
  50% {
    transform: translateZ(0);
  }

  100% {
    transform: translate3d(0, 2rem, 0);
  }
`

const back = keyframes`
  0%,
  50% {
    transform: translateZ(0) rotate(30deg) skewX(30deg);
  }

  100% {
    transform: translate3d(0, -5.2rem, 0) rotate(0) skewX(0);
  }
`

const kv__scrollLabel = css`
  display: inline-block;
  animation: ${front} 2.5s var(--ease-power3-inOut) infinite;

  &::before {
    content: attr(data-text);
    position: absolute;
    bottom: -3.2rem;
    display: block;
    transform-origin: right;
    animation: ${back} 2.5s var(--ease-power3-inOut) infinite;
    animation-delay: 0.05s;
    transform-origin: bottom;
  }
`

const body = css`
  backface-visibility: hidden;
`

const introLayout = css`
  position: relative;
  width: 100%;
  padding: 0 calc(var(--gap) * 2);

  @media (min-width: 640px) {
    margin-left: auto;
    margin-right: auto;
    width: calc(var(--grid) * 10);
    padding: 0 var(--grid);
  }
`

const intro = css`
  position: relative;

  @media (min-width: 640px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`

const intro__info = css`
  @media (min-width: 640px) {
    margin-bottom: 0;
  }
`

const dl = css`
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-family: var(--font-roboto);
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
    position: absolute;
    bottom: 0.5rem;
    right: 0;
  }
`

const intro__viewLinkLine = css`
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

const captchaItems = css`
  padding: 0 var(--gap);

  @media (min-width: 640px) {
    width: calc(var(--grid) * 10);
    padding: 0;
  }
`
