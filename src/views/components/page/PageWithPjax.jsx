// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { css } from '@emotion/react'

export const PageWithPjax = props => {
  return (
    <div css={wrap} data-taxi>
      <div css={content} data-taxi-view>
        {props.children}
      </div>
    </div>
  )
}

const wrap = css`
  position: relative;
  z-index: 1;
`

const content = css`
  position: relative;
  min-height: 100vh;
`
