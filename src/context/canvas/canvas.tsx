import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiSelector } from '~/state/ui'
import Webgl from './gl'

const Component = React.memo(() => {
  const canvasRef = useRef(null)
  const dispatch = useDispatch()
  const { themeColor, gpuTier } = useSelector(uiSelector)

  useEffect(() => {
    const gl = new Webgl()
    gl.setup(canvasRef.current)

    // const render = () => {}

    // animation
    // const tick = () => {
    //   requestAnimationFrame(animate)
    //   render()
    // }

    // tick()
  }, [])

  return <canvas className="gl" ref={canvasRef} />
})

export default Component
