// @ts-nocheck
const { css } = require('@emotion/react')
const { renderToStaticMarkup: r } = require('react-dom/server')
const { Page } = require('../components/Page')

function Profile(props) {
  return `<!DOCTYPE html>
  ${r(
    <Page title={'PROFILE'} env={props.build.env}>
      <h1 className="sr-only">PROFILE</h1>
      <div css={container}>
        <div css={container__in}>
          <div css={hgroup}>
            <h2 css={heading}>Nagisa Kubo</h2>
            <p>Art Director & Designer</p>
          </div>
          <div css={about} dangerouslySetInnerHTML={{ __html: props.wp.profile.html }} />
        </div>
      </div>
    </Page>
  )}`
}

exports.render = Profile

const container = css`
  position: relative;
  margin: 0 3rem;
  height: calc(var(--vh) * 100);

  @media (min-width: 640px) {
    text-align: left;
  }
`

const container__in = css`
  position: absolute;
  right: 0;
  text-align: right;
  bottom: 10rem;
  z-index: 2;

  @media (min-width: 640px) {
    left: 50%;
    text-align: left;
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
  }
`
