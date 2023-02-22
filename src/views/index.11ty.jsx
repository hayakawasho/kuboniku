// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Content } from './components/Content'
import { Header } from './components/Header'
import { PageWithHeader } from './components/PageWithHeader'
import { zeroPadding } from './components/utils'
import { selectTitle } from './components/works/selector'

export const data = {
  pagination: {
    data: 'wp.works.items',
    size: 40,
    addAllPagesToCollections: false,
    alias: 'posts',
  },
}

export const render = props => {
  const posts = props.posts
  const total = props.wp.works.total

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader title="WORKS" pagePath="" header={<Header />} namespace="Works">
      <Content namespace="Works">
        <main data-component="Works">
          <div className="pt-[10rem] mb-[6rem] sm:mb-[3.6rem]">
            <h1 css={heading}>
              Works
              <sup css={heading__total}>{total}</sup>
            </h1>
          </div>

          <div css={entries} data-ref="projects" data-total={total}>
            {posts.map((item, i) => {
              return (
                <article key={i} css={entryWrap} className="mb-[4rem] sm:mb-[6.4rem]">
                  <a
                    css={entry}
                    href={`./works/${item.slug}/`}
                    data-ref="project"
                    data-color={item.color}
                  >
                    <div css={aspect}></div>
                    <div css={entry__g}>
                      <div css={eyecatch}>
                        <img
                          src={item.eyecatch.src}
                          alt=""
                          width={item.eyecatch.width}
                          height={item.eyecatch.height}
                          loading="auto"
                          decoding="async"
                        />
                      </div>
                      <div css={entry__hgroup}>
                        <p css={num}>
                          {zeroPadding(total - i)}
                          <span>Project</span>
                        </p>
                        <h2 css={entry__heading}>{selectTitle(item)}</h2>
                      </div>
                    </div>
                  </a>
                </article>
              )
            })}
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`
}

const heading = css`
  position: relative;
  font-weight: bold;
  padding: 0 calc(var(--gap) * 2);
  font-family: var(--font-roboto);
  font-size: 5.3rem;
  line-height: 1;

  @media (min-width: 640px) {
    margin: 0 auto;
    left: 2rem;
    width: calc(var(--grid) * 10);
    padding: 0 0 0 calc(var(--grid) * 0.5 + var(--gutter));
    font-size: 7.6rem;
  }
`

const heading__total = css`
  position: absolute;
  top: 0.5em;
  margin-left: 0.5em;
  font-family: var(--font-en);
  font-size: calc(26.6 / 106.4 * 100%);
  font-weight: 500;
  color: var(--color-text-primary);
  letter-spacing: 0.41em;
`

const entries = css`
  padding: 0 calc(var(--gap) * 2);

  @media (min-width: 640px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    padding: 0;
    width: calc(var(--grid) * 10);
  }
`

const entryWrap = css`
  @media (min-width: 640px) {
    width: calc(var(--grid) * 4);

    &:nth-of-type(2n - 1) {
      margin-top: 9.6rem;
      margin-left: 3.4rem;
    }
  }
`

const entry = css`
  position: relative;
  display: block;

  @media (min-width: 640px) {
    margin-left: 0;
  }
`

const entry__heading = css`
  font-family: var(--font-roboto);
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1;
  color: #e3e3e3;

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`

const entry__g = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const entry__hgroup = css`
  position: absolute;
  bottom: 2rem;
  left: -1.2rem;
  z-index: 2;

  @media (min-width: 640px) {
    bottom: 4rem;
    left: -3.6rem;
    padding-right: 3.6rem;
  }
`

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
`

const eyecatch = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  backface-visibility: hidden;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: grayscale(1);
    backface-visibility: hidden;
    transition: filter 1s;
    opacity: 0.8;
  }
`

const aspect = css`
  aspect-ratio: 1536 / 960;
`
