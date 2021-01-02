import * as THREE from 'three';
import Sample from './visuals/sample';
import Post from './post';
import { dpr } from '~/foundation/constants/env';
import { deg2rad } from '~/foundation/utils/math';
import E from '~/foundation/utils/E';
import { EVENTS } from '~/foundation/constants/const';
import { gsap } from 'gsap';

let now = 0;
let then = 0;
const fps = 60;
const interval = 1000 / fps;
let rafID: number | boolean = -1;

export default class Gl {
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  canvas!: HTMLCanvasElement;

  visuals!: any[];
  post!: Post;

  _transforms!: any[];
  _postactive!: boolean;

  state!: {
    stopped: boolean;
    resizing: boolean;
    ww: number;
    wh: number;
  };

  constructor() {
    E.bindAll(this, ['_raf', '_handleResize']);

    this.state = {
      stopped: false,
      resizing: false,
      ww: window.innerWidth,
      wh: window.innerHeight,
    };
  }

  public setup(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.state.ww, this.state.wh);
    this.renderer.setPixelRatio(dpr);

    this.camera = new THREE.PerspectiveCamera(45, 1280 / 720, 0.1, 1000);
    this.camera.position.z = 50;

    this.visuals = [
      new Sample({
        camera: this.camera,
        color: 0x181818,
        dpr,
      }),
      new Sample({
        camera: this.camera,
        color: 0xcccccc,
        dpr,
      }),
    ];

    this.post = new Post();

    this._setSize(this.state.ww, this.state.wh);

    E.on(EVENTS.RESIZE, this._handleResize);

    const ops = {
      post: {
        noise: true,
        clouds: true,
        amount: 0.09,
        alpha: 0.11,
        blur: 0.12,
        rad: 1,
      },
    };

    this._transform(ops);

    this._start();
  }

  public destroy() {}

  private _start() {
    then = window.performance.now();
    this._raf();
  }

  private _resume() {
    this.state.stopped = false;
  }

  private _pause() {
    this.state.stopped = true;
  }

  private _transform(transforms) {
    this._transforms = transforms;
    this._postactive = transforms.post.clouds || transforms.post.noise;

    if (this.post) this.post.transforms = transforms;

    for (const visual of this.visuals) {
      visual.transforms = transforms;
    }

    if (this.camera) {
      const deskscreen = false;

      this.camera.position.z = deskscreen ? transforms.camera.dist : 3000;
      this.camera.far = deskscreen ? transforms.camera.far : 4500;
      this.camera.updateProjectionMatrix();
    }
  }

  private _raf() {
    if (!this.renderer) return;

    rafID = window.requestAnimationFrame(this._raf);
    now = window.performance.now();

    const delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      const time = now / 1000;

      this.renderer.render(this.post.scene, this.post.camera);
      this.post.render();
    }
  }

  private _handleResize({ width, height }) {
    const state = this.state;

    state.resizing = true;

    this._setSize(width, height);

    state.resizing = false;
  }

  private _setSize(width: number, height: number) {
    const radFov = deg2rad(this.camera.fov);

    this.camera.aspect = width / height;
    this.camera.position.z = (width * 0.5) / Math.tan(radFov * 0.5);

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

    this.post.width = this.renderer.domElement.width;
    this.post.height = this.renderer.domElement.height;
  }

  private _initMesh() {}
}
