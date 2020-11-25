import React, { PureComponent } from 'react'
import Webgl from './gl'

class Component extends PureComponent {
  private _canvasRef

  constructor(props) {
    super(props)

    console.log('canvas: init')

    this._canvasRef = React.createRef();
  }

  componentDidMount() {
    console.log('canvas: mount', this._canvasRef)

    const gl = new Webgl()
    gl.setup(this._canvasRef.current)
  }

  componentDidUpdate(prevProps) {
    console.log('canvas: update')
  }

  render() {
    return (
      <>
        <canvas className="gl" ref={this._canvasRef} />
      </>
    )
  }
}


export default Component
