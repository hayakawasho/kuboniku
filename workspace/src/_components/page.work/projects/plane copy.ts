/*

var Ti, Tr = h(()=>{
    Ti = `precision highp float;
#define GLSLIFY 1
uniform sampler2D image;uniform float time;uniform float fadeOut;uniform int hide;uniform vec2 planeSize;uniform vec2 offsetScale;uniform vec2 imageSize;uniform float grayscale;varying vec2 vTexCoord;varying float fragDisplacement;varying float occlusion;float rand2(vec2 seed){return fract(sin(dot(seed.xy,vec2(12.9898,78.233)))*43758.5453);}vec2 coverTexture(vec2 uv,vec2 imageSize,vec2 planeSize,bool fitHeight){float imgAsp=imageSize.x/imageSize.y;float plnAsp=planeSize.x/planeSize.y;bool match=imgAsp>plnAsp;if(fitHeight){match=imgAsp<plnAsp;}if(match){uv.x=uv.x*plnAsp/imgAsp+(1.-plnAsp/imgAsp)*0.5;}else{uv.y=uv.y*imgAsp/plnAsp+(1.-imgAsp/plnAsp)*0.5;}return uv;}vec2 scaleTexture(vec2 uv,vec2 factor){vec2 scale=2.0-factor;return vec2(uv.x*scale.x+(1.-scale.x)*0.5,uv.y*scale.y+(1.-scale.y)*0.5);}void main(){if(hide==1){discard;}vec2 texCoord=coverTexture(vTexCoord,imageSize,planeSize+planeSize*offsetScale,false);vec4 color=texture2D(image,texCoord);float gray=dot(color.rgb,vec3(0.299,0.587,0.114));float brightness=fragDisplacement;color=mix(color,vec4(gray,gray,gray,1.0),grayscale);float dither=rand2(vec2(vTexCoord.x,vTexCoord.y)+sin(time))*.25;vec4 texture=vec4(color.rgb+dither*brightness,color.a);gl_FragColor=texture;}`
}
);
var Ci, Cr = h(()=>{
    Ci = `precision highp float;
#define GLSLIFY 1
attribute vec4 vertCoord;attribute vec2 texCoord;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float time;uniform float scaleProgress;uniform float ripple;uniform float fadeOut;uniform int fadeOutDir;uniform float progress;uniform float curviness;uniform float transition;uniform vec2 planeSize;uniform vec2 planeCenter;uniform vec2 imageSize;uniform vec2 mousePos;uniform vec2 screenSize;uniform int backFace;uniform int scrolling;uniform float bendMult;varying vec2 vTexCoord;varying float fragDisplacement;varying float occlusion;vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}mat4 rotateMatrix_1(float angle,vec3 axis,vec3 origin){float c=cos(angle);float s=sin(angle);float t=1.0-c;vec3 normalizedAxis=normalize(axis);float x=normalizedAxis.x;float y=normalizedAxis.y;float z=normalizedAxis.z;mat4 translateToOrigin=mat4(1.0,0.0,0.0,-origin.x,0.0,1.0,0.0,-origin.y,0.0,0.0,1.0,-origin.z,0.0,0.0,0.0,1.0);mat4 rotationMatrix=mat4(t*x*x+c,t*x*y-s*z,t*x*z+s*y,0.0,t*x*y+s*z,t*y*y+c,t*y*z-s*x,0.0,t*x*z-s*y,t*y*z+s*x,t*z*z+c,0.0,0.0,0.0,0.0,1.0);mat4 translateBack=mat4(1.0,0.0,0.0,origin.x,0.0,1.0,0.0,origin.y,0.0,0.0,1.0,origin.z,0.0,0.0,0.0,1.0);return translateBack*rotationMatrix*translateToOrigin;}mat4 rotateMatrix_0(float angle,vec3 axis,vec3 origin){float c=cos(angle);float s=sin(angle);float t=1.0-c;vec3 normalizedAxis=normalize(axis);float x=normalizedAxis.x;float y=normalizedAxis.y;float z=normalizedAxis.z;mat4 translateToOrigin=mat4(1.0,0.0,0.0,-origin.x,0.0,1.0,0.0,-origin.y,0.0,0.0,1.0,-origin.z,0.0,0.0,0.0,1.0);mat4 rotationMatrix=mat4(t*x*x+c,t*x*y-s*z,t*x*z+s*y,0.0,t*x*y+s*z,t*y*y+c,t*y*z-s*x,0.0,t*x*z-s*y,t*y*z+s*x,t*z*z+c,0.0,0.0,0.0,0.0,1.0);mat4 translateBack=mat4(1.0,0.0,0.0,origin.x,0.0,1.0,0.0,origin.y,0.0,0.0,1.0,origin.z,0.0,0.0,0.0,1.0);return translateBack*rotationMatrix*translateToOrigin;}
#define M_PI 3.141592653589;
vec3 center_0(vec2 size){return vec3(-size.x*.5,size.y*.5,0.0);}vec4 bentPlane(vec4 coords,vec2 planeSize,float radius,float mixAmount,float rotation){vec4 bentCoords=coords;float angle=-planeSize.y*1.5+bentCoords.y*-M_PI;bentCoords.y=sin(angle)*radius-planeSize.y*.5;bentCoords.z=cos(angle)*radius;vec4 mixedCoords=mix(coords,bentCoords,mixAmount);mixedCoords*=rotateMatrix_0(radians(180.*rotation),vec3(1.0,0.0,0.0),center_0(planeSize));return mixedCoords;}float easeInExpo(float x){return x==0. ? 0. : pow(2.,10.*x-10.);}float parabola(float x){return-4.*pow(x-0.5,2.)+1.;}vec3 center(vec2 size){return vec3(-size.x*.5,size.y*.5,0.0);}vec3 bottomLeft(vec2 size){return vec3(0,size.y,0.0);}void main(){vTexCoord=texCoord;vec4 coords=vertCoord;float relProgress=progress;float absProgress=abs(progress);float curveAmount=curviness;float transitionAmount=transition;float anim=sin(time-1.5)*.5+.5;if(backFace==1){coords*=rotateMatrix_1(radians(-180.),vec3(1.0,0.0,0.0),center(planeSize));}float fadeDirMod=fadeOutDir>=0 ? 1.0 :-1.0;curveAmount*=(1.0-fadeOut);coords=bentPlane(coords,planeSize,-0.4,fadeOut,-fadeOut*.5);coords.y+=fadeOut*1.5*fadeDirMod;coords.z+=fadeOut*.2;coords.x-=fadeOut*.1;coords*=rotateMatrix_1(radians(25.*fadeOut*0.5*fadeDirMod),vec3(0.0,0.0,1.0),vec3(0.0))*rotateMatrix_1(radians(-25.*fadeOut*0.5*fadeDirMod),vec3(0.0,1.0,0.0),vec3(0.0));coords=bentPlane(coords,planeSize,-0.4,parabola(transitionAmount),transitionAmount);if(relProgress<0.0){coords=bentPlane(coords,planeSize,-planeSize.y*.3,absProgress*0.7*curveAmount,0.0);coords.x-=absProgress*.4*curveAmount;coords.y+=absProgress*.4*curveAmount;coords*=rotateMatrix_1(radians(-50.*relProgress*curveAmount*1.1),vec3(1.0,0.0,0.0),bottomLeft(planeSize));coords*=rotateMatrix_1(radians(25.*relProgress*curveAmount),vec3(0.0,1.0,0.0),bottomLeft(planeSize));coords*=rotateMatrix_1(radians(25.*relProgress*curveAmount*1.2),vec3(0.0,0.0,1.0),bottomLeft(planeSize));}else if(relProgress>0.0){coords=bentPlane(coords,planeSize,-planeSize.y*.3,absProgress*0.75*curveAmount,0.0);coords.x-=absProgress*.4*curveAmount;coords.y-=absProgress*.25*curveAmount;coords*=rotateMatrix_1(radians(-50.*relProgress*curveAmount*1.2),vec3(1.0,0.0,0.0),vec3(0.0));coords*=rotateMatrix_1(radians(-20.*relProgress*curveAmount*.8),vec3(0.0,1.0,0.0),vec3(0.0));coords*=rotateMatrix_1(radians(30.*relProgress*curveAmount*1.2),vec3(0.0,0.0,1.0),vec3(0.0));}vec4 position=modelViewMatrix*coords;float dist=length(mousePos.xy-position.xy);float bulgeAmount=.2;float bulgeRadius=0.9;float falloff=1.0-smoothstep(0.0,bulgeRadius,dist);float displacement=falloff*bulgeAmount*curviness;position.z+=displacement;fragDisplacement=displacement;float cent=length(position.xy-mousePos.xy);float amp=1.0-smoothstep(ripple,ripple*1.5,cent);float freq=7.0;float rip=sin(cent*freq+parabola(ripple))*amp*.25*parabola(ripple);float buld=(1.0-smoothstep(0.0,0.75,length(position.xy)))*1.5*parabola(scaleProgress);position.z-=rip;position.z-=buld;fragDisplacement+=rip*2.-buld*.5;mat4 projection=projectionMatrix;if(scrolling==0){projection[3].y=0.0;}gl_Position=projection*position;}`
}
);
var _r, X, zt = h(()=>{
    "use strict";
    z();
    le();
    M();
    ae();
    ge();
    xi();
    Rt();
    Xt();
    kt();
    bi();
    V();
    O();
    mt();
    re();
    Et();
    Ge();
    Si();
    Be();
    Tr();
    Cr();
    te();
    _r = class {
        uniforms = {};
        constructor(e) {
            this.uniforms = {
                get transition() {
                    return e[0].uniforms.transition.value
                },
                set transition(t) {
                    for (let r of e)
                        r.uniforms.transition.value = t
                },
                get scaleProgress() {
                    return e[0].uniforms.scaleProgress.value
                },
                set scaleProgress(t) {
                    for (let r of e)
                        r.uniforms.scaleProgress.value = t
                },
                get curviness() {
                    return e[0].uniforms.curviness.value
                },
                set curviness(t) {
                    for (let r of e)
                        r.uniforms.curviness.value = t
                },
                get ripple() {
                    return e[0].uniforms.ripple.value
                },
                set ripple(t) {
                    for (let r of e)
                        r.uniforms.ripple.value = t
                }
            }
        }
    }
    ,
    X = class {
        constructor(e) {
            this.element = e;
            let t = this;
            this.fadeOut = {
                set value(r) {
                    t.fadeOutUniform.value = r
                },
                get value() {
                    return t.fadeOutUniform.value
                }
            },
            this.scroller = new Ae({
                element: {
                    wrapper: document.documentElement,
                    container: e
                }
            },{
                lerp: Ke({
                    damping: .1
                }),
                touch: Pt({
                    enableMouseEvents: !0
                }),
                mouse: ft(),
                scrollTo: Qe()
            })
        }
        focusedItem;
        emitter = new F;
        items = [];
        fadeOut = {
            value: 0
        };
        scroller;
        itemObservable;
        renderingLocked = !1;
        scrollSnapTimeout = -1;
        resizeTimeout = -1;
        fadeOutUniform = {
            value: 0,
            type: b.FLOAT
        };
        hidden = !1;
        locked = !1;
        webgl;
        mouseEmitter;
        router;
        preloader;
        viewport;
        projects;
        composer;
        getPosition() {
            return this.itemObservable.coord
        }
        async onCreate() {
            for (let e of this.projects) {
                let t = `[data-project-item="${e.slug}"]`
                  , r = this.element.querySelector(t)
                  , o = r.querySelector("[data-project-teaser]");
                this.itemObservable || (this.itemObservable = k(o, {
                    resizeDetection: !0
                }));
                let s = {
                    x: 0,
                    y: 0
                }
                  , n = e.image
                  , a = this.createImage(n, !1, s)
                  , l = this.createImage(n, !0, s)
                  , c = new _r([a, l]);
                this.items.push({
                    x: 0,
                    y: 0,
                    project: e,
                    element: r,
                    sides: [a, l],
                    uniforms: c.uniforms,
                    offsetScale: s,
                    offsetPosition: {
                        x: 0,
                        y: 0
                    },
                    scrollPosition: {
                        x: 0,
                        y: 0
                    }
                })
            }
            this.toggleUi(!0),
            this.checkRoute(!0),
            this.render(!0),
            this.preloader.done().then(()=>{
                setTimeout(()=>{
                    this.composer.query(T, this.element).filter(({element: e})=>this.focusedItem ? !this.focusedItem?.element.contains(e) : !0).forEach(({component: e})=>{
                        e.lock(!0).onEnter.stop().seek(e.onEnter.duration, !0, !0)
                    }
                    )
                }
                )
            }
            ),
            this.hidden || (this.lock(),
            this.hide(),
            setTimeout(()=>{
                this.focusedItem && (this.hide(),
                this.preloader.done().then(()=>{
                    this.focusedItem ? this.hide([this.focusedItem]) : this.show();
                    let e = this.focusedItem;
                    e.uniforms.transition = 0,
                    e.uniforms.curviness = 0;
                    let t = e.sides[0].width
                      , r = 1 - 129 / t;
                    e.offsetScale.x = -r,
                    e.offsetScale.y = -r,
                    e.offsetPosition.x = t * r * .5,
                    e.offsetPosition.y = t * r * .5,
                    f.timeline().add([f.to(e.uniforms, {
                        transition: 1,
                        curviness: 1
                    }, {
                        duration: 1800,
                        easing: y.easeInOutExpo
                    }), f.to(e.offsetScale, {
                        x: 0,
                        y: 0
                    }, {
                        duration: 1800,
                        easing: y.easeInOutExpo
                    }), f.to(e.offsetPosition, {
                        x: 0,
                        y: 0
                    }, {
                        duration: 1800,
                        easing: y.easeInOutExpo
                    })]).then(()=>{
                        requestAnimationFrame(()=>e.uniforms.transition = 0),
                        !this.hidden && this.router.route.url === "/" && (this.unlock(),
                        this.show())
                    }
                    )
                }
                ))
            }
            , 200))
        }
        async onListen() {
            return E(this.webgl.on(ut.BEFORE_RENDER, ()=>this.render()), this.scroller.onScroll(()=>{
                this.emitter.emit("scroll", this.getScrollEvent())
            }
            ), this.scroller.on(L.DELTA, ()=>{
                clearTimeout(this.scrollSnapTimeout),
                this.scrollSnapTimeout = setTimeout(()=>{
                    this.focusedItem && this.scrollTo(this.focusedItem, !1)
                }
                , 600)
            }
            ), this.itemObservable.onDimChange(()=>{
                for (let e of this.items)
                    for (let t of e.sides)
                        t.setSize(this.itemObservable.size)
            }
            ), ...this.items.map(e=>S(e.element.querySelector("a"), "focus", t=>{
                t.preventDefault(),
                e !== this.focusedItem && this.scrollTo(e, !1)
            }
            )), this.viewport.onChange(()=>{
                clearTimeout(this.resizeTimeout),
                this.scrollTo(this.focusedItem, !0),
                this.resizeTimeout = setTimeout(()=>{
                    this.scrollTo(this.focusedItem, !0)
                }
                , 100)
            }
            ), this.router.on(R.NAV_END, ({toRoute: e})=>{
                e.url === "/" && this.items.forEach(t=>{
                    let r = t.element.querySelector("[data-intro]");
                    r && (r.style.color = "")
                }
                )
            }
            ), S(window, "keydown", e=>{
                this.locked || ((e.code === "ArrowRight" || e.code === "ArrowDown" || e.code === "Space") && this.scrollTo(this.items[fe(this.items.indexOf(this.focusedItem) + 1, this.items.length)], !1),
                (e.code === "ArrowLeft" || e.code === "ArrowUp") && this.scrollTo(this.items[fe(this.items.indexOf(this.focusedItem) - 1, this.items.length)], !1),
                e.code === "Enter" && this.focusedItem && this.router.to(this.focusedItem.project.url))
            }
            ))
        }
        getScrollEvent() {
            let e = this.items[0].sides[0].height
              , t = this.getSpacing();
            return {
                scrollY: this.scroller.position.output.y,
                maxScroll: this.items.length * (e + t)
            }
        }
        checkRoute(e=!1, t=this.router.route.url) {
            (t.startsWith("/about") || t.startsWith("/case/")) && (this.fadeOut.value = 1,
            this.hide(),
            this.lock())
        }
        createImage(e, t=!1, r={
            x: 0,
            y: 0
        }) {
            let o = this.webgl.image({
                source: e.url,
                width: this.itemObservable.width,
                height: this.itemObservable.height,
                segments: 30,
                vertex: Ci,
                fragment: Ti,
                uniforms: {
                    progress: {
                        value: 0,
                        type: b.FLOAT
                    },
                    mousePos: {
                        value: this.mouseEmitter.glPosition,
                        type: b.VEC2
                    },
                    backFace: {
                        value: t ? 1 : 0,
                        type: b.INT
                    },
                    offsetScale: {
                        value: r,
                        type: b.VEC2
                    },
                    fadeOut: this.fadeOutUniform,
                    hide: {
                        value: 0,
                        type: b.INT
                    },
                    screenSize: {
                        type: b.VEC2,
                        value: this.viewport.size
                    },
                    planeSize: {
                        type: b.VEC2,
                        value: this.getPlaneSize()
                    },
                    planeCenter: {
                        type: b.VEC2,
                        value: [this.webgl.clipSpaceX(this.itemObservable.width / 2), this.webgl.clipSpaceY(this.itemObservable.height / 2)]
                    },
                    imageSize: {
                        type: b.VEC2,
                        value: this.getImageSize(e)
                    },
                    curviness: {
                        type: b.FLOAT,
                        value: 1
                    },
                    transition: {
                        type: b.FLOAT,
                        value: 0
                    },
                    bendMult: {
                        type: b.FLOAT,
                        value: 1
                    },
                    scaleProgress: {
                        type: b.FLOAT,
                        value: 0
                    },
                    ripple: {
                        type: b.FLOAT,
                        value: 0
                    }
                }
            })
              , s = this.webgl.gl;
            return o.on(ct.BEFORE_DRAW, ()=>s.enable(s.CULL_FACE)),
            o.on(ct.AFTER_DRAW, ()=>s.disable(s.CULL_FACE)),
            o
        }
        getPlaneSize() {
            return [this.webgl.clipSpaceW(this.itemObservable.width), this.webgl.clipSpaceH(this.itemObservable.height)]
        }
        getPlaneCenter(e) {
            return [this.webgl.clipSpaceX(e.x + this.itemObservable.width / 2), this.webgl.clipSpaceY(e.y + this.itemObservable.height / 2)]
        }
        getImageSize(e) {
            return [this.webgl.clipSpaceW(e.width), this.webgl.clipSpaceH(e.height)]
        }
        getSpacing() {
            return this.viewport.height * .15
        }
        lock(e=!1) {
            this.locked = !0,
            this.element.classList.add("is-locked"),
            this.scroller.detachBehavior("mouse"),
            this.scroller.detachBehavior("touch"),
            e && this.lockRendering(!0)
        }
        isLocked() {
            return this.element.classList.contains("is-locked")
        }
        unlock(e=!0) {
            this.locked = !1,
            this.element.classList.remove("is-locked"),
            this.scroller.attachBehavior("mouse"),
            this.scroller.attachBehavior("touch"),
            this.lockRendering(!e)
        }
        lockRendering(e=!0) {
            this.renderingLocked = e
        }
        findItem(e) {
            return this.items.find(({project: t})=>t.slug === e)
        }
        isHidden() {
            return this.hidden
        }
        hide(e=[]) {
            this.hidden = e.length == 0;
            for (let t of this.items) {
                let r = e.includes(t)
                  , o = r ? 0 : 1;
                t.element.classList.toggle("is-hidden", !r);
                for (let s of t.sides)
                    s.uniforms.hide.value = o
            }
        }
        show() {
            for (let e of this.items) {
                e.element.classList.toggle("is-hidden", !1);
                for (let t of e.sides)
                    t.uniforms.hide.value = 0
            }
        }
        toggleUi(e=!0) {
            this.element.classList.toggle("is-ui-disabled", !e)
        }
        getItemScrollY(e) {
            let[t] = e.sides
              , r = t.height
              , o = this.scroller.position.output.y
              , s = this.viewport.height;
            return o + e.y - s * .5 + r * .5
        }
        get scrollY() {
            return this.scroller.position.output.y
        }
        async scrollTo(e, t=!0) {
            let[r] = e.sides
              , o = r.height
              , s = this.scroller.position.output.y
              , n = this.viewport.height
              , a = s + e.y - n * .5 + o * .5
              , l = 1.5;
            return new Promise(c=>{
                if (we(s, a - l, a + l))
                    c();
                else {
                    let u = this.scroller.onScroll(({y: d})=>{
                        we(d, a - l, a + l) && (c(),
                        u())
                    }
                    );
                    this.scroller.scrollTo({
                        y: a
                    }, t)
                }
                this.render()
            }
            )
        }
        getItemPosition(e) {
            let t = this.scroller.position.output.y
              , r = this.items.length
              , o = this.viewport.height
              , s = this.viewport.width
              , n = this.getSpacing()
              , a = this.getPlaneSize()
              , l = this.items[0]?.sides[0]?.height || 0
              , c = r * (l + n)
              , u = s * .5 - this.itemObservable.width * .5
              , d = this.items.indexOf(e)
              , [p] = e.sides
              , g = p.height + n
              , v = o * .5 + g * .5 + n * .5
              , w = fe(v - t + g * d, c) - g;
            return {
                x: u,
                y: w
            }
        }
        renderItemSide(e, t) {
            t.translate({
                x: e.x + e.offsetPosition.x + e.scrollPosition.x,
                y: e.y + e.offsetPosition.y + e.scrollPosition.y
            }),
            t.scale({
                x: 1 + e.offsetScale.x,
                y: 1 + e.offsetScale.y
            })
        }
        render(e=!1) {
            if (this.renderingLocked && !e) {
                for (let[d,p] of this.items.entries())
                    for (let g of p.sides)
                        this.renderItemSide(p, g);
                return
            }
            let t = this.scroller.position.output.y
              , r = this.items.length
              , o = this.viewport.height
              , s = this.viewport.width
              , n = this.getSpacing()
              , a = this.items[0]?.sides[0]?.height || 0
              , l = r * (a + n)
              , c = this.getPlaneSize()
              , u = s * .5 - this.itemObservable.width * .5;
            for (let[d,p] of this.items.entries()) {
                let[g] = p.sides
                  , v = p.element
                  , w = g.height + n
                  , C = o * .5 + w * .5 + n * .5
                  , j = fe(C - t + w * d, l) - w
                  , se = j < -w || j > o + w
                  , ne = N(j, o, -w + n, -1, 1);
                if (p.x = u,
                p.y = j,
                v.style.setProperty("--progress", ne.toFixed(4)),
                v.style.setProperty("--translate-x", `${u}px`),
                v.style.setProperty("--translate-y", `${j}px`),
                v.style.setProperty("--center-y", `-150vh ${(50 * ne).toFixed(4)}vh`),
                se && !e) {
                    for (let $ of p.sides)
                        $.disabled = !0;
                    continue
                }
                let Z = this.getImageSize(p.project.image)
                  , be = this.getPlaneCenter(g);
                we(ne, -.3, .3) && this.focusedItem !== p && (this.focusedItem = p);
                for (let $ of p.sides)
                    $.disabled = !1,
                    $.uniforms.progress.value = ne,
                    $.uniforms.planeSize.value = c,
                    $.uniforms.planeCenter.value = be,
                    $.uniforms.imageSize.value = Z,
                    this.renderItemSide(p, $)
            }
        }
    }
    ;
    m([x(G, !0)], X.prototype, "webgl", 2),
    m([x(Je, !0)], X.prototype, "mouseEmitter", 2),
    m([x(_, !0)], X.prototype, "router", 2),
    m([x(K, !0)], X.prototype, "preloader", 2),
    m([x(ve, !0)], X.prototype, "viewport", 2),
    m([q("projects", {
        type: Array
    })], X.prototype, "projects", 2),
    m([I()], X.prototype, "composer", 2),
    X = m([A("project-slider")], X)
}
);

import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import * as THREE from "three";
import Experience from "./Experience.js";
import fragmentShader from "./Shaders/waterflow/fragmentShader.glsl";
import vertexShader from "./Shaders/waterflow/vertexShader.glsl";
import { map } from "./Utils/math.js";
import Cursor from "../Cursor";
import Scroll from "../scroll";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

export default class ImageDistortion {
  constructor() {
    this.mediaQuery = window.matchMedia("(max-width: 34.375rem)");
    this.experience = new Experience();
    this.scroll = new Scroll();
    if (!this.mediaQuery.matches) {
      this.cursor = new Cursor();
    }
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer;
    this.camera = this.experience.camera;
    this.config = this.experience.config;
    this.imageContainers = Array.from(document.querySelectorAll(".js-distortion-hover"));
    this.images = Array.from(document.querySelectorAll(".js-distortion-image"));
    this.homeWrapper = document.querySelector(".is-home");
    this.mouse = new THREE.Vector2();
    this.selectedProjectMeshs = [];
    this.init();
  }

  init() {
    const preloadImage = new Promise((resolve, reject) => {
      imagesLoaded(this.images, { background: true }, resolve);
    });

    const allDone = [preloadImage];

    Promise.all(allDone).then(() => {
      this.addImages();
      this.setTimeline();
      this.setHover();
      this.setScrollTrigger();
      this.setRaycaster();
    });
  }

  reInit() {
    this.addImages();
    this.setTimeline();
    this.setHover();
    this.setScrollTrigger();
    this.setRaycaster();
  }

  addImages() {
    this.imageStore = this.imageContainers.map((img, index) => {
      const bounds = img.getBoundingClientRect();
      const geometry = new THREE.PlaneGeometry(bounds.width, bounds.height, 30, 30);
      const texture = new THREE.Texture(img.children[0].children[1]);
      texture.needsUpdate = true;

      this.settings = {
        uStrength: 0.06,
        uProgress: 0,
      };

      const imagesmaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uImage: { value: 0 },
          uTexture: { value: texture },
          uTextureChangeTrigger: { value: 0 },
          uResolution: { value: new THREE.Vector2(this.config.width, this.config.height) },
          uRealSize: { value: new THREE.Vector2(bounds.width, bounds.height) },
          uPlaneSizes: { value: new THREE.Vector2(bounds.width, bounds.height) },
          uStrength: { value: this.settings.uStrength },
          uProgress: { value: this.settings.uProgress },
          uOpacity: { value: 1 },
          uCorners: { value: new THREE.Vector4(0.0, 0.0, 0.0, 0.0) },
          uYScale: { value: 0 },
          uYBottom: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uLightStrength: { value: 1 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, imagesmaterial);
      mesh.name = "selectedProjectImage";
      this.scene.add(mesh);
      this.selectedProjectMeshs.push(mesh);

      return {
        img,
        texture,
        isColored: false,
        mesh,
        top: this.scroll.value.current + bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
        tl: this.setTimeline(mesh),
      };
    });
  }

  setTimeline(o) {
    if (o) {
      const distortionTl = gsap.timeline();
      return distortionTl
        .to(o.material.uniforms.uCorners.value, {
          x: -1,
          duration: 1,
        })
        .to(
          o.material.uniforms.uCorners.value,
          {
            y: -1,
            duration: 1,
          },
          0.4
        )
        .to(
          o.material.uniforms.uCorners.value,
          {
            z: -1,
            duration: 1,
          },
          0.8
        )
        .to(
          o.material.uniforms.uCorners.value,
          {
            w: -1,
            duration: 1,
          },
          1.2
        );
    }
  }

  setHover() {
    this.hoverTargets = Array.from(document.querySelectorAll(".js-distortion-hover"));
  }

  setScrollTrigger() {
    this.imageStore.forEach((o, i) => {
      const tl = gsap.timeline();
      ScrollTrigger.create({
        trigger: o.img,
        start: "top center+=30%",
        onEnter: () => {
          tl.to(o.mesh.material.uniforms.uProgress, {
            value: 1,
            duration: 2.5,
            ease: CustomEase.create(
              "custom",
              "M0,0,C0.008,0.024,0.003,0.042,0.096,0.076,0.266,0.138,0.474,0.628,0.586,0.758,0.756,0.956,0.818,1.001,1,1"
            ),
          }).to(
            o.mesh.material.uniforms.uYScale,
            {
              value: 1,
              delay: 0.2,
              duration: 1,
              ease: "power2.out",
            },
            0
          );
        },
        onLeave: () => {},
        markers: false,
      });
    });
  }

  setRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.homeWrapper.addEventListener("pointermove", this._onMouseMove.bind(this), false);
    this.imageStore.forEach((o, i) => {
      o.img.addEventListener("pointerenter", () => {
        gsap.to(o.mesh.material.uniforms.uLightStrength, {
          value: 1,
          duration: 1,
          ease: "power2.out",
        });
      });
      o.img.addEventListener("pointerleave", () => {
        gsap.to(o.mesh.material.uniforms.uPlaneSizes, {
          value: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    });
  }

  _onMouseMove(event) {
    // マウスの位置を取得及び正規化
    this.mouse.x = (event.clientX / this.config.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.config.height) * 2 + 1;
  }

  setPosition() {
    this.imageStore.forEach((o, index) => {
      o.mesh.position.x = o.left - this.config.width / 2 + o.width / 2;
      o.mesh.position.y = this.scroll.value.current - o.top + this.config.height / 2 - o.height / 2;
      o.mesh.position.z = gsap.utils.interpolate(
        o.mesh.position.z,
        -this.scroll.value.speed * 50,
        0.03
      );
      o.mesh.rotation.x = gsap.utils.interpolate(
        o.mesh.rotation.x,
        -(Math.PI / 40) * this.scroll.value.speed,
        0.1
      );
      o.mesh.material.uniforms.uYBottom.value =
        o.mesh.position.y - o.mesh.geometry.parameters.height / 2;
    });
  }

  resize() {
    if (this.imageStore) {
      this.imageStore.forEach(o => {
        this.scene.remove(o.mesh);
      });
    }
    this.imageStore = [];
    this.selectedProjectMeshs = [];
    this.reInit();
  }

  update(elapsed) {
    if (this.imageStore && !window.onAnchorScrolling) {
      this.setPosition();
      this.imageStore.forEach((o, index) => {
        o.mesh.material.uniforms.uTime.value = elapsed;
        // o.mesh.material.uniforms.uStrength.value = this.settings.uStrength
        o.tl.progress(map(this.scroll.value.speed, 0.12, 1, 0, 0.3));
      });
    }

    if (this.raycaster) {
      this.raycaster.setFromCamera(this.mouse, this.camera.instance);
      const intersects = this.raycaster.intersectObjects(this.selectedProjectMeshs);
      if (intersects.length > 0) {
        if (this.cursor && this.cursor.cursorConfig.scale.current === 0) {
          this.cursor.enter();
        }
        const intersect = intersects[0];
        const object = intersect.object;

        if (object.material.uniforms.uMouse) {
          object.material.uniforms.uMouse.value.x = gsap.utils.interpolate(
            object.material.uniforms.uMouse.value.x,
            intersect.uv.x,
            0.04
          );
          object.material.uniforms.uMouse.value.y = gsap.utils.interpolate(
            object.material.uniforms.uMouse.value.y,
            intersect.uv.y,
            0.04
          );
          const rotateRateX = (intersect.uv.y - 0.5) * 2;
          const rotateRateY = (intersect.uv.x - 0.5) * 2;
          object.rotation.x = gsap.utils.interpolate(
            object.rotation.x,
            ((-rotateRateX * Math.PI) / 180) * 2.2,
            0.06
          );
          object.rotation.y = gsap.utils.interpolate(
            object.rotation.y,
            ((rotateRateY * Math.PI) / 180) * 2.2,
            0.06
          );
        }
      } else if (this.cursor && this.cursor.cursorConfig.scale.current > 0) {
        this.cursor.leave();
      }
    }
  }

  destroy() {
    this.imageStore = [];
    this.selectedProjectMeshs = [];
  }
}
*/
