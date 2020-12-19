import React from 'react'
import { useSelector } from 'react-redux'
import { uiSelector } from '~/state/ui'

const Component = React.memo(() => {
  const { scrolling } = useSelector(uiSelector)

  return (
    <>
      <div
        className={`mask || js-loader`}
        style={scrolling ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
      />
    </>
  )
})

export default Component
