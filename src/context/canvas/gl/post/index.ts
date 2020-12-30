import * as THREE from 'three';

const vertexShader = require('./vert.glsl').default;
const fragmentShader = require('./frag.glsl').default;

import store from '~/state/store';

export default class {
  private _transforms;
  private _scene = new THREE.Scene();
  private _clock = new THREE.Clock(true);
  private _cameraOrtho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private _mesh;
  private _uniforms = {
    uResolution: {
      type: 'v2',
      value: new THREE.Vector2(),
    },
    uCol: {
      type: 'v3',
      value: new THREE.Color(this._getColor()),
    },
    uActiveClouds: {
      type: 'f',
      value: null,
    },
    uActiveNoise: {
      type: 'f',
      value: null,
    },
    uSamplerOut: {
      type: 't',
      value: null,
    },
    uSamplerIn: {
      type: 't',
      value: null,
    },
    uAmount: {
      type: 'f',
      value: 0.2,
    },
    uAlpha: {
      type: 'f',
      value: 0.2,
    },
    uTime: {
      type: 'f',
      value: 0.2,
    },
    uBlur: {
      type: 'f',
      value: 0.0,
    },
    uRad: {
      type: 'f',
      value: 0.0,
    },
  };

  private _getColor() {
    return store.getState().ui.UIColor;
  }

  constructor() {
    this._setup();

    store.subscribe(() => {
      this._uniforms.uCol.value = new THREE.Color(this._getColor());
    });
  }

  private _setup() {
    this._transforms = {};

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader,
      fragmentShader,
    });

    this._mesh = new THREE.Mesh(geometry, material);

    this._scene.add(this._mesh);
  }

  render() {
    this._uniforms.uTime.value = Math.sin(this._clock.getElapsedTime());
  }

  transform() {
    const transforms = this._transforms;
    const uni = this._uniforms;

    if (transforms) {
      uni.uAmount.value = transforms.post.amount;
      uni.uBlur.value = transforms.post.blur;
      uni.uRad.value = transforms.post.rad;
      uni.uAlpha.value = transforms.post.alpha;
      uni.uActiveNoise.value = transforms.post.noise ? 1 : 0;
      uni.uActiveClouds.value = transforms.post.clouds ? 1 : 0;
    }
  }

  set width(value) {
    this._uniforms.uResolution.value.x = value;
  }

  set height(value) {
    this._uniforms.uResolution.value.y = value;
  }

  set samplerIn(value) {
    this._uniforms.uSamplerIn.value = value;
  }

  set samplerOut(value) {
    this._uniforms.uSamplerOut.value = value;
  }

  set transforms(value) {
    this._transforms = value;

    this.transform();
  }

  get camera() {
    return this._cameraOrtho;
  }

  get scene() {
    return this._scene;
  }
}
