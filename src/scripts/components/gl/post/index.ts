import * as THREE from 'three'
import { colorCodeGetters, colorCodeWatch } from '@/states/color'

export default class {
  private _transforms: any
  private _scene = new THREE.Scene()
  private _clock = new THREE.Clock(true)
  private _cameraOrtho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private _mesh: any
  private _uniforms = {
    uResolution: {
      type: 'v2',
      value: new THREE.Vector2(),
    },
    uCol: {
      type: 'v3',
      value: new THREE.Color(colorCodeGetters()),
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
  }

  constructor() {
    this._setup()

    colorCodeWatch(colorCode => {
      this._uniforms.uCol.value = new THREE.Color(colorCode)
    })
  }

  private _setup() {
    this._transforms = {}

    const geometry = new THREE.PlaneBufferGeometry(2, 2)

    const material = new THREE.ShaderMaterial({
      uniforms: this._uniforms as any,
      vertexShader: `
        precision highp float;
        varying vec2 vUv;

        void main() {
          vUv = vec2(uv.x, uv.y);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        float random2d( vec2 n ) {
          return fract( sin( dot( n, vec2( 12.9898, 4.1414 ) ) ) * 43758.5453 );
        }

        vec3 circle (vec3 col, float rad, float blur, vec2 pos, vec2 uv) {
          float dis = length(uv - pos);
          return col * (1. - smoothstep(rad * blur, rad, dis));
        }

        uniform sampler2D uSamplerOut;
        uniform sampler2D uSamplerIn;
        uniform float uActiveClouds;
        uniform float uActiveNoise;
        uniform vec2 uResolution;
        uniform float uAmount;
        uniform float uAlpha;
        uniform float uBlur;
        uniform float uTime;
        uniform float uRad;
        uniform vec3 uCol;

        varying vec2 vUv;

        void main() {
          vec2 uv2 = -1. + 1. * gl_FragCoord.xy / uResolution.xy;
          uv2.x *= uResolution.x / uResolution.y;

          vec4 visualIn = texture2D(uSamplerIn, vUv);
          vec4 visualOut = texture2D(uSamplerOut, vUv);

          vec2 coord = vec2(0.);

          if (uActiveClouds == 1.) {
            coord = vec2(.2, -.5);
            visualIn.rgb += circle(uCol, uRad * 1.25, uBlur, coord, uv2) * (uAlpha * .75);
            visualOut.rgb += circle(uCol, uRad * 1.25, uBlur, coord, uv2) * (uAlpha * .75);

            coord = vec2( -2., .1);
            visualIn.rgb += circle( uCol, uRad * 2., uBlur, coord, uv2 ) * ( uAlpha * 1.);
            visualOut.rgb += circle( uCol, uRad * 2., uBlur, coord, uv2 ) * ( uAlpha * 1.);
          }

          vec3 mask = vec3(0.);
          float mixf = clamp(mask.r, 0.0, .0);

          vec3 color = mix(visualOut, visualIn, mixf).rgb;

          if (uActiveNoise == 1.) {
            float b = random2d(vUv * 200.0 + uTime);
            color += b * uAmount;
          }

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })

    this._mesh = new THREE.Mesh(geometry, material)

    this._scene.add(this._mesh)
  }

  render() {
    this._uniforms.uTime.value = Math.sin(this._clock.getElapsedTime())
  }

  transform() {
    const transforms = this._transforms
    const uni = this._uniforms

    if (transforms) {
      uni.uAmount.value = transforms.post.amount
      uni.uBlur.value = transforms.post.blur
      uni.uRad.value = transforms.post.rad
      uni.uAlpha.value = transforms.post.alpha
      uni.uActiveNoise.value = transforms.post.noise ? 1 : (0 as any)
      uni.uActiveClouds.value = transforms.post.clouds ? 1 : (0 as any)
    }
  }

  set width(value: number) {
    this._uniforms.uResolution.value.x = value
  }

  set height(value: number) {
    this._uniforms.uResolution.value.y = value
  }

  set samplerIn(value: any) {
    this._uniforms.uSamplerIn.value = value
  }

  set samplerOut(value: any) {
    this._uniforms.uSamplerOut.value = value
  }

  set transforms(value: any) {
    this._transforms = value
    this.transform()
  }

  get camera() {
    return this._cameraOrtho
  }

  get scene() {
    return this._scene
  }
}
