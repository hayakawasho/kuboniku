import React, { useRef, useEffect } from 'react'
import Webgl from './gl'

const Component = React.memo(() => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const gl = new Webgl()
    gl.setup(canvasRef.current)
  }, [])

  return <canvas className="gl" ref={canvasRef} />
})

export default Component
