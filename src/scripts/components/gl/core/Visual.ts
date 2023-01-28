import * as THREE from 'three'

export default class {
  private _transforms: any
  private _dpr
  private _color
  private _camera
  private _scene
  private _renderTargetParameters
  private _fbo

  constructor(options: any) {
    this._dpr = options.dpr
    this._color = options.color
    this._camera = options.camera

    this._scene = new THREE.Scene()

    this._renderTargetParameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: false,
    }

    this._fbo = new THREE.WebGLRenderTarget(
      window.innerWidth * this._dpr,
      window.innerHeight * this._dpr,
      this._renderTargetParameters
    )
  }

  render() {
    return
  }

  transform() {
    return
  }

  set transforms(value: any) {
    this._transforms = value
    this.transform()
  }

  get camera() {
    return this._camera
  }

  get scene() {
    return this._scene
  }

  get color() {
    return this._color
  }

  get fbo() {
    return this._fbo
  }
}
