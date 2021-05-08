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
  const projectIndex = 0;
  const posZ = useMemo(() => {
    const fovInRadians = (45 * Math.PI) / 180;
    return (window.innerHeight * 0.5) / Math.tan(fovInRadians * 0.5);
  }, []);

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
          <Scene posZ={posZ} images={images} index={projectIndex} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Component;

const Scene: React.FC<any> = ({ posZ, images, index }) => {
  const { size } = useThree();
  const mesh = useRef();
  const meshes = [];
  const textures = useLoader(THREE.TextureLoader, images);
  const uniforms = useMemo(() => {
    return {
      u_texture: {
        type: 't',
        value: textures[index],
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
  }, [index]);

  const isPointerDown = useRef(false);

  useEffect(() => {
    window.addEventListener('touchstart', onDown);
    window.addEventListener('touchmove', onMove, {
      passive: true,
    });
    window.addEventListener('touchend', pointerUp);
  }, []);

  const pointerDown = (scrollY: number) => {
    isPointerDown.current = true;
  };

  const pointerMove = (scrollY: number) => {
    if (!isPointerDown.current) return;

    console.log('pointerMove:', scrollY);
  };

  const pointerUp = () => {
    isPointerDown.current = false;
  };

  const onDown = e => {
    pointerDown(e.changedTouches[0].clientY);
  };

  const onMove = e => {
    pointerMove(e.changedTouches[0].clientY);
  };

  useFrame(() => {});

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
          onUpdate={() => {}}
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
    y: 160,
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
