import type { FC } from 'react'

type Props = {
  namespace?: string
  children: React.ReactNode
}

export const PageContent: FC<Props> = ({ namespace = '', children }: Props) => {
  return (
    <div data-load-container={namespace} data-ref="main" className="relative">
      {children}
    </div>
  )
}
