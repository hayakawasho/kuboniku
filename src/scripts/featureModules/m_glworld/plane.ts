class Noise {}

/**
const loader = new THREE.TextureLoader()

const vertexShader = `
precision mediump float;

uniform float u_diff;

varying vec2 vUv;

void main(){
  vec3 pos = position;

  pos.y *= 1. - u_diff;
  pos.x *= 1. - u_diff;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);;
}
`

const fragmentShader = `
precision mediump float;

uniform vec2 u_res;
uniform vec2 u_size;

uniform sampler2D u_texture;

vec2 cover(vec2 screenSize, vec2 imageSize, vec2 uv) {
  float screenRatio = screenSize.x / screenSize.y;
  float imageRatio = imageSize.x / imageSize.y;

  vec2 newSize = screenRatio < imageRatio
      ? vec2(imageSize.x * (screenSize.y / imageSize.y), screenSize.y)
      : vec2(screenSize.x, imageSize.y * (screenSize.x / imageSize.x));
  vec2 newOffset = (screenRatio < imageRatio
      ? vec2((newSize.x - screenSize.x) / 2.0, 0.0)
      : vec2(0.0, (newSize.y - screenSize.y) / 2.0)) / newSize;

  return uv * screenSize / newSize + newOffset;
}

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    vec2 uvCover = cover(u_res, u_size, uv);
    vec4 texture = texture2D(u_texture, uvCover);

    gl_FragColor = texture;
}
`

const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
const material = new THREE.ShaderMaterial({
	fragmentShader,
	vertexShader,
})

class Plane extends THREE.Object3D {

	init(el, i) {
		this.el = el

		this.x = 0
		this.y = 0

		this.my = 1 - ((i % 5) * 0.1)

		this.geometry = geometry
		this.material = material.clone()

		this.material.uniforms = {
			u_texture: { value: 0 },
			u_res: { value: new THREE.Vector2(1, 1) },
			u_size: { value: new THREE.Vector2(1, 1) },
			u_diff: { value: 0 }
		}

		this.texture = loader.load(this.el.dataset.src, (texture) => {
			texture.minFilter = THREE.LinearFilter
			texture.generateMipmaps = false

			const { naturalWidth, naturalHeight } = texture.image
			const { u_size, u_texture } = this.material.uniforms

			u_texture.value = texture
			u_size.value.x = naturalWidth
			u_size.value.y = naturalHeight
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.add(this.mesh)

		this.resize()
	}

	update = (x, y, max, diff) => {
		const { right, bottom } = this.rect
		const { u_diff } = this.material.uniforms

		this.y = gsap.utils.wrap(
			-(max.y - bottom),
			bottom,
			y * this.my
		) - this.yOffset

		this.x = gsap.utils.wrap(
			-(max.x - right),
			right,
			x
		) - this.xOffset

		u_diff.value = diff

		this.position.x = this.x
		this.position.y = this.y
	}

	resize() {
		this.rect = this.el.getBoundingClientRect()

		const { left, top, width, height } = this.rect
		const { u_res, u_toRes, u_pos, u_offset } = this.material.uniforms

		this.xOffset = (left + (width / 2)) - (ww / 2)
		this.yOffset = (top + (height / 2)) - (wh / 2)

		this.position.x = this.xOffset
		this.position.y = this.yOffset

		u_res.value.x = width
		u_res.value.y = height

		this.mesh.scale.set(width, height, 1)
	}
}

PLANE **/

// new Core()
