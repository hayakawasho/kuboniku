import type { Scene, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
// import { g } from '@/env'
import { THREE } from '@/libs'

// const { dpr } = g
const dpr = 1

export class Core {
  scene!: Scene
  camera!: PerspectiveCamera
  renderer!: WebGLRenderer
  clock!: Clock

  width!: number
  height!: number
  aspect!: number

  totalTime!: number
  deltaTime!: number

  static create() {
    return new Core()
  }

  private constructor() {} // eslint-disable-line @typescript-eslint/no-empty-function

  init(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000)

    this.camera.position.set(0, 10, -10)
    this.camera.lookAt(this.scene.position)

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
    })

    this.renderer.setPixelRatio(dpr)
    this.renderer.setClearColor(0x000000)
    this.renderer.setSize(this.width, this.height)

    this.clock = new THREE.Clock()
    this.clock.start()
  }

  render() {
    const delta = this.clock.getDelta()
    this.deltaTime = delta
    this.totalTime += this.deltaTime
  }

  resize(width: number, height: number) {
    this.width = width
    this.height = height
    this.aspect = this.width / this.height

    if (this.renderer) {
      this.renderer.setSize(this.width, this.height)
    }
  }
}
