import { css } from '@emotion/react'
import parse from 'html-react-parser'
import { renderToStaticMarkup as r } from 'react-dom/server'
import { Header } from '../_components/header'
import { PageContent } from '../_components/page-content'
import { PageWithHeader } from '../_components/page-with-header'
import { Seo } from '../_components/seo'

module.exports = class {
  render(props: any) {
    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="PROFILE" />}
        seo={<Seo pagePath="/profile/" title="PROFILE" />}
      >
        <PageContent namespace="PROFILE">
          <main className="overflow-hidden" data-component="Profile">
            <h1 className="sr-only">PROFILE</h1>
            <div className="relative">
              <i className="icon-logo | u-pc" css={logo}></i>
              <i className="icon-logo_sp | u-sp" css={logo}></i>
              <div css={container}>
                <div css={container__in}>
                  <div css={hgroup}>
                    <h2 css={heading}>Nagisa Kubo</h2>
                    <p>Art Director & Designer</p>
                  </div>
                  <div css={about}>{parse(props.wp.profile.html)}</div>
                </div>
              </div>
            </div>
          </main>
        </PageContent>
      </PageWithHeader>
    )}`
  }
}

const logo = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 2rem), calc(-100% - 7.5rem));
  font-size: 17rem;
  background: url('/assets/grad.jpg');
  background-size: 100% 160%;
  background-position: center;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  @media (min-width: 640px) {
    font-size: 31rem;
    transform: translate(calc(-50% + 7rem), calc(-100% + 0.1em));
  }
`

const container = css`
  position: relative;
  margin: 0 3rem;
  height: calc(var(--vh) * 100);
  height: 100dvh;

  @media (min-width: 640px) {
    text-align: left;
  }
`

const container__in = css`
  position: absolute;
  right: 0;
  text-align: right;
  bottom: calc(100 / 800 * 100%);
  z-index: 2;

  @media (min-width: 640px) {
    left: 50%;
    text-align: left;
    // mix-blend-mode: difference;
  }
`

const hgroup = css`
  margin-bottom: 2.8rem;
  font-family: var(--font-roboto);

  > p {
    font-size: 1.2rem;
    color: #858585;

    @media (min-width: 640px) {
      font-size: 1.4rem;
    }
  }
`

const heading = css`
  font-weight: bold;
  font-size: 2.4rem;
  line-height: calc(60 / 24);

  @media (min-width: 640px) {
    font-size: 3rem;
  }
`

const about = css`
  font-size: 1.1rem;
  line-height: calc(40 / 22);

  @media (min-width: 640px) {
    font-size: 1.3rem;
    text-align: justify;
  }
`
