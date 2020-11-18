import React from 'react'
import Webgl from './gl'

const Component: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return
    }

    const gl = new Webgl()

    gl.setup(canvas)
  }

  return (
    <>
      <canvas className="gl" ref={onCanvasLoaded} />
    </>
  )
}

export default Component
