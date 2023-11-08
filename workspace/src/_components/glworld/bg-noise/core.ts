import * as THREE from "three";
import Post from "./post";
import Sample from "./visuals/sample";

export class Bg {
  #visuals!: any[];
  #post!: Post;

  #transforms!: any[];
  #postactive!: boolean;

  constructor(
    private _renderer: THREE.WebGLRenderer,
    private _camera: THREE.PerspectiveCamera,
    context: {
      mq: "pc" | "sp";
    }
  ) {
    const { mq } = context;

    this.#visuals = [
      new Sample({
        camera: this._camera,
        color: 0x181818,
        dpr: 0.1,
      }),
      new Sample({
        camera: this._camera,
        color: 0xcccccc,
        dpr: 0.1,
      }),
    ];

    this.#post = new Post();
    this.#setSize();

    const transforms = {
      pc: {
        post: {
          alpha: 0.16,
          amount: 0.08,
          blur: 0.1,
          clouds: true,
          noise: true,
          rad: 0.6,
        },
      },
      sp: {
        post: {
          alpha: 0.16,
          amount: 0.05,
          blur: 0.1,
          clouds: true,
          noise: true,
          rad: 0.9,
        },
      },
    };

    this.#transform(transforms[mq]);
  }

  render = () => {
    this._renderer.render(this.#post.scene, this.#post.camera);
    this.#post.render();
  };

  resize = () => {
    this.#setSize();
  };

  setColor = (colorCode: string) => {
    this.#post.setColor(colorCode);
  };

  #transform = (transforms: any) => {
    this.#transforms = transforms;
    this.#postactive = transforms.post.clouds || transforms.post.noise;

    if (this.#post) {
      this.#post.transforms = transforms;
    }

    for (const visual of this.#visuals) {
      visual.transforms = transforms;
    }
  };

  #setSize = () => {
    this.#post.width = this._renderer.domElement.width;
    this.#post.height = this._renderer.domElement.height;
  };
}
