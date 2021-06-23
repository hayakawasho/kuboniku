import React, {
  useEffect,
  Suspense,
  useMemo,
  useRef,
  useCallback,
} from 'react';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import tw, { css } from 'twin.macro';
import * as THREE from 'three';

interface IProps {
  images: string[];
}

const dpr = window.devicePixelRatio >= 2 ? window.devicePixelRatio : 1;

const Component: React.FC<IProps> = ({ images }) => {
  const z = useMemo(() => {
    return (window.innerHeight * 0.5) / Math.tan(((45 * Math.PI) / 180) * 0.5);
  }, []);

  return (
    <div css={canvas}>
      <Canvas
        dpr={dpr}
        camera={{
          fov: 45,
          near: 1,
          far: 1000,
          position: [0, 0, z],
        }}
      >
        <Suspense fallback={null}>
          <Scene src={images[0]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Component;

const Scene: React.FC<{ src: string }> = ({ src }) => {
  const mesh = useRef();

  const [a, b, c] = useLoader(THREE.TextureLoader, [
    '/3.jpg',
    '/2.jpg',
    '/1.jpg',
  ]);

  const [width, height] = useMemo(() => {
    const w = b.image.naturalWidth;
    const h = b.image.naturalHeight;

    const ratioWidth = window.innerWidth / w;
    const ratioHeight = window.innerHeight / h;

    let ratio;

    if (ratioWidth > ratioHeight) {
      ratio = ratioWidth;
    } else {
      ratio = ratioHeight;
    }

    return [w * ratio, h * ratio];
  }, []);

  console.log(width, height);

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[width, height]} />
        <shaderMaterial
          attach="material"
          // args={[PurpleShader]}
        />
        <meshBasicMaterial attach="material" map={a} />
        <meshBasicMaterial attach="material" map={b} />
        <meshBasicMaterial attach="material" map={c} />
      </mesh>
    </>
  );
};

const canvas = css`
  ${tw`fixed top-0 left-0 w-screen h-screen pointer-events-none`}
`;

// import { vertex, fragment } from "./shaders";
/*

const mainPlane = {
  x: 936,
  y: 144,
  width: 520,
  height: 676,
  points: {
    hori: 18,
    vert: 14
  },
  // margin between row/columns
  margin: {
    x: 120,
    y: 100
  }
};

function initPlanes() {
  const planes = [];
  const spaceX = mainPlane.width + mainPlane.margin.x;
  const spaceY = mainPlane.height + mainPlane.margin.y;

  // Since we are going to add all the planes in a single array.
  // We need to keep track of the index
  let index = 0;
  // Right hand column
  const rightColX = mainPlane.x;
  const rightColY = mainPlane.y;

  for (var i = 0; i < 5; i++) {
    let offsetY = i - 2;

    let imgNo = offsetY;

    planes[index] = {
      x: rightColX,
      y: rightColY + spaceY * offsetY,
      width: mainPlane.width,
      height: mainPlane.height,
      points: mainPlane.points,
      direction: 1,
      imgNo
    };

    index++;
  }

  let middleColX = mainPlane.x - spaceX;
  let middleColY = -350 + mainPlane.y;

  for (var j = 0; j < 4; j++) {
    let offsetY = j - 1;
    let imgNo = 4 - j;

    planes[index] = {
      x: middleColX,
      y: middleColY + spaceY * offsetY,
      width: mainPlane.width,
      height: mainPlane.height,
      points: mainPlane.points,
      direction: -1,
      imgNo
    };

    index++;
  }

  const leftColX = mainPlane.x - 2 * spaceX;
  const leftColY = rightColY;

  for (var k = 0; k < 5; k++) {
    let offsetY = k - 2;
    let imageOffset = offsetY - 1;
    let imgNo = imageOffset;

    planes[index] = {
      x: leftColX,
      y: leftColY + spaceY * offsetY,
      width: mainPlane.width,
      height: mainPlane.height,
      points: mainPlane.points,
      direction: 1,
      imgNo
    };

    index++;
  }

  return { planes, spaceY };
}

export { initPlanes };


import { GLManager } from "./GLManager";
import { initPlanes } from "./initPlanes";


const psd = {
  width: 1680,
  height: 992
};

function getPsdToWinWidthFactor() {
  return window.innerWidth / psd.width;
}

function getPsdToWinHeightFactor() {
  return window.innerHeight / psd.height;
}

function InfiniteScroll(images = []) {
  this.GL = new GLManager(this.container, images);

  const { planes, spaceY } = initPlanes();

  for (let index = 0; index < planes.length; index++) {
    const imgNo = planes[index].imgNo;

    if (imgNo >= 0) {
      planes[index].imgNo = imgNo > images.length - 1 ? imgNo - images.length : imgNo;
    } else {
      planes[index].imgNo = images.length + imgNo;
    }
  }

  this.images = images;

  this.planes = planes;
  this.spaceY = spaceY * getPsdToWinHeightFactor();
  this.spaceYHalf = this.spaceY / 2;

  this.drawPlane = this.drawPlane.bind(this);
  this.isMouseDown = false;
  this.mouseSensitivity = 4;
  this.scroll = {
    current: 0,
    target: 0,
    start: 0,
    sensitivity: 4,
    raw: 0,
    delta: 0,
    needsUpdate: false
  };

  this.blackAndWhite = {
    current: [1, 1, 0, 1, 1],
    target: [1, 1, 0, 1, 1],
    needsUpdate: false
  };
  this.activeImgNo = 0;
  this.magnitude = {
    target: 0,
    current: 0,
    needsUpdate: false
  };

  this.updateRAF = null;
  this.update = this.update.bind(this);
  this.updateMagnitude = this.updateMagnitude.bind(this);
  this.updateScroll = this.updateScroll.bind(this);
  this.updateBlackAndWhite = this.updateBlackAndWhite.bind(this);
  this.updator = [
    [this.scroll, this.updateScroll],
    [this.magnitude, this.updateMagnitude],
    [this.blackAndWhite, this.updateBlackAndWhite]
  ];
}
InfiniteScroll.prototype.mount = function(container) {
  this.GL.mount(container);
};
InfiniteScroll.prototype.draw = function() {
  this.planes.forEach(this.drawPlane);
};
InfiniteScroll.prototype.drawPlane = function(plane, index) {
  const psdToWinWidthFactor = getPsdToWinWidthFactor();
  const psdToWinHeightFactor = getPsdToWinHeightFactor();


  const x = plane.x * psdToWinWidthFactor;
  const width = plane.width * psdToWinWidthFactor;

  const y = plane.y * psdToWinHeightFactor;
  const height = plane.height * psdToWinHeightFactor;

  let blackAndWhite = 1;

  if (index < 4) {
    blackAndWhite = this.blackAndWhite.current[index];
  }

  this.GL.drawPlane({
    x,
    width,
    y,
    height,
    scroll: this.scroll.current * plane.direction,
    points: plane.points,
    imgNo: plane.imgNo,
    index,
    magnitude: this.magnitude.current,
    blackAndWhite
  });
};
InfiniteScroll.prototype.render = function() {
  this.GL.render();
};
InfiniteScroll.prototype.onResize = function() {
  this.GL.onResize();
};
InfiniteScroll.prototype.onMouseDown = function(scroll) {
  this.scroll.start = scroll;
  this.scroll.raw = scroll;
  this.isMouseDown = true;
  this.magnitude.target = 0.75;
  this.magnitude.needsUpdate = true;
  this.scheduleUpdate();
};
InfiniteScroll.prototype.jumpBack = function() {
  this.scroll.start = this.scroll.raw;
  this.scroll.target = this.scroll.target - this.spaceY * this.scroll.delta;
  this.scroll.current = this.scroll.current - this.spaceY * this.scroll.delta;

  const lastIndex = this.images.length - 1;

  const edge = 1 === this.scroll.delta ? lastIndex : 0;
  const edgeNext = 1 === this.scroll.delta ? 0 : lastIndex;

  for (let i = 0; i < this.planes.length; i++) {
    const imgNo = this.planes[i].imgNo;
    this.planes[i].imgNo =
      imgNo === edge ? edgeNext : imgNo + this.scroll.delta;
  }


  if (this.scroll.delta === 1) {
    for (let i = 0; i < 5; i++) {
      var nextIndex = 4 === i ? 0 : i + 1;
      this.blackAndWhite.target[i] = this.blackAndWhite.target[nextIndex];
      this.blackAndWhite.current[i] = this.blackAndWhite.current[nextIndex];
    }
  } else {
    for (let i = 4; -1 < i; i--) {
      var prevIndex = 0 === i ? 4 : i - 1;
      this.blackAndWhite.target[i] = this.blackAndWhite.target[prevIndex];
      this.blackAndWhite.current[i] = this.blackAndWhite.current[prevIndex];
    }
  }
  this.blackAndWhite.needsUpdate = true;
  this.scheduleUpdate();
};

InfiniteScroll.prototype.onMouseMove = function(scroll) {
  if (!this.isMouseDown) return;

  this.scroll.delta = Math.sign(this.scroll.raw - scroll);
  this.scroll.raw = scroll;

  if (Math.abs(this.scroll.target) > this.spaceY) {
    this.jumpBack();
  }

  this.scroll.target = -(scroll - this.scroll.start) * this.scroll.sensitivity;

  this.noChange();

  this.scroll.needsUpdate = true;
  this.scheduleUpdate();
};

InfiniteScroll.prototype.noChange = function(scroll) {
  const thirdPlaneImgNo = this.planes[2].imgNo;
  const isOverThreshold = Math.abs(this.scroll.target) > this.spaceYHalf;

  const isBelowThreshold =
    (0 < this.scroll.target && this.scroll.target < this.spaceYHalf) ||
    (this.scroll.target < 0 && this.scroll.target > -this.spaceYHalf);
  const hasSameImg = this.activeImgNo === thirdPlaneImgNo;
  if ((isOverThreshold && hasSameImg) || (isBelowThreshold && !hasSameImg)) {
    const lastIndex = this.images.length - 1;
    // If delta is -1 we want to loop back at the end
    // If delta is 1 we want to loop back to 0
    const edge = 1 === this.scroll.delta ? lastIndex : 0;
    const edgeNext = 1 === this.scroll.delta ? 0 : lastIndex;
    const lastActiveImgNo = this.activeImgNo;
    this.activeImgNo =
      this.activeImgNo === edge
        ? edgeNext
        : this.activeImgNo + this.scroll.delta;

    if (lastActiveImgNo !== this.activeImgNo) {
      this.blackAndWhite.needsUpdate = true;
    }
  }
};

InfiniteScroll.prototype.onMouseUp = function() {

  if (this.scroll.delta === 1 && this.scroll.target > this.spaceY / 2) {
    this.scroll.target = this.spaceY;
    this.jumpBack();
  } else if (
    this.scroll.delta === -1 &&
    this.scroll.target < -this.spaceY / 2
  ) {
    this.scroll.target = -this.spaceY;
    this.jumpBack();
  } else {
    this.scroll.target = 0;
  }
  this.isMouseDown = false;

  this.scroll.needsUpdate = true;
  this.magnitude.target = 0;
  this.magnitude.needsUpdate = true;
  this.noUp();
  this.scheduleUpdate();
};

InfiniteScroll.prototype.noUp = function() {
  const lastActiveImgNo = this.activeImgNo;
  this.activeImgNo = this.planes[2].imgNo;
  if (lastActiveImgNo !== this.activeImgNo) {
    this.blackAndWhite.needsUpdate = true;
    this.scheduleUpdate();
  }
};

InfiniteScroll.prototype.updateMagnitude = function() {
  let magnitude =
    this.magnitude.current +
    (this.magnitude.target - this.magnitude.current) * 0.1;

  if (Math.abs(this.magnitude.target - magnitude) < 0.001) {
    this.magnitude.current = this.magnitude.target;
    this.magnitude.needsUpdate = false;
  } else {
    this.magnitude.current = magnitude;
  }
};

InfiniteScroll.prototype.updateBlackAndWhite = function() {
  let done = 0;
  for (let index = 0; index < 5; index++) {
    //  Give colors ( 1 ) to the current ImgNo
    this.blackAndWhite.target[index] =
      this.planes[index].imgNo === this.activeImgNo ? 0 : 1;
    // Reach target
    let newCurrent =
      this.blackAndWhite.current[index] +
      0.1 *
        (this.blackAndWhite.target[index] - this.blackAndWhite.current[index]);
    if (Math.abs(this.blackAndWhite.target[index] - newCurrent) < 0.001) {
      this.blackAndWhite.current[index] = this.blackAndWhite.target[index];
      done += 1;
    } else {
      this.blackAndWhite.current[index] = newCurrent;
    }
  }
  if (done === 5) {
    this.blackAndWhite.needsUpdate = false;
  }
};

InfiniteScroll.prototype.updateScroll = function() {

  let currentScroll =
    this.scroll.current + (this.scroll.target - this.scroll.current) * 0.09;
  if (Math.abs(this.scroll.target - currentScroll) < 0.1) {
    this.scroll.current = this.scroll.target;
    this.scroll.needsUpdate = false;
  } else {
    this.scroll.current = currentScroll;
  }
};

InfiniteScroll.prototype.scheduleUpdate = function() {
  if (this.updateRAF) return;
  this.updateRAF = requestAnimationFrame(this.update);
};

InfiniteScroll.prototype.update = function() {
  let didUpdate = false;

  for (var i = 0; i < this.updator.length; i++) {
    if (this.updator[i][0].needsUpdate) {
      didUpdate = true;
      // Run update function
      this.updator[i][1]();
    }
  }

  if (didUpdate) {
    this.draw();
    this.render();
    this.updateRAF = requestAnimationFrame(this.update);
  } else {
    cancelAnimationFrame(this.updateRAF);
    this.updateRAF = null;
  }
};

function GLManager(container, images) {
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
  camera.position.z = 5;

  const scene = new THREE.Scene();
  camera.lookAt = scene.position;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  this.container = container;
  this.mesh = null;
  this.camera = camera;
  this.scene = scene;
  this.renderer = renderer;
  this.meshes = [];

  this.textures = images.map((src, i) => {
    const onLoad = this.onTextureLoad.bind(this, i);
    return new THREE.TextureLoader().load(src, onLoad);
  });
}

GLManager.prototype.onTextureLoad = function(imgNo) {
  // Only if it has initially render
  for (var index = 0; index < this.meshes.length; index++) {
    if (
      this.meshes[index] &&
      this.meshes[index].geometry.userData.imgNo === imgNo
    ) {
      // console.log("match");
      // update unifroms
      // render
      this.onPlaneTextureUpdate(index, imgNo);
    }
  }
  this.render();
};
GLManager.prototype.mount = function(container) {
  container.appendChild(this.renderer.domElement);
};
GLManager.prototype.getSceneSize = function() {
  const fovInRadians = (this.camera.fov * Math.PI) / 180;
  return 2 * Math.tan(fovInRadians / 2) * this.camera.position.z;
};
GLManager.prototype.onPlaneTextureUpdate = function(index, imgNo) {
  const texture = this.textures[imgNo];
  const material = this.meshes[index].material;

  const rect = this.meshes[index].geometry.userData.rect;
  const rectRatio = rect.width / rect.height;
  const imageRatio = texture.image.width / texture.image.height;

  const factor = { width: 1, height: 1 };

  if (rectRatio > imageRatio) {
    factor.width = 1;
    factor.height = (1 / rectRatio) * imageRatio;
  } else {
    factor.width = (1 * rectRatio) / imageRatio;
    factor.height = 1;
  }

  material.uniforms.u_textureFactor.value = new THREE.Vector2(
    factor.width,
    factor.height
  );
  material.uniforms.u_texture.value = this.textures[imgNo];
};

GLManager.prototype.updatePlane = function({
  index,
  scroll,
  imgNo,
  magnitude,
  blackAndWhite
}) {
  if (
    scroll != null &&
    scroll !== this.meshes[index].geometry.userData.scroll
  ) {
    const scrollDifference = scroll - this.meshes[index].geometry.userData.scroll;
    this.meshes[index].geometry.userData.scroll = scroll;
    this.meshes[index].geometry.translate(0, scrollDifference, 0);
    this.meshes[index].geometry.computeBoundingSphere();
  }

  if (imgNo != null && imgNo !== this.meshes[index].geometry.userData.imgNo) {
    this.meshes[index].geometry.userData.imgNo = imgNo;
    this.onPlaneTextureUpdate(index, imgNo);
  }

  this.meshes[index].material.uniforms.u_progress.value = magnitude;
  this.meshes[index].material.uniforms.u_blackAndWhite.value = blackAndWhite;
};

GLManager.prototype.drawPlane = function({
  x,
  width,
  y,
  height,
  points,
  index,
  scroll,
  imgNo,
  blackAndWhite,
  magnitude
}) {
  const sceneSize = this.getSceneSize();

  const winToSceneWidthFactor = sceneSize / window.innerWidth;
  const winToSceneHeightFactor = sceneSize / window.innerHeight;

  const sceneScroll = scroll * winToSceneHeightFactor;

  if (this.meshes[index]) {
    this.updatePlane({
      scroll: sceneScroll,
      index,
      imgNo,
      blackAndWhite,
      magnitude
    });
    return;
  }

  const planeScene = {
    x: x * winToSceneWidthFactor,
    width: width * winToSceneWidthFactor,
    y: y * winToSceneHeightFactor,
    height: height * winToSceneHeightFactor
  };

  var geometry = new THREE.PlaneBufferGeometry(
    planeScene.width,
    planeScene.height,
    points.hori,
    points.vert
  );


  geometry.translate(
    -sceneSize / 2 + planeScene.width / 2,
    +sceneSize / 2 - planeScene.height / 2,
    0
  );

  geometry.translate(planeScene.x, -planeScene.y, 0);

  geometry.translate(0, sceneScroll, 0);

  geometry.userData = {
    scroll: sceneScroll,
    imgNo,
    rect: { width, height }
  };

  var material = new THREE.ShaderMaterial({
    uniforms: {
      u_texture: { type: "t", value: this.textures[imgNo] },
      u_textureFactor: { type: "v2", value: new THREE.Vector2(1, 1) },
      u_maxDistance: { type: "f", value: sceneSize },
      u_magnitude: { type: "f", value: 1.1 },
      u_progress: { type: "f", value: magnitude },
      u_blackAndWhite: { type: "f", value: blackAndWhite },
      u_opacityColor: { type: "f", value: 0.1 },
      u_opacity: { type: "f", value: 1 }
    },
    fragmentShader: fragment,
    vertexShader: vertex,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  this.scene.add(mesh);

  this.meshes[index] = mesh;
};

GLManager.prototype.render = function() {
  if (!this.renderer) {
    console.error("Renderer has not been initialized :/");
  }
  this.renderer.render(this.scene, this.camera);
};

GLManager.prototype.unmount = function() {
  // window.removeEventListener("resize", this.onResize);
  this.mesh.material.dispose();
  this.mesh.geometry.dispose();
  this.mesh = null;
  this.renderer = null;
  this.camera = null;
  this.scene = null;
  this.container = null;
};

GLManager.prototype.onResize = function() {
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.render(this.scene, this.camera);
};

export { GLManager };

*/
