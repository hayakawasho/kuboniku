import React from 'react'
import { useSelector } from 'react-redux'
import { appSelector } from '~/state/app'

const Component = React.memo(() => {
  const { scrolling } = useSelector(appSelector)

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
