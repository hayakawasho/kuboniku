import type { FC } from 'react'

type Props = {
  namespace?: string
  // footer: React.ReactElement
}

export const PageContent: FC<Props> = props => {
  return (
    <div data-load-container={props.namespace} data-ref="main" className="relative contentHidden">
      {props.children}
    </div>
  )
}
