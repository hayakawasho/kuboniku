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
const vertexShader = require('./shaders/vertex.glsl').default;
const fragmentShader = require('./shaders/fragment.glsl').default;

interface IProps {
  images: string[];
}

const dpr = window.devicePixelRatio >= 2 ? 1.5 : window.devicePixelRatio;

const Component: React.FC<IProps> = ({ images }) => {
  const posZ = useMemo(() => {
    const fovInRadians = (45 * Math.PI) / 180;
    return (window.innerHeight * 0.5) / Math.tan(fovInRadians * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener('touchstart', onDown);
    window.addEventListener('touchmove', onMove, {
      passive: true,
    });
    window.addEventListener('touchend', onUp);
  }, []);

  const pointerDown = (scrollY: number) => {};

  const pointerMove = (scrollY: number) => {};

  const pointerUp = () => {};

  const onDown = e => {
    // console.log(e.changedTouches[0].clientY)
  };

  const onMove = e => {
    // console.log(e.changedTouches[0].clientY)
  };

  const onUp = e => {
    //console.log(e.changedTouches[0].clientY)
  };

  return (
    <div css={canvas}>
      <Canvas
        dpr={dpr}
        camera={{
          fov: 45,
          near: 1,
          far: 1000,
          position: [0, 0, posZ],
        }}
      >
        <Suspense fallback={null}>
          <Scene posZ={posZ} images={images} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Component;

const Scene: React.FC<any> = ({ posZ, images }) => {
  const texture = useLoader(THREE.TextureLoader, images[0]);

  const mesh = useRef();
  const { size } = useThree();

  const uniforms = useMemo(() => {
    return {
      u_texture: {
        type: 't',
        value: texture,
      },
      u_textureFactor: {
        type: 'v2',
        value: new THREE.Vector2(1, -1),
      },
      u_maxDistance: {
        type: 'f',
        value: null,
      },
      u_magnitude: {
        type: 'f',
        value: 1.1,
      },
      u_progress: {
        type: 'f',
        value: null,
      },
      u_blackAndWhite: {
        type: 'f',
        value: null,
      },
      u_opacityColor: {
        type: 'f',
        value: 0.0,
      },
      u_opacity: {
        type: 'f',
        value: 1.0,
      },
    };
  }, []);

  return (
    <>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[size.width, size.height, 18, 14]} // widthSegments 横の分割数 / heightSegments 縦の分割数
        />
        <shaderMaterial
          attach="material"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

const mainPlane = {
  x: 0,
  y: 0,
  width: window.innerWidth * 5,
  height: window.innerHeight + 320,
  points: {
    hori: 18,
    vert: 14,
  },
  // margin between row/columns
  margin: {
    y: 80,
  },
};

function initPlanes() {
  const planes = [];
  const spaceY = mainPlane.height + mainPlane.margin.y;

  let index = 0;

  const colX = mainPlane.x;
  const colY = mainPlane.y;

  for (let i = 0; i < 5; i++) {
    const offsetY = i - 2;
    // This makes sure the center plane starts with the first image
    // And the planes behind the main plane start with the last image
    const imgNo = offsetY;

    planes[index] = {
      x: colX,
      y: colY + spaceY * offsetY,
      width: mainPlane.width,
      height: mainPlane.height,
      points: mainPlane.points,
      direction: 1,
      imgNo,
    };

    index++;
  }

  return { planes, spaceY };
}

const canvas = css`
  ${tw`fixed top-0 left-0 w-screen h-screen pointer-events-none opacity-80`}
  filter: grayscale(1);
`;
