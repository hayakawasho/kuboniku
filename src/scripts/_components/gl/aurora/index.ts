const R = new (class {
  constructor() {
    this.auroraPixelRatio = 0.5
  }
  init() {
    ;(this.fbo_aurora = new y.d(
      v.dimensions.x * this.auroraPixelRatio,
      v.dimensions.y * this.auroraPixelRatio
    )),
      (this.fbo_output = new y.d(v.fbo_dimensions.x, v.fbo_dimensions.y)),
      (this.camera = new w.V()),
      (this.timeOffset = 100 * Math.random()),
      (this.uniforms = {
        uColor1: {
          value: g.aurora.color1,
        },
        uColor2: {
          value: g.aurora.color2,
        },
        uColor3: {
          value: g.aurora.color3,
        },
        uColor4: {
          value: g.aurora.color4,
        },
        uLightness: {
          value: new m.F(0.5, 0),
        },
        uNoiseIntensity: {
          value: g.params.noiseIntensity,
        },
        uNoiseScale: {
          value: g.params.noiseScale,
        },
        uResolution: {
          value: v.dimensions,
        },
        uSaturate: {
          value: 0,
        },
        uScrollOffset: {
          value: 0,
        },
        uTime: {
          value: this.timeOffset,
        },
      }),
      (this.plane_aurora = new x.K(
        new _._(2, 2),
        new b.j({
          fragmentShader:
            "#define GLSLIFY 1\nuniform vec2 uResolution;\nuniform float uTime;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nuniform vec3 uColor4;\nuniform vec2 uNoiseIntensity;\nuniform vec2 uNoiseScale;\nuniform vec2 uLightness;\n\nvarying vec2 vUv;\n\n/* The MIT License\n * Copyright © 2013 Nikita Miropolskiy\n * \n * ( license has been changed from CCA-NC-SA 3.0 to MIT\n *\n *   but thanks for attributing your source code when deriving from this sample \n *   with a following link: https://www.shadertoy.com/view/XsX3zB )\n *\n * ~\n * ~ if you're looking for procedural noise implementation examples you might \n * ~ also want to look at the following shaders:\n * ~ \n * ~ Noise Lab shader by candycat: https://www.shadertoy.com/view/4sc3z2\n * ~\n * ~ Noise shaders by iq:\n * ~     Value    Noise 2D, Derivatives: https://www.shadertoy.com/view/4dXBRH\n * ~     Gradient Noise 2D, Derivatives: https://www.shadertoy.com/view/XdXBRH\n * ~     Value    Noise 3D, Derivatives: https://www.shadertoy.com/view/XsXfRH\n * ~     Gradient Noise 3D, Derivatives: https://www.shadertoy.com/view/4dffRH\n * ~     Value    Noise 2D             : https://www.shadertoy.com/view/lsf3WH\n * ~     Value    Noise 3D             : https://www.shadertoy.com/view/4sfGzS\n * ~     Gradient Noise 2D             : https://www.shadertoy.com/view/XdXGW8\n * ~     Gradient Noise 3D             : https://www.shadertoy.com/view/Xsl3Dl\n * ~     Simplex  Noise 2D             : https://www.shadertoy.com/view/Msf3WH\n * ~     Voronoise: https://www.shadertoy.com/view/Xd23Dh\n * ~ \n *\n */\n\n/* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */\nvec3 random3(vec3 c) {\n\tfloat j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));\n\tvec3 r;\n\tr.z = fract(512.0*j);\n\tj *= .125;\n\tr.x = fract(512.0*j);\n\tj *= .125;\n\tr.y = fract(512.0*j);\n\treturn r-0.5;\n}\n\n/* skew constants for 3d simplex functions */\nconst float F3 =  0.3333333;\nconst float G3 =  0.1666667;\n\n/* 3d simplex noise */\nfloat simplex3d(vec3 p) {\n\t /* 1. find current tetrahedron T and it's four vertices */\n\t /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */\n\t /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/\n\t \n\t /* calculate s and x */\n\t vec3 s = floor(p + dot(p, vec3(F3)));\n\t vec3 x = p - s + dot(s, vec3(G3));\n\t \n\t /* calculate i1 and i2 */\n\t vec3 e = step(vec3(0.0), x - x.yzx);\n\t vec3 i1 = e*(1.0 - e.zxy);\n\t vec3 i2 = 1.0 - e.zxy*(1.0 - e);\n\t \t\n\t /* x1, x2, x3 */\n\t vec3 x1 = x - i1 + G3;\n\t vec3 x2 = x - i2 + 2.0*G3;\n\t vec3 x3 = x - 1.0 + 3.0*G3;\n\t \n\t /* 2. find four surflets and store them in d */\n\t vec4 w, d;\n\t \n\t /* calculate surflet weights */\n\t w.x = dot(x, x);\n\t w.y = dot(x1, x1);\n\t w.z = dot(x2, x2);\n\t w.w = dot(x3, x3);\n\t \n\t /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */\n\t w = max(0.6 - w, 0.0);\n\t \n\t /* calculate surflet components */\n\t d.x = dot(random3(s), x);\n\t d.y = dot(random3(s + i1), x1);\n\t d.z = dot(random3(s + i2), x2);\n\t d.w = dot(random3(s + 1.0), x3);\n\t \n\t /* multiply d by w^4 */\n\t w *= w;\n\t w *= w;\n\t d *= w;\n\t \n\t /* 3. return the sum of the four surflets */\n\t return dot(d, vec4(52.0));\n}\n\nvoid main(){\n    vec2 st = vUv;\n    float time = uTime;\n\n    st -= 0.5;\n    st -= time * 0.1;\n    vec2 aspect = uResolution / min(uResolution.x, uResolution.y);\n    st *= aspect;\n\n    float noise1 = simplex3d(vec3(st * 1.0 * uNoiseScale.x, time) + 0.1 + time * 0.05) * 0.5 + 0.5;\n    float noise2 = simplex3d(vec3(st * 2.0 * uNoiseScale.y, time) + 0.1 + time * 0.05) * 0.5 + 0.5;\n    float noise3 = simplex3d(vec3(st * 2.0 * uNoiseScale.y, time) + 0.4 + time * 0.02) * 0.5 + 0.5;\n\n    vec3 color1 = mix(uColor4, uColor3, noise1);\n    vec3 color2 = mix(uColor1, uColor2, noise2);\n    vec3 color = mix(color1, color2, noise3 * noise3);\n\n    vec3 _color = pow(color * 1.4, vec3(1.3));\n    color = pow(color * 1.2, vec3(1.5));\n    \n\n    \n\n    // color = pow(color, vec3(1.5));\n    color *= uLightness.x;\n\n    color = mix(_color, color, uLightness.y);\n\n    gl_FragColor = vec4(color, 1.0);\n}",
          uniforms: this.uniforms,
          vertexShader: T,
        })
      )),
      (this.plane_output = new x.K(
        new _._(2, 2),
        new b.j({
          fragmentShader:
            '#define GLSLIFY 1\nuniform sampler2D uAuroraTex;\nuniform vec2 uRes;\nvarying vec2 vUv;\nfloat random (in vec2 _st_1540259130) {\n    return fract(sin(dot(_st_1540259130.xy,\n    vec2(12.9898,78.233)))*\n        43758.5453123);\n}\n\nvoid main(){\n    vec2 aspect = uRes / max(uRes.x, uRes.y);\n\n    vec2 st = (gl_FragCoord.xy / uRes) / aspect;\n    vec3 color = texture2D(uAuroraTex, vUv).rgb;\n    float wn = random(st);\n\n    color = mix(color * color, color, wn * 0.5 + 0.5);\n\n    gl_FragColor = vec4(color, 1.0);\n\n}',
          uniforms: {
            uAuroraTex: {
              value: this.fbo_aurora.texture,
            },
            uRes: {
              value: v.fbo_dimensions,
            },
          },
          vertexShader: T,
        })
      )),
      c.on('UPDATE_SCROLL', t => {
        const { detail: e } = t
        e.offset.y > 300 ? (this.dark = 1) : (this.isShow = !0)
      })
  }
  resize() {
    this.fbo_aurora.setSize(
      v.dimensions.x * this.auroraPixelRatio,
      v.dimensions.y * this.auroraPixelRatio
    ),
      this.fbo_output.setSize(v.fbo_dimensions.x, v.fbo_dimensions.y)
  }
  update() {
    const t = Math.min(1, 2 * v.delta)
    E('firstView.isShow')
      ? (this.uniforms.uLightness.value.x += (0.5 - this.uniforms.uLightness.value.x) * t)
      : (this.uniforms.uLightness.value.x += (1 - this.uniforms.uLightness.value.x) * t),
      E('aboutVideos.isFocus') &&
        (this.uniforms.uLightness.value.x += (0 - this.uniforms.uLightness.value.x) * t),
      E('loading.isFinished') &&
        (this.uniforms.uLightness.value.y += (1 - this.uniforms.uLightness.value.y) * t),
      (this.uniforms.uTime.value += v.delta * A(0.7, 0.2, this.uniforms.uLightness.value.y)),
      v.renderer.setRenderTarget(this.fbo_aurora),
      v.renderer.render(this.plane_aurora, this.camera),
      v.renderer.setRenderTarget(this.fbo_output),
      v.renderer.render(this.plane_output, this.camera)
  }
})()
