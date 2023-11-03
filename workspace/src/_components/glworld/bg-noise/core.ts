import * as THREE from "three";
import Post from "./post";
import Sample from "./visuals/sample";

const dpr = Math.min(window.devicePixelRatio, 1.5);

const deg2rad = (n: number) => {
  return (n * Math.PI) / 180;
};

export default class Gl {
  // #scene!: THREE.Scene
  #camera!: THREE.PerspectiveCamera;
  #renderer!: THREE.WebGLRenderer;
  // #canvas!: HTMLCanvasElement

  #visuals!: any[];
  #post!: Post;

  #transforms!: any[];
  #postactive!: boolean;

  #state!: {
    stopped: boolean;
    resizing: boolean;
    ww: number;
    wh: number;
  };

  constructor(canvas: HTMLCanvasElement, ww: number, wh: number) {
    this.#state = {
      resizing: false,
      stopped: false,
      wh,
      ww,
    };

    this.#setup(canvas);
  }

  #setup = (canvas: HTMLCanvasElement) => {
    this.#renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas,
    });

    this.#renderer.setClearColor(0x000000, 0);
    this.#renderer.setSize(this.#state.ww, this.#state.wh);
    this.#renderer.setPixelRatio(dpr);

    this.#camera = new THREE.PerspectiveCamera(45, 1280 / 720, 0.1, 1000);
    this.#camera.position.z = 50;

    this.#visuals = [
      new Sample({
        camera: this.#camera,
        color: 0x181818,
        dpr,
      }),
      new Sample({
        camera: this.#camera,
        color: 0xcccccc,
        dpr,
      }),
    ];

    this.#post = new Post();

    this.#setSize(this.#state.ww, this.#state.wh);

    const ops = {
      post: {
        alpha: 0.16,
        amount: 0.07,
        blur: 0.2,
        clouds: true,
        noise: true,
        rad: 0.9,
      },
    };

    this.#transform(ops);
  };

  render = () => {
    this.#renderer.render(this.#post.scene, this.#post.camera);
    this.#post.render();
  };

  resize(width: number, height: number) {
    const state = this.#state;
    state.resizing = true;
    this.#setSize(width, height);
    state.resizing = false;
  }

  // private _resume() {
  //   this.#state.stopped = false
  // }
  //
  // private _pause() {
  //   this.#state.stopped = true
  // }

  #transform(transforms: any) {
    this.#transforms = transforms;
    this.#postactive = transforms.post.clouds || transforms.post.noise;

    if (this.#post) this.#post.transforms = transforms;

    for (const visual of this.#visuals) {
      visual.transforms = transforms;
    }

    if (this.#camera) {
      const deskscreen = false;

      this.#camera.position.z = deskscreen ? transforms.camera.dist : 3000;
      this.#camera.far = deskscreen ? transforms.camera.far : 4500;
      this.#camera.updateProjectionMatrix();
    }
  }

  #setSize(width: number, height: number) {
    const radFov = deg2rad(this.#camera.fov);

    this.#camera.aspect = width / height;
    this.#camera.position.z = (width * 0.5) / Math.tan(radFov * 0.5);

    this.#camera.updateProjectionMatrix();

    this.#renderer.setSize(width, height);

    this.#post.width = this.#renderer.domElement.width;
    this.#post.height = this.#renderer.domElement.height;
  }
}
