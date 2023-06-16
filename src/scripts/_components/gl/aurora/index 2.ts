e.a = class {
  constructor(t) {
      a(this, "map", function(t, e, n, i, r) {
          return (t - e) / (n - e) * (r - i) + i
      }),
      a(this, "distance", function(t, e, n, i) {
          return Math.sqrt(Math.pow(t - n, 2) + Math.pow(e - i, 2))
      }),
      this.scene = t,
      this.last_color_1 = new r.j(s.a.routes.general.color1.r,s.a.routes.general.color1.g,s.a.routes.general.color1.b),
      this.last_color_2 = new r.j(s.a.routes.general.color2.r,s.a.routes.general.color2.g,s.a.routes.general.color2.b)
  }
  init() {
      var t = new r.i(1,1)
        , e = l
        , n = new r.e(400,400,1,1)
        , s = new r.h({
          uniforms: {
              u_bg: {
                  type: "v3",
                  value: this.rgb(239, 239, 239)
              },
              u_bgMain: {
                  type: "v3",
                  value: this.rgb(239, 239, 239)
              },
              u_color1: {
                  type: "v3",
                  value: this.rgb(255, 255, 255)
              },
              u_color2: {
                  type: "v3",
                  value: this.rgb(255, 255, 255)
              },
              u_time: {
                  type: "f",
                  value: 0
              },
              u_randomisePosition: {
                  type: "v2",
                  value: t
              },
              mousePosition: {
                  type: "v2",
                  value: new r.i(0,0)
              }
          },
          fragmentShader: e + u,
          vertexShader: e + c,
          blending: r.c,
          depthTest: !1,
          transparent: !0
      })
        , o = new r.h({
          uniforms: {
              u_bg: {
                  type: "v3",
                  value: this.rgb(239, 239, 239)
              },
              u_bgMain: {
                  type: "v3",
                  value: this.rgb(239, 239, 239)
              },
              u_color1: {
                  type: "v3",
                  value: this.rgb(255, 255, 255)
              },
              u_color2: {
                  type: "v3",
                  value: this.rgb(255, 255, 255)
              },
              u_time: {
                  type: "f",
                  value: 0
              },
              u_randomisePosition: {
                  type: "v2",
                  value: t
              },
              mousePosition: {
                  type: "v2",
                  value: new r.i(0,0)
              }
          },
          fragmentShader: e + h,
          vertexShader: e + c,
          blending: r.c,
          depthTest: !1,
          transparent: !0
      });
      this.mesh_1 = new r.b(n,s),
      this.mesh_1.position.set(-150, -150, -100),
      this.mesh_1.scale.multiplyScalar(2),
      this.mesh_1.rotationX = -1,
      this.mesh_1.rotationY = 0,
      this.mesh_1.rotationZ = 0,
      this.scene.add(this.mesh_1),
      this.mesh_2 = new r.b(n,o),
      this.mesh_2.position.set(200, 40, -100),
      this.mesh_2.scale.multiplyScalar(2),
      this.mesh_2.rotationX = 1,
      this.mesh_2.rotationY = 0,
      this.mesh_2.rotationZ = 0,
      this.scene.add(this.mesh_2),
      this.x = this.randomInteger(0, 1),
      this.y = this.randomInteger(0, 1),
      i.a.to(this.mesh_2.position, {
          y: 150,
          x: 150,
          duration: 4,
          repeat: -1,
          yoyo: !0,
          ease: "power1.inOut"
      }),
      i.a.to(this.mesh_1.position, {
          x: "random(-450, 450, 10)",
          y: "random(200, -400, 10)",
          duration: 4,
          repeat: -1,
          repeatRefresh: !0,
          ease: "power1.inOut"
      })
  }
  setU_colors(t, e) {
      this.mesh_1.material.uniforms.u_color1.value = this.last_color_1,
      this.mesh_1.material.uniforms.u_color2.value = this.last_color_2,
      i.a.to(this.last_color_1, {
          x: t.r,
          y: t.g,
          z: t.b,
          duration: .6,
          ease: "power1.out"
      }),
      this.mesh_2.material.uniforms.u_color1.value = this.last_color_2,
      this.mesh_2.material.uniforms.u_color2.value = this.last_color_2,
      i.a.to(this.last_color_2, {
          x: e.r,
          y: e.g,
          z: e.b,
          duration: .6,
          delay: .2,
          ease: "power1.out"
      }),
      this.last_color_1 = new r.j(t.r,t.g,t.b),
      this.last_color_2 = new r.j(e.r,e.g,e.b)
  }
  resize() {}
  update(t, e) {
      this.mesh_1.material.uniforms.u_time.value = e,
      this.mesh_2.material.uniforms.u_time.value = e
  }
  draw() {
      this.raycaster.setFromCamera(this.mouse3D, this.camera);
      var t = this.raycaster.intersectObjects([this.mesh_1]);
      if (t.length) {
          var {x: e, z: n} = t[0].point
            , r = this.distance(e, n, this.mesh_1.position.x + this.mesh_2.position.x, this.mesh_1.position.z + this.mesh_2.position.z)
            , s = this.map(r, 6, 0, 0, 10);
          i.a.to(this.mesh_1.position, {
              y: s < 1 ? 1 : s,
              duration: .4
          });
          var o = this.mesh_1.position.y / 2.5
            , a = o < 1 ? 1 : o;
          i.a.to(this.mesh_1.position, {
              ease: "expo.out",
              x: a,
              y: a,
              duration: .4
          })
      }
  }
  randomInteger(t, e) {
      return Math.floor(Math.random() * (e - t + 1)) + t
  }
  rgb(t, e, n) {
      return new r.j(t,e,n)
  }
}
;
var l = "\nvec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\n\nfloat snoise(vec2 v){\n  const vec4 C = vec4(0.211324865405187, 0.366025403784439,\n           -0.577350269189626, 0.024390243902439);\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod(i, 289.0);\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n  + i.x + vec3(0.0, i1.x, 1.0 ));\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),\n    dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n"
, c = "\nuniform float u_time;\nuniform vec2 u_randomisePosition;\n\nvarying float vDistortion;\nvarying float xDistortion;\nvarying vec2 vUv;\n\nvoid main() {\n\tvUv = uv;\n\tvDistortion = snoise(vUv.xx * 0.1 - u_randomisePosition * 0.05);\n\txDistortion = snoise(vUv.yy * 0.1 - u_randomisePosition * 0.05);\n\tvec3 pos = position;\n\t//pos.z += (vDistortion * 0.1);\n\t//pos.x += 0.01;\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}\n"
, u = "\nvec3 rgb(float r, float g, float b) {\n\treturn vec3(r / 239., g / 239., b / 239.);\n}\n\nvec3 rgb(float c) {\n\treturn vec3(c / 239., c / 239., c / 239.);\n}\n\nuniform vec3 u_bg;\nuniform vec3 u_bgMain;\nuniform vec3 u_color1;\nuniform vec3 u_color2;\nuniform float u_time;\n\nvarying vec2 vUv;\nvarying float vDistortion;\n\nvoid main() {\n\tvec3 bg = rgb(u_bg.r, u_bg.g, u_bg.b);\n\tvec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);\n\tvec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);\n\tvec3 bgMain = rgb(u_bgMain.r, u_bgMain.g, u_bgMain.b);\n\n\tfloat noise1 = snoise(vUv + u_time * 0.1);\n\t//float noise2 = snoise(vUv * 2. + u_time * 0.1);\n\tfloat border = smoothstep(0.0, 1.0,vUv.x);\n\n\tfloat colorMix = smoothstep(1.0, 2.0, vUv.x);\n\n\n\tfloat d1 = distance(vUv,vec2(0.5,0.5))*2.0;\n\tfloat alpha = smoothstep(1.0, 0.0, d1);\n\t\n\tfloat d2 = distance(vUv,vec2(0.5,0.5))*5.0;\n\n\tvec3 color1 = mix(c1, bg, d1);\n\tvec3 color2 = mix(c2, bg, d2);\n\n\t//color1 = mix(color1, color2, noise1);\n\t//color2 = mix(color2, color1, noise2);\n\n\tvec3 color = mix(color1, color2, 0.5);\n\t\t\t\n\tgl_FragColor = vec4(mix(color1, color2, colorMix+noise1), alpha);\n}"
, h = "\nvec3 rgb(float r, float g, float b) {\n\treturn vec3(r / 239., g / 239., b / 239.);\n}\n\nvec3 rgb(float c) {\n\treturn vec3(c / 239., c / 239., c / 239.);\n}\n\nuniform vec3 u_bg;\nuniform vec3 u_bgMain;\nuniform vec3 u_color1;\nuniform vec3 u_color2;\nuniform float u_time;\n\nvarying vec2 vUv;\nvarying float vDistortion;\n\nvoid main() {\n\tvec3 bg = rgb(u_bg.r, u_bg.g, u_bg.b);\n\tvec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);\n\tvec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);\n\tvec3 bgMain = rgb(u_bgMain.r, u_bgMain.g, u_bgMain.b);\n\n\t//float noise1 = snoise(vUv + u_time * 0.1);\n\tfloat noise2 = snoise(vUv * 2. + u_time * 0.1);\n\tfloat border = smoothstep(0.0, 1.0,vUv.x);\n\n\tfloat colorMix = smoothstep(1.0, 2.0, vUv.x);\n\n\n\tfloat d1 = distance(vUv,vec2(0.5,0.5))*2.0;\n\tfloat alpha = smoothstep(1.0, 0.0, d1);\n\t\n\tfloat d2 = distance(vUv,vec2(0.5,0.5))*5.0;\n\n\tvec3 color1 = mix(c1, bg, d1);\n\tvec3 color2 = mix(c2, bg, d2);\n\n\t//color1 = mix(color1, color2, noise1);\n\t//color2 = mix(color2, color1, noise2);\n\n\tvec3 color = mix(color1, color2, 0.5);\n\t\t\t\n\n\n\tgl_FragColor = vec4(mix(color1, color2, colorMix+noise2), alpha);\n}"
}
