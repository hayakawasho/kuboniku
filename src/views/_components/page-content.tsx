import type { FC } from 'react'

type Props = {
  namespace?: string
  children: React.ReactNode
}

export const PageContent: FC<Props> = ({ namespace = '', children }: Props) => {
  return (
    <div className="relative" data-load-container={namespace} data-ref="main">
      {children}
    </div>
  )
}
