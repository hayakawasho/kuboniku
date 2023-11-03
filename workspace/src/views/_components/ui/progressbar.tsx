import { css } from '@emotion/react'

export const Progressbar = ({ bar, index, max }) => {
  return (
    <div className="l-progress">
      <div className="relative w-full h-full">
        <div className="text-center" css={ctrl}>
          {index && (
            <ol>
              {index.map((num, i) => (
                <li key={i}>
                  <span>{num}</span>
                </li>
              ))}
            </ol>
          )}
          {bar}
          {max && (
            <div className="absolute">
              <span>{max}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ctrl = css`
  font-family: var(--font-en);
  font-size: 1rem;
  line-height: 1;
  letter-spacing: 0.2em;
  width: 1.5em;

  > ol {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 1.5em;
    top: -1.5em;

    > li {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      white-space: nowrap;
      opacity: 0;
      line-height: 2;

      &:first-of-type {
        opacity: 1;
      }
    }
  }
`
